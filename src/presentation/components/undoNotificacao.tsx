"use client";

import { useUndoStore, UndoItem } from "./utils/services/undoStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react"; //useRef pq podemos acessar o estado e cancelar a exclusao se quisermos 
import * as style from "../../presentation/pages/home/styles/centrals-page.css";

export function UndoNotificacao() {
    const { refazer_exclusao } = useUndoStore();

    return (
        <>
            {refazer_exclusao.map((item, index) => (//usei map para mapearmos todos os itens excluidos e termos 1 card único e isolado pra cada um (o estilo dos cards é igual mas o id é smp diferente)
                <CardUnicoPraCadaExclusao key={item.id} item={item} offset={index} />
            ))}
        </>
    );
}

function CardUnicoPraCadaExclusao({ item, offset }: { item: UndoItem; offset: number }) {
    const queryClient = useQueryClient();
    const { removeUndo } = useUndoStore();
    const [progresso, setprogresso] = useState(100); //pra ver o progressoo na bar do card

    const intervalRef = useRef<NodeJS.Timeout | null>(null); //guardei o timer do setinterval(que diminui a barrinha de progresso)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setprogresso((prev) => Math.max(prev - 1, 0)); //bar do card diminuindo
        }, 100); //reduz 1 a cada 100ms, 100x100 = 10000ms

        timeoutRef.current = setTimeout(() => {
            removeUndo(item.id);
        }, 10000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    function botaoReverter() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        fetch("http://localhost:5000/centrals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item.central),
        }).then(() => {
            queryClient.invalidateQueries({ queryKey: ["centrals"] });
            removeUndo(item.id);//a importancia do id unico pra cada card é que se excluirmos varios, cada card será único e cada botao terá de um id diferente
        });
    }

    //aqui eu prefiri fazer os estilos inline por conta das variaveis que preciso utilizar, o offset e o progressoo
    return (
        <div
            style={{
                position: "fixed",
                top: `${1 + offset * 8}rem`, // espaçamento dinamico entre cards pra caso varios itens sejam excluidos
                right: "1rem",
                backgroundColor: "#1c242e",
                color: "white",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                width: "350px",
                zIndex: 1000 + offset,
            }}
        >
            <p style={{
                fontSize: "16px",
            }}>
                A central: <strong>{item.central.name}</strong> foi excluída. <br />
                Deseja reverter a exclusão?
            </p>
            <button
                className={style.botao_reverter}
                onClick={botaoReverter}
            >
                Reverter exclusão
            </button>
            <div
                style={{
                    height: "4px",
                    backgroundColor: "#fff",
                    marginTop: "8px",
                    borderRadius: "2px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${progresso}%`,
                        backgroundColor: "#000",
                        transition: "width 0.1s linear",
                    }}
                />
            </div>
        </div>
    );
}

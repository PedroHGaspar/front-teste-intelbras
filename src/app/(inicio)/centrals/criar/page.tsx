"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";//n gosto de z. z. z. pra lá e pra cá, prefiro zod.
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useModels } from "../../../../presentation/components/utils/services/useModels";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeftIcon } from "../../../../presentation/components/icons/chevron-left";
import * as style from "../../../../presentation/pages/home/styles/centrals-page.css";


const dataNovaCentral = zod.object({
    name: zod.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    mac: zod.string().min(12, "Modelo MAC é obrigatório"), // não precisamos do regex, já formatamos no input
    modelId: zod.string().min(1, "Modelo é obrigatório"),
});

type dadosFormatadosNovaCentral = zod.infer<typeof dataNovaCentral>;// infer transforma direto em typescript

export default function CriarCentralPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: modelos } = useModels();
    const [macsExistentes, setMacsExistentes] = useState<string[]>([]);
    const [macInput, setMacInput] = useState("");

    const {
        register, //registrar os campos
        handleSubmit, //valida os dados
        formState: { errors }, //nossos erros que vem do zod (linha 35 usando zodResolver)
        setError, //nao pode ter mac igual
    } = useForm<dadosFormatadosNovaCentral>({
        resolver: zodResolver(dataNovaCentral),
    });

    useEffect(function () {
        fetch("http://localhost:5000/centrals")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                let lista = data.map(function (central: any) {
                    return central.mac;
                });
                setMacsExistentes(lista);
            })
            .catch(function (error) {
                console.error("Erro ao buscar MACs:", error);
            });
    }, []); //só quero pegar os macs da base e juntar na minha lista, pra comparar na hora da criação de uma central e não ter mac igual

    function voltar() {
        router.push("/centrals");
    }

    function formatarMac(valor: string) {
        let somenteAlfanumerico = valor.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();//remove tudo menos letra/numero
        let limitado = somenteAlfanumerico.slice(0, 12); //12 letras/numeros
        let blocos = [];//agrupei e inseri dois pontos

        for (let i = 0; i < limitado.length; i += 2) {
            let bloco = limitado.slice(i, i + 2);
            blocos.push(bloco);
        }

        return blocos.join(":");
    }


    // function handleChangeMac(e) {
    //     const valor = e.target.value;
    //     const formatado = formatarMac(valor);
    //     setMacInput(formatado);
    // }

    function handleChangeMac(event: React.ChangeEvent<HTMLInputElement>) {//tive que usar o event do html pra n implicar type=any
        let campoMacFormatado = formatarMac(event.target.value);
        setMacInput(campoMacFormatado);
    }

    function enviarNovaCentral(data: dadosFormatadosNovaCentral) {
        let macJaExiste = macsExistentes.includes(macInput);

        if (macJaExiste) {
            setError("mac", {
                type: "manual",
                message: "MAC já existe no sistema",
            });
            return;
        }

        fetch("http://localhost:5000/centrals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                mac: macInput,
                modelId: data.modelId,
            }),
        })
            .then(function () {
                queryClient.invalidateQueries({ queryKey: ["centrals"] });
                router.push("/centrals");
            })
            .catch(function (error) {
                console.error("Erro ao criar central:", error);
            });
    }

    return (
        <div className={style.div_criar_container}>
            <div className={style.div_titulo_voltar}>
                <button onClick={voltar} className={style.botao_voltar}>
                    <ChevronLeftIcon customSize="16" />
                </button>
                <h2>Criar Nova Central</h2>
            </div>

            <form onSubmit={handleSubmit(enviarNovaCentral)} className={style.formulario}>
                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>Nome</label>
                    <input
                        type="text"
                        {...register("name")}
                        className={style.input_form}
                    />
                    {errors.name && (
                        <p className={style.erro_mensagem}>{errors.name.message}</p>
                    )}
                </div>

                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>MAC</label>
                    <input
                        type="text"
                        {...register("mac")}
                        value={macInput}
                        onChange={handleChangeMac}
                        placeholder="AA:BB:CC:DD:EE:FF"
                        maxLength={17}
                        className={style.input_form}
                    />
                    {errors.mac && (
                        <p className={style.erro_mensagem}>{errors.mac.message}</p>
                    )}
                </div>

                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>Modelo</label>
                    <select
                        {...register("modelId")}
                        className={style.select_estilizado_inline}
                    >
                        <option value="">Selecione um modelo</option>
                        {modelos &&
                            modelos.map(function (model) {
                                return (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                );
                            })}
                    </select>
                    {errors.modelId && (
                        <p className={style.erro_mensagem}>{errors.modelId.message}</p>
                    )}
                </div>

                <button type="submit" className={style.botao_criar}>
                    Criar
                </button>
            </form>
        </div>
    );
}

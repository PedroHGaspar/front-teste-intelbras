"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { useModels } from "../../../../../presentation/components/utils/services/useModels";
import { useCentralById } from "../../../../../presentation/components/utils/services/useCentralById";
import { ChevronLeftIcon } from "../../../../../presentation/components/icons/chevron-left";
import * as style from "../../../../../presentation/pages/home/styles/centrals-page.css";

const schema = zod.object({
    name: zod.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    mac: zod.string().min(12, "MAC é obrigatório"),
    modelId: zod.string().min(1, "Modelo é obrigatório"),
});

type FormData = zod.infer<typeof schema>;

export default function EditarCentralPage() {
    const router = useRouter();
    const params = useParams();//aqui temos que ter o useParams pra trazer o id dinamico da url
    let id = Number(params.id);
    const queryClient = useQueryClient();

    const { data: modelos } = useModels();
    const { data: central } = useCentralById(id);

    const [macInput, setMacInput] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (central) {
            setValue("name", central.name);
            setValue("modelId", String(central.modelId));
            setMacInput(central.mac);
        }
    }, [central]);//aqui a gnt pré preenche os inputs com os dados da central

    function formatarMac(valor: string) {
        let apenasAlfanum = valor.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        let limitado = apenasAlfanum.slice(0, 12);
        let blocos = [];
        for (let i = 0; i < limitado.length; i += 2) {
            blocos.push(limitado.slice(i, i + 2));
        }
        return blocos.join(":");
    }

    function handleChangeMac(e: React.ChangeEvent<HTMLInputElement>) {
        setMacInput(formatarMac(e.target.value));
    }

    function voltar() {
        router.push("/centrals");
    }

    function enviarEdicao(data: FormData) {//poderiamos usar o async/await mas eu prefiro com o .then pra evitar complexidade desnecessária, além de que não temos múltiplas requisições acontecendo
        fetch(`http://localhost:5000/centrals/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name: data.name, mac: macInput, modelId: data.modelId }),
        })
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["centrals"] });
                queryClient.invalidateQueries({ queryKey: ["central", id] }); //padrao tanstack pra refazer a req e atualizar a lista
                router.push("/centrals");
            })
            .catch((err) => {
                console.error("Erro ao editar central:", err);
            });
    }


    return (
        <div className={style.div_criar_container}>
            <div className={style.div_titulo_voltar}>
                <button onClick={voltar} className={style.botao_voltar}>
                    <ChevronLeftIcon customSize="16" />
                </button>
                <h1>Editar Central</h1>
            </div>

            <form onSubmit={handleSubmit(enviarEdicao)} className={style.formulario}>
                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>Nome</label>
                    <input type="text" {...register("name")} className={style.input_form} />
                    {errors.name && <p className={style.erro_mensagem}>{errors.name.message}</p>}
                </div>

                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>MAC</label>
                    <input
                        type="text"
                        {...register("mac")}
                        value={macInput}
                        onChange={handleChangeMac}
                        maxLength={17}
                        className={style.input_form}
                    />
                    {errors.mac && <p className={style.erro_mensagem}>{errors.mac.message}</p>}
                </div>

                <div className={style.campo_form}>
                    <label className={style.label_criar_central}>Modelo</label>
                    <select {...register("modelId")} className={style.select_estilizado}>
                        <option value="">Selecione um modelo</option>
                        {modelos?.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                    {errors.modelId && <p className={style.erro_mensagem}>{errors.modelId.message}</p>}
                </div>

                <button type="submit" className={style.botao_criar}>
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
}

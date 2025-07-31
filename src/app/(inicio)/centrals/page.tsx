"use client";

import { useState } from "react";
import { useCentrals } from "../../../presentation/components/utils/services/useCentrals";

import { ChevronLeftIcon } from "../../../presentation/components/icons/chevron-left";
import { ChevronRightIcon } from "../../../presentation/components/icons/chevron-right";

import * as style from "../../../presentation/pages/home/styles/centrals-page.css";

export default function CentralsPage() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useCentrals(page);

    const next_page = () => setPage((prev) => prev + 1);
    const previous_page = () => setPage((prev) => Math.max(prev - 1, 1));

    if (isLoading) return <p>Carregando centrais...</p>;
    if (isError) return <p>Erro ao carregar centrais.</p>;

    return (
        <div className={style.div_pai}>
            <div>
                <h1>Centrais</h1>
                <p className={style.paragrafo_gerenciamento}>Gerenciamento de Centrais – Página {page}</p>
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.header_tabela}>ID</th>
                        <th className={style.header_tabela}>Nome</th>
                        <th className={style.header_tabela}>Modelo ID</th>
                        <th className={style.header_tabela}>MAC</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((central) => (
                        <tr key={central.id} className={`${style.linha_tr_tabela}`}>
                            <td className={style.colunas_tabela}>{central.id}</td>
                            <td className={style.colunas_tabela}>{central.name}</td>
                            <td className={style.colunas_tabela_modeloId}>{central.modelId}</td>
                            <td className={style.colunas_tabela}>{central.mac}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={style.container_paginacao}>
                <button
                    className={style.botao_paginacao}
                    onClick={previous_page}
                    disabled={page === 1}
                >
                    <ChevronLeftIcon customSize={"10"} />
                </button>
                <button className={style.botao_paginacao} onClick={next_page}>
                    <ChevronRightIcon customSize={"10"} />
                </button>
            </div>
        </div>
    );
}

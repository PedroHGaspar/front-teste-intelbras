"use client";

import { useState } from "react";
import { useCentrals } from "../../../presentation/components/utils/services/useCentrals";
import { ChevronLeftIcon } from "../../../presentation/components/icons/chevron-left";
import { ChevronRightIcon } from "../../../presentation/components/icons/chevron-right";
import { ChevronDownIcon } from "../../../presentation/components/icons/chevron-down";
import { ChevronUpIcon } from "../../../presentation/components/icons/chevron-up";

import * as style from "../../../presentation/pages/home/styles/centrals-page.css";

export default function CentralsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [nomeHeader, setNomeHeader] = useState<"name" | "modelId" | null>("name");
    const [sortOrdenacao, setsortOrdenacao] = useState<"asc" | "desc">("asc");

    const { data } = useCentrals(page, limit);
    const total_paginas = data ? Math.ceil(data.total / limit) : 1;

    const proxima_pagina = () => {
        if (page < total_paginas) setPage((prev) => prev + 1);
    };

    const pagina_anterior = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const handleSort = (key: "name" | "modelId") => {
        if (nomeHeader === key) {
            setsortOrdenacao((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setNomeHeader(key);
            setsortOrdenacao("asc");//crescente por padrão
        }
    };

    function ordenarColunas() { //essa função peguei de uma aplicação minha, basicamente ordena a coluna que precisar, só colocar o nome da coluna
        if (!data) return [];

        const sorted = [...data.data];//spread padrao 

        if (nomeHeader === "name") {
            sorted.sort((a, b) => {
                let nameA = a.name.match(/\d+/g)?.[0];
                let nameB = b.name.match(/\d+/g)?.[0];

                let numA = nameA ? parseInt(nameA) : 0;
                let numB = nameB ? parseInt(nameB) : 0;

                return sortOrdenacao === "asc" ? numA - numB : numB - numA;
            });
        } else if (nomeHeader === "modelId") {
            sorted.sort((a, b) =>
                sortOrdenacao === "asc"
                    ? a.modelId - b.modelId
                    : b.modelId - a.modelId
            );
        }

        return sorted;
    };

    function iconeOrdenarColunas(column: string) {
        if (nomeHeader === column) {
            if (sortOrdenacao === "asc") {
                return <ChevronUpIcon customSize="10" />;
            } else {
                return <ChevronDownIcon customSize="10" />;
            }
        }

        return <ChevronDownIcon customSize="10" />;//icone padrão
    }


    return (
        <div className={style.div_pai}>
            <div>
                <h1>Centrais</h1>
                <p className={style.paragrafo_gerenciamento}>
                    Gerenciamento de Centrais
                </p>
            </div>

            <div className={style.container_select}>
                <label>Itens por página:</label>
                <select
                    value={limit}
                    onChange={handleLimitChange}
                    className={style.select_estilizado}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.header_tabela}>ID</th>
                        <th className={`${style.header_tabela} ${style.header_clicavel}`} onClick={() => handleSort("name")}>
                            Nome {iconeOrdenarColunas("name")}
                        </th>
                        <th className={`${style.header_tabela} ${style.header_clicavel}`} onClick={() => handleSort("modelId")}>
                            Modelo ID {iconeOrdenarColunas("modelId")}
                        </th>
                        <th className={style.header_tabela}>MAC</th>
                    </tr>
                </thead>

                <tbody>
                    {ordenarColunas().map((central) => (
                        <tr key={central.id} className={style.linha_tr_tabela}>
                            <td className={style.colunas_tabela}>{central.id}</td>
                            <td className={style.colunas_tabela}>{central.name}</td>
                            <td className={style.colunas_tabela_modeloId}>
                                {central.modelId}
                            </td>
                            <td className={style.colunas_tabela}>{central.mac}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={style.container_paginacao}>
                <button
                    className={style.botao_paginacao}
                    onClick={pagina_anterior}
                    disabled={page === 1}
                >
                    <ChevronLeftIcon customSize={"10"} />
                </button>
                <span style={{ fontSize: "10px" }}>
                    {page} / {total_paginas}
                </span>
                <button
                    className={style.botao_paginacao}
                    onClick={proxima_pagina}
                    disabled={page >= total_paginas}
                >
                    <ChevronRightIcon customSize={"10"} />
                </button>
            </div>
        </div>
    );
}

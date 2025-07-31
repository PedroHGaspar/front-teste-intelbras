"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCentrals } from "../../../presentation/components/utils/services/useCentrals";
import { ChevronLeftIcon } from "../../../presentation/components/icons/chevron-left";
import { ChevronRightIcon } from "../../../presentation/components/icons/chevron-right";
import { ChevronDownIcon } from "../../../presentation/components/icons/chevron-down";
import { ChevronUpIcon } from "../../../presentation/components/icons/chevron-up";
import { TrashIcon } from "../../../presentation/components/icons/trash";
import { SearchIcon } from "../../../presentation/components/icons/search";
import type { Central } from "../../../presentation/components/utils/services/useCentrals";
import { useRouter } from "next/navigation";



import * as style from "../../../presentation/pages/home/styles/centrals-page.css";

export default function CentralsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [nomeHeader, setNomeHeader] = useState<"name" | "modelId" | null>("name");
    const [sortOrdenacao, setsortOrdenacao] = useState<"asc" | "desc">("asc");
    const [search, setSearch] = useState("");
    const [models, setModels] = useState<Record<number, string>>({}); // id e nome

    // const [centralSelecionada, setCentralSelecionada] = useState(); // modal

    const [centralSelecionada, setCentralSelecionada] = useState<Central>();//importei a tipagem
    const queryClient = useQueryClient();

    const { data } = useCentrals(page, limit);
    const total_paginas = data ? Math.ceil(data.total / limit) : 1;


    const router = useRouter();
    function irParaCriarCentral() {
        router.push("/centrals/criar");
    }


    function proxima_pagina() {
        if (page < total_paginas) setPage((prev) => prev + 1);
    };

    function pagina_anterior() {
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

    useEffect(() => {
        fetch("http://localhost:5000/models")
            .then((res) => res.json())
            .then((modeloLista) => {
                const mapear: Record<number, string> = {};
                modeloLista.forEach((modelo: any) => {
                    mapear[modelo.id] = modelo.name;
                });
                // console.log(mapear); -> aqui conseguimos ver que um novo objeto foi criado com id e nome sem as keys, apenas o value
                setModels(mapear);
            });
    }, []); // meu [] faz salvar localmente a lista dos models

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

        return <ChevronDownIcon customSize="10" />;
    }

    function linhasFiltradas() {
        let termo = search.toLowerCase();

        return ordenarColunas().filter((central) => {
            return (
                central.name.toLowerCase().includes(termo) ||
                models[central.modelId]?.toLowerCase().includes(termo)
            );
        });
    }

    function excluirCentral() {
        fetch(`http://localhost:5000/centrals/${centralSelecionada!.id}`, {//só forcei com ! pra tirar o erro pois sei que aqui não é undefined
            method: "DELETE",
        }).then(() => {
            setCentralSelecionada(undefined);
            queryClient.invalidateQueries({ queryKey: ["centrals"] });
        });
    }

    return (
        <div className={style.div_pai}>
            <div className={style.titulo_subtitulo}>
                <h1>Centrais</h1>
                <p className={style.paragrafo_gerenciamento}>
                    Gerenciamento de Centrais
                </p>
            </div>

            <div className={style.paginacao_busca}>
                <div className={style.container_select}>
                    <label>Itens por página:</label>
                    <select value={limit} onChange={handleLimitChange} className={style.select_estilizado}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                {/* <input type="text" placeholder="Busca por nome ou modelo" value={search} onChange={(e) => setSearch(e.target.value)} className={style.input_busca} /> */}
                <div className={style.container_busca_criar}>
                    <div className={style.input_wrapper}>
                        <input
                            type="text"
                            placeholder="Busca por nome ou modelo"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={style.input_busca}
                        />
                        <div className={style.input_icon}>
                            <SearchIcon customSize="14" />
                        </div>
                    </div>
                    <button className={style.botao_criar} onClick={irParaCriarCentral}>
                        Criar Central
                    </button>
                </div>
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.header_tabela}>ID</th>
                        <th className={`${style.header_tabela} ${style.header_clicavel}`} onClick={() => handleSort("name")}>
                            Nome {iconeOrdenarColunas("name")}
                        </th>
                        <th className={`${style.header_tabela} ${style.header_clicavel} ${style.header_clicavel_modeloId}`} onClick={() => handleSort("modelId")}>
                            Modelo ID {iconeOrdenarColunas("modelId")}
                        </th>
                        <th className={style.header_tabela}>MAC</th>
                        <th className={style.header_tabela}>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {linhasFiltradas().map((central) => (
                        <tr key={central.id} className={style.linha_tr_tabela}>
                            <td className={style.colunas_tabela}>{central.id}</td>
                            <td className={style.colunas_tabela}>{central.name}</td>
                            <td className={style.colunas_tabela_modeloId}>
                                {models[central.modelId] || central.modelId}
                            </td>
                            <td className={style.colunas_tabela}>{central.mac}</td>
                            <td className={style.colunas_tabela}>
                                <button title="Excluir" className={style.botao_icone_excluir} onClick={() => setCentralSelecionada(central)}>
                                    <TrashIcon customSize="12" />
                                </button>
                            </td>
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

            <div
                className={`${style.modal_overlay} ${centralSelecionada ? style.modal_aberto : ""}`}>
                <div
                    className={`${style.modal_conteudo} ${centralSelecionada ? style.modal_conteudo_visivel : ""}`}>
                    {centralSelecionada && (
                        <>
                            <h1>Confirmar a exclusão da seguinte central:</h1>
                            <div className={style.div_paragrafos_modal}>
                                <p className={style.p_modal}><strong>ID:</strong> {centralSelecionada.id}</p>
                                <p className={style.p_modal}><strong>Nome:</strong> {centralSelecionada.name}</p>
                                <p className={style.p_modal}><strong>Modelo:</strong> {models[centralSelecionada.modelId]}</p>
                                <p className={style.p_modal}><strong>MAC:</strong> {centralSelecionada.mac}</p>
                            </div>

                            <div className={style.modal_botoes}>
                                <button onClick={excluirCentral} className={style.botao_confirmar}>Sim</button>
                                <button onClick={() => setCentralSelecionada(undefined)} className={style.botao_cancelar}>Não</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

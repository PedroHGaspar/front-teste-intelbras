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
import { useCentralStore } from "../../../presentation/components/utils/services/centralStore";
import { PenIcon } from "../../../presentation/components/icons/pen";

import { useUndoStore } from "../../../presentation/components/utils/services/undoStore"; // novo Zustand
import { UndoNotificacao } from "../../../presentation/components/undoNotificacao"; // novo componente




import * as style from "../../../presentation/pages/home/styles/centrals-page.css";

export default function CentralsPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [nomeHeader, setNomeHeader] = useState<"id" | "name" | "modelId">("id");
    const [sortOrdenacao, setsortOrdenacao] = useState<"asc" | "desc">("asc");
    const [search, setSearch] = useState("");
    const [models, setModels] = useState<Record<number, string>>({}); // id e nome
    const { setTotalCentrals } = useCentralStore();//zustand
    const { totalCentrals } = useCentralStore();//vamos renderizar só qnd o totalCentras mudar, evitando ficar renderizando quando qualquer parte do estado mudar




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

    const handleSort = (key: "id" | "name" | "modelId") => { // adicionado "id" como opção válida
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

    useEffect(() => {
        if (data?.total) {
            setTotalCentrals(data.total);
        }
    }, [data?.total]);

    function ordenarColunas() {
        if (!data) return [];

        const sorted = [...data.data];

        if (nomeHeader === "name") {
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator

            sorted.sort((a, b) => {
                return sortOrdenacao === "asc"
                    ? collator.compare(a.name, b.name)
                    : collator.compare(b.name, a.name);
            });
        } else if (nomeHeader === "modelId") {
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator

            sorted.sort((a, b) => {
                let modelNameA = models[a.modelId] || "";
                let modelNameB = models[b.modelId] || "";

                return sortOrdenacao === "asc"
                    ? collator.compare(modelNameA, modelNameB)
                    : collator.compare(modelNameB, modelNameA);
            });
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
        let termo_filtrado = search.toLowerCase();

        return ordenarColunas().filter((central) => {
            return (
                central.name.toLowerCase().includes(termo_filtrado) ||
                models[central.modelId]?.toLowerCase().includes(termo_filtrado)
            );
        });
    }

    function excluirCentral() {
        fetch(`http://localhost:5000/centrals/${centralSelecionada!.id}`, {
            method: "DELETE",
        }).then(() => {
            useUndoStore.getState().addUndo(centralSelecionada!); // empilha os avisos de undo pra poder reverter (estado global)
            setCentralSelecionada(undefined);
            queryClient.invalidateQueries({ queryKey: ["centrals"] });
        });
    }

    function exportarParaCSV() {
        let dados = linhasFiltradas(); //filtro e ordenação ja foram feitos, ou seja, se nós ordenarmos o nome do maior pro menor irá aparecer assim no excel, assim como se ordernarmos do menor pro maior também irá ir já com a ordenação pro arquivo de download

        let headers_tabela = ["Nome", "MAC", "Modelo"];
        let linhas = dados.map((central) => {
            let nome = central.name;
            let mac = central.mac;
            let modelo = models[central.modelId] || central.modelId;
            return [nome, mac, modelo];
        });

        let conteudo_excel_csv = [
            headers_tabela.join(","),
            ...linhas.map((linha) => linha.map((campo) => `"${campo}"`).join(",")),
        ].join("\n"); //transformar td em string por que se nao teremos só 1 linha gigante no excel, assim a gnt quebra as linhas 

        let hoje = new Date().toISOString().split("T")[0];
        let nome_arquivo = `centrals-export-${hoje}.csv`;

        // blob é a melhor alternativa nesse caso -> https://developer.mozilla.org/en-US/docs/Web/API/Blob
        let blob = new Blob([conteudo_excel_csv], { type: "text/csv;charset=utf-8;" });//evita problam de acento
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", nome_arquivo);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }




    return (
        <div className={style.div_pai}>
            <div className={style.titulo_subtitulo}>
                <h1 className={style.titulo_centrais}>Centrais</h1>
                <p className={style.paragrafo_gerenciamento}>
                    Gerenciamento de Centrais
                </p>
                <p className={style.paragrafo_total_centrais_cadastradas}>
                    Total de centrais cadastradas:<strong> {totalCentrals}</strong>
                </p>
            </div>

            <div className={style.paginacao_busca}>
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
                    <div className={style.botoes_header_tabela}>
                        <button
                            className={style.botao_criar_csv}
                            onClick={exportarParaCSV}
                        >
                            Exportar CSV
                        </button>
                        <button className={style.botao_criar} onClick={irParaCriarCentral}>
                            Criar Central
                        </button>
                    </div>
                </div>
            </div>

            <table className={style.table}>
                <thead>
                    <tr>
                        {/* <th className={`${style.header_tabela} ${style.header_clicavel}`} onClick={() => handleSort("id")}>
                            ID {iconeOrdenarColunas("id")}
                        </th> */}
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
                            {/* <td className={style.colunas_tabela}>{central.id}</td> */}
                            <td className={style.colunas_tabela}>{central.name}</td>
                            <td className={style.colunas_tabela_modeloId}>
                                {models[central.modelId] || central.modelId}
                            </td>
                            <td className={style.colunas_tabela}>{central.mac}</td>
                            <td className={style.colunas_tabela_opcoes}>
                                <button title="Editar" className={style.botao_icone_editar} onClick={() => router.push(`/centrals/editar/${central.id}`)}>
                                    <PenIcon customSize="12" />
                                </button>

                                <button title="Excluir" className={style.botao_icone_excluir} onClick={() => setCentralSelecionada(central)}>
                                    <TrashIcon customSize="12" />
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={style.container_paginacao}>
                <span style={{ fontSize: "12px" }}>
                    Página {page} de {total_paginas} – Itens por página{" "}
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
                </span>

                <div className={style.paginacao_botoes}>
                    <button
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className={style.botao_paginacao}
                        title="Primeira página"
                    >
                        <ChevronLeftIcon customSize="10" />
                        <ChevronLeftIcon customSize="10" />
                    </button>

                    <button
                        onClick={pagina_anterior}
                        disabled={page === 1}
                        className={style.botao_paginacao}
                        title="Página anterior"
                    >
                        <ChevronLeftIcon customSize="10" />
                    </button>

                    <button
                        onClick={proxima_pagina}
                        disabled={page >= total_paginas}
                        className={style.botao_paginacao}
                        title="Próxima página"
                    >
                        <ChevronRightIcon customSize="10" />
                    </button>

                    <button
                        onClick={() => setPage(total_paginas)}
                        disabled={page >= total_paginas}
                        className={style.botao_paginacao}
                        title="Última página"
                    >
                        <ChevronRightIcon customSize="10" />
                        <ChevronRightIcon customSize="10" />
                    </button>
                </div>
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
            <UndoNotificacao />
        </div>
    );
}

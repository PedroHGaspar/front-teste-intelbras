import { style } from "@vanilla-extract/css";

export const div_pai = style({
    width: "40%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    gap: "2rem",
    margin: '0 auto',
    height: "fit-content",
    // marginTop: "10vh",
    background: "#22272c;",
    borderRadius: "2rem"
});

export const table = style({
    width: "auto",
    borderCollapse: "collapse",
    fontSize: "1.5rem",
});

export const header_tabela = style({
    backgroundColor: "#00a3359e",
    fontWeight: "bold",
    textAlign: "center",
    padding: "1rem",
});

export const linha_tr_tabela = style({
    borderBottom: "1px solid #0d1116",
    transition: "background-color 0.2s ease-in-out",

    selectors: {
        "&:nth-child(even)": {
            backgroundColor: "#161c23",
        },
        "&:nth-child(odd)": {
            backgroundColor: "#1c242e",
        },
    },
});

export const header_clicavel_modeloId = style({
    textAlign: "right",
});

export const header_clicavel = style({
    cursor: "pointer",
});

export const colunas_tabela = style({
    padding: "1.5rem",
    textAlign: 'center',
});

export const colunas_tabela_opcoes = style({
    padding: "1.5rem",
    textAlign: 'center',
    display: 'flex',
    gap: '1.5rem',
    justifyContent: "center"
});

export const colunas_tabela_modeloId = style({
    padding: "1rem",
    textAlign: 'right',
});

export const container_paginacao = style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export const paragrafo_gerenciamento = style({
    fontSize: '16px'
});

export const titulo_centrais = style({
    fontSize: '24px'
});

export const paragrafo_total_centrais_cadastradas = style({
    fontSize: '12px'
});

export const botao_paginacao = style({
    background: "#0d1116",
    // border: "1px solid #ccc",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "1.4rem",
    borderRadius: "4px",
    transition: "background 0.2s ease-in-out",
    color: "#FFF",

    selectors: {
        // "&:hover:not(:disabled)": {
        //     background: "#07111e",
        // },
        "&:disabled": {
            cursor: "not-allowed",
            opacity: 0.5,
        },
    },
});

export const container_select = style({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "12px",
});


export const input_busca = style({
    // padding: "8px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    background: "#0d1116",
    color: "#FFF",
    gap: "10px"
});

export const paginacao_busca = style({
    display: "flex",
    justifyContent: "space-between"
})

export const titulo_subtitulo = style({
    textAlign: "center"
})

export const botao_icone_excluir = style({
    background: "none",
    color: "#ff6a6a",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
    selectors: {
        '&:hover': {
            color: "#ff3838ff",
        },
    },
})

export const botao_icone_editar = style({
    background: "none",
    color: "#9fc4ff",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
    selectors: {
        '&:hover': {
            color: "#3e88ffff",
        },
    },
})


export const modal_overlay = style({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.2s ease, visibility 0.2s ease",
    zIndex: 1000,
});

export const modal_aberto = style({
    opacity: 1,
    visibility: "visible",
});

export const modal_conteudo = style({
    width: "400px",
    height: "auto",
    backgroundColor: "#1c242e",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    transform: "scale(0.95)",
    opacity: 0,
    transition: "opacity 0.2s ease, transform 0.2s ease",
});

export const modal_conteudo_visivel = style({
    opacity: 1,
    transform: "scale(1)",
});

export const modal_botoes = style({
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
    gap: "5rem"
});

export const botao_confirmar = style({
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    width: "70px"
});

export const botao_cancelar = style({
    backgroundColor: "gray",
    color: "white",
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    width: "70px"
});


export const p_modal = style({
    fontSize: "16px"
});

export const div_paragrafos_modal = style({
    display: "grid",
    textAlign: "start",
    margin: "3rem 0rem",
    gap: "6px"
});

export const container_busca_criar = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flex: 1,
});

export const input_wrapper = style({
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: "8px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    background: "#0d1116",
    color: "#FFF",
    gap: "10px"
});

export const input_icon = style({
    // position: "absolute",
    // right: "10px",
    // top: "50%",
    // transform: "translateY(-50%)",
    // pointerEvents: "none",
    // background: "#0d1116",
    // padding: "0rem 0.5rem"
});

export const botao_criar = style({
    backgroundColor: "#00a3359e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "12px",
    height: "auto",
    transition: "background-color 0.2s ease",
    selectors: {
        '&:hover': {
            backgroundColor: "#00eb4e9e",
        },
    },
});

export const label_criar_central = style({
    fontSize: "14px",
});


export const div_criar_container = style({
    background: "#22272c;",
    borderRadius: "2rem",
    height: "fit-content",
    padding: "3rem",
    margin: "0 auto",
    fontSize: "14px"
});

export const div_titulo_voltar = style({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
});

export const botao_voltar = style({
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#fff",
});

export const formulario = style({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
});

export const campo_form = style({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
});

export const input_form = style({
    padding: "8px 8px",
    fontSize: "14px",
    borderRadius: "4px",
    // border: "1px solid #ccc",
    // background: "#1c242e",
    background: "#0d1116",
    color: "#fff",
});

export const erro_mensagem = style({
    fontSize: "12px",
    color: "red",
});

export const botao_reverter = style({
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: "0.9rem",
    backgroundColor: "#00a3359e",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s ease",
    selectors: {
        '&:hover': {
            backgroundColor: "#00eb4e9e",
        },
    },
});

export const select_estilizado = style({
    padding: "6px 6px",
    fontSize: "12px",
    borderRadius: "4px",
    // border: "1px solid #ccc",
    backgroundColor: "#0d1116",
    color: "#fff",
    cursor: "pointer",
    borderColor: "#888",
    transition: "background 0.2s ease-in-out",
});

export const select_estilizado_inline = style({
    padding: "8px 8px",
    fontSize: "12px",
    borderRadius: "4px",
    // border: "1px solid #ccc",
    backgroundColor: "#0d1116",
    color: "#fff",
    cursor: "pointer",
    borderColor: "#888",
    transition: "background 0.2s ease-in-out",
});

export const paginacao_botoes = style({
    display: "flex",
    gap: "0.4rem",
});

export const botoes_header_tabela = style({
    display: "flex",
    gap: "0.8rem",
});


export const botao_criar_csv = style({
    backgroundColor: "#0075a39e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "12px",
    height: "auto",
    transition: "background-color 0.2s ease",
    selectors: {
        '&:hover': {
            backgroundColor: "#00a4e69e",
        },
    },
});
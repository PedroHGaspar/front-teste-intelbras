// src/app/centrals/styles/centrals-page.css.ts
import { style } from "@vanilla-extract/css";

export const div_pai = style({
    // width: "max-content",
    width: "40%",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    gap: "2rem",
    margin: '0 auto'
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
    padding: "1rem",
    textAlign: 'center',
});
export const colunas_tabela_modeloId = style({
    padding: "1rem",
    textAlign: 'right',
});

export const container_paginacao = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",

});
export const paragrafo_gerenciamento = style({
    fontSize: '14px'
});

export const botao_paginacao = style({
    background: "#f4f4f4",
    border: "1px solid #ccc",
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
    fontSize: "1.4rem",
    borderRadius: "4px",
    transition: "background 0.2s ease-in-out",

    selectors: {
        "&:hover:not(:disabled)": {
            background: "#e2e2e2",
        },
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

export const select_estilizado = style({
    padding: "0.5rem",
    fontSize: "12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#0d1116",
    color: "#fff",
    cursor: "pointer",
    borderColor: "#888",
    transition: "background 0.2s ease-in-out",
});

export const input_busca = style({
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    border: "1px solid #ccc",
    background: "#1c242e",
    color: "#FFF",
    width: "auto"
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
    color: "#FFF",
    cursor: "pointer",
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
    margin: "3rem 0rem"

});

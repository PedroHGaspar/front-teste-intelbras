// src/app/centrals/styles/centrals-page.css.ts
import { style } from "@vanilla-extract/css";

export const div_pai = style({
    width: "max-content",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    gap: "2rem",
    margin: '0 auto'
});

export const table = style({
    width: "max-content",
    borderCollapse: "collapse",
    fontSize: "1.5rem",
});

export const header_tabela = style({
    backgroundColor: "#0d1116",
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

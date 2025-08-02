import { create } from "zustand";
import type { Central } from "./useCentrals";

let contadorIdUnico = 1;

export type UndoItem = {
    id: number; // agora é um número, não uma string
    central: Central;
};

type UndoStore = {
    refazer_exclusao: UndoItem[];
    addUndo: (central: Central) => void;
    removeUndo: (id: number) => void;
};

export const useUndoStore = create<UndoStore>((set) => ({
    refazer_exclusao: [],

    addUndo: (central) => {
        const novoItem = {
            id: contadorIdUnico++, // + 1 pra cada item, assim nunca vao ter id igual. Tem algumas formas de fazer isso mas eu escolhi essa que é mais simples
            central,
        };

        set((state) => ({
            refazer_exclusao: [...state.refazer_exclusao, novoItem],// aqui eu peguei o estado da store(state), peguei a lista atual de cards ativo(refazer_exclusao) copiei todos os itens anteriores e adicionei um novo(novoItem)
        }));
    },

    removeUndo: (id) => {
        set((state) => ({
            refazer_exclusao: state.refazer_exclusao.filter((item) => item.id !== id),//agora aqui caso clique no botao de desfazer, temos o filter que percorre toda a lista e mantem apenas os itens que não tem o id igual ao que foi passado na hora que o usuario excluiu o item (o id nunca vai ser igual por causa do contadorID)

        }));
    },
}));

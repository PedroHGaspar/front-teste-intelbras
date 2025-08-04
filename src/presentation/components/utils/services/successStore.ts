import { create } from "zustand";
import type { Central } from "./useCentrals";

type SuccessStore = {
    centralCriada: Central | null;
    setCentralCriada: (central: Central) => void;
    limparCentralCriada: () => void;
};

export const useSuccessStore = create<SuccessStore>((set) => ({
    centralCriada: null,
    setCentralCriada: (central) => set({ centralCriada: central }),
    limparCentralCriada: () => set({ centralCriada: null }),
}));
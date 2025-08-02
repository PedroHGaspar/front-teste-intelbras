// src/store/centralStore.ts
import { create } from "zustand";

// Tipamos nosso estado global
type CentralStore = {
    totalCentrals: number;
    setTotalCentrals: (total: number) => void;
};

export const useCentralStore = create<CentralStore>((set) => ({
    totalCentrals: 0,
    setTotalCentrals: (total) => set({ totalCentrals: total }),
}));



// https://zustand.docs.pmnd.rs/getting-started/introduction

// import { create } from 'zustand'

// const useStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//     updateBears: (newBears) => set({ bears: newBears }),
// }))

// function BearCounter() {
//     const bears = useStore((state) => state.bears)
//     return <h1>{bears} bears around here...</h1>
// }

// function Controls() {
//     const increasePopulation = useStore((state) => state.increasePopulation)
//     return <button onClick={increasePopulation}>one up</button>
// }
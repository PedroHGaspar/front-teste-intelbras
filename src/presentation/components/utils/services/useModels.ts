// useModels.ts
import { useQuery } from "@tanstack/react-query";

export type Model = {
    id: number;
    name: string;
};

export function useModels() {
    return useQuery<Model[]>({
        queryKey: ["models"],
        queryFn: async () => {
            const dataRes = await fetch("http://localhost:5000/models");
            return dataRes.json();
        },
    });
}

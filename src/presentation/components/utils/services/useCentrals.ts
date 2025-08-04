import { useQuery } from "@tanstack/react-query";

export type Central = {
    id: number;
    name: string;
    mac: string;
    modelId: number;
};

export function useCentrals() {
    return useQuery<Central[]>({
        queryKey: ["centrals"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/centrals?_sort=id&_order=asc");
            return res.json();
        },
    });
}

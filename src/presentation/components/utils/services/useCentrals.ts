import { useQuery } from "@tanstack/react-query";

export type Central = {
    id: number;
    name: string;
    mac: string;
    modelId: number;
};

export function useCentrals(page: number, limit: number = 5) {
    return useQuery<Central[]>({
        queryKey: ["centrals", page],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/centrals?_page=${page}&_limit=${limit}`);
            return response.json();
        },
    });
}

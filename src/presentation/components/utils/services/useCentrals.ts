import { useQuery } from "@tanstack/react-query";

type Central = {
    id: number;
    name: string;
    mac: string;
    modelId: number;
};

export function useCentrals() {
    return useQuery<Central[]>({
        queryKey: ["centrals"],
        queryFn: async () => {
            let response = await fetch("http://localhost:3333/centrals");
            return response.json();
        },
    });
}

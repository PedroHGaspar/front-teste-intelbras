import { useQuery } from "@tanstack/react-query";

export type Central = {
    id: number;
    name: string;
    mac: string;
    modelId: number;
};

type CentralsResponse = {
    data: Central[];
    total: number;
};

export function useCentrals(page: number, limit: number = 5) {
    return useQuery<CentralsResponse>({
        queryKey: ["centrals", page, limit],
        queryFn: async () => {
            const [dataRes, totalRes] = await Promise.all([
                fetch(`http://localhost:5000/centrals?_page=${page}&_limit=${limit}`),
                fetch("http://localhost:5000/centrals")
            ]);

            const data = await dataRes.json();
            const totalData = await totalRes.json();
            const total = totalData.length;

            return { data, total };
        },
    });
}

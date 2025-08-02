import { useQuery } from "@tanstack/react-query";
import { Central } from "./useCentrals";

export function useCentralById(id: number) {
    return useQuery<Central>({
        queryKey: ["central", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/centrals/${id}`);
            return res.json();
        },
    });
}

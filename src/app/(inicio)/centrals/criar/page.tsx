"use client";

import { useRouter } from "next/navigation";

export default function CriarCentralPage() {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        router.push("/centrals");
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Criar Nova Central</h1>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    );
}

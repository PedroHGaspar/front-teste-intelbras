"use client";

import { useCentrals } from "../../presentation/components/utils/services/useCentrals";

export default function CentralsPage() {
    const { data, isLoading, isError } = useCentrals();

    if (isLoading) return <p>Carregando centrais...</p>;
    if (isError) return <p>Erro ao carregar centrais.</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Centrais</h1>
            <p>Gerenciamento de Centrais</p>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2rem" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Modelo ID</th>
                        <th>MAC</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((central) => (
                        <tr key={central.id}>
                            <td>{central.id}</td>
                            <td>{central.name}</td>
                            <td>{central.modelId}</td>
                            <td>{central.mac}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

"use client";

import { useState } from "react";
import axios from "axios";

export default function PacienteSearch({ onSelectPaciente }) {
    const [query, setQuery] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPacientes = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setPacientes([]);

        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/get/${query}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data && response.data.paciente) {
                setPacientes([response.data.paciente]);
            } else {
                throw new Error("La API no devolvió un paciente válido");
            }
        } catch (err) {
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 px-6 pt-20 flex flex-col items-center h-[52vh]">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Consulta de Pacientes</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Ingresar identificación..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 text-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchPacientes}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>
                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {pacientes.map((paciente) => (
                    <div key={paciente.id_paciente} className="border p-4 rounded-lg shadow-sm bg-gray-50 mt-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {`${paciente.primer_nombre} ${paciente.segundo_nombre} ${paciente.primer_apellido} ${paciente.segundo_apellido}`}
                        </h2>
                        <p className="text-gray-600"><strong>ID Paciente:</strong> {paciente.id_paciente}</p>
                        <button
                            onClick={() => onSelectPaciente(paciente)}  // Enviar el paciente seleccionado
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Seleccionar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";
import { useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function PacienteSearch() {
    const [query, setQuery] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPacientes = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/paciente/get?search=${query}`);
            setPacientes(response.data);
        } catch (err) {
            setError("Error al obtener los datos");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">
                Consulta de Pacientes
            </h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Buscar paciente..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                    </div>
                    <button
                        onClick={fetchPacientes}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>
                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <ul className="mt-4 space-y-2">
                    {pacientes.map((paciente) => (
                        <li key={paciente.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-700">{paciente.name}</h2>
                            <p className="text-gray-600">Edad: {paciente.age}</p>
                            <p className="text-gray-600">Diagnóstico: {paciente.diagnosis}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import authAxios from "@/utils/api/authAxios"; 

function PacienteSearch({ onSelectPaciente }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPaciente = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await authAxios.get(`/api/paciente/get/${query}`);

            if (response.data?.paciente) {
                const paciente = response.data.paciente;

                // Extraer nombre_usuario y pasarlo al objeto plano
                const pacienteConUsuario = {
                    ...paciente,
                    nombre_usuario: paciente.usuario?.nombre_usuario || ""
                };

                // Guardar en localStorage y enviar al componente padre
                localStorage.setItem("identificacion", paciente.identificacion);
                localStorage.setItem("nombre_usuario", pacienteConUsuario.nombre_usuario);
                
                onSelectPaciente(pacienteConUsuario);
            } else {
                setError("No se encontró el paciente.");
            }
        } catch (err) {
            console.error("Error al obtener paciente:", err);

            if (err.response?.status === 401) return;
            
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    // Guardar la identificación en localStorage cuando cambie el valor de query
    useEffect(() => {
        if (query.trim()) {
            localStorage.setItem("identificacion", query);
        }
    }, [query]);

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Paciente</h1>
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
                        onClick={fetchPaciente}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}

PacienteSearch.propTypes = {
    onSelectPaciente: PropTypes.object,
}

export default PacienteSearch; 
"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import authAxios from "@/utils/api/authAxios"; 

function MedicoSearch({ onSelectMedico }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMedico = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await authAxios.get(`/api/medico/get/${query}`);

            console.log("API GET", `/api/medico/get/${query}`);
            console.log("URL:", response);

            if (response.data?.medicos) {
                const medico = response.data.medicos;
                console.log("Respuesta completa:", response.data);

                // Extraer nombre_usuario y pasarlo al objeto plano
                const medicoConUsuario = {
                    ...medico,
                    nombre_usuario: medico.usuario?.nombre_usuario || ""
                };

                // Guardar en localStorage si quieres
                localStorage.setItem("identificacion", medico.identificacion);
                localStorage.setItem("nombre_usuario", medicoConUsuario.nombre_usuario); // opcional

                onSelectMedico(medicoConUsuario);
            } else {
                setError("No se encontró el médico.");
            }
        } catch (err) {
            console.error("Error al obtener médico:", err);
        
            if (err.response?.status === 401) {
                // No mostramos mensaje, porque el interceptor ya redirige al login
                return; // importante: detenemos la ejecución aquí
            }
        
            // Solo mostramos error si no fue un 401
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query.trim()) {
            localStorage.setItem("identificacion", query);
        }
    }, [query]);

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Médico</h1>
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
                        onClick={fetchMedico}
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

MedicoSearch.propTypes = {
    onSelectMedico: PropTypes.func.isRequired,
};

export default MedicoSearch;

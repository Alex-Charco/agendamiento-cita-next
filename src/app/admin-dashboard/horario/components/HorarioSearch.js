"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import authAxios from "@/utils/api/authAxios";

function HorarioSearch({ onHorarioEncontrado }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHorario = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await authAxios.get(`/api/horario/get/${query}`);

            console.log("API GET", `/api/horario/get/${query}`);
            console.log("Respuesta:", response.data);

            const { medico, horarios, turnos } = response.data;

            if (medico && horarios) {
                const especialidad = medico.especialidad || {};

                localStorage.setItem("identificacion", medico.identificacion);
                localStorage.setItem("nombre_medico", `${medico.primer_nombre} ${medico.primer_apellido}`);

                const data = {
                    medico,
                    especialidad,
                    horarios,
                    turnos, 
                };

                onHorarioEncontrado(data);
            } else {
                setError("No se encontró información de horario para el médico.");
            }

        } catch (err) {
            console.error("Error al obtener horarios:", err);

            if (err.response?.status === 401) return;

            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[60vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Horarios</h1>
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
                        onClick={fetchHorario}
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

HorarioSearch.propTypes = {
    onHorarioEncontrado: PropTypes.func.isRequired,
};

export default HorarioSearch;

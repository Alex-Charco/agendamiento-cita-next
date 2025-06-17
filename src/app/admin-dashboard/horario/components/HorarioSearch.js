"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import authAxios from "@/utils/api/authAxios";
import SearchInput from "@/components/search/SearchInput";

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

            if (medico) {
            const especialidad = medico.especialidad || {};

                localStorage.setItem("identificacion", medico.identificacion);
                localStorage.setItem("nombre_medico", `${medico.primer_nombre} ${medico.primer_apellido}`);

                const data = {
                    medico,
                    especialidad,
                    horarios: horarios || [],
					turnos: turnos || [],
                };

                onHorarioEncontrado(data);
            } else {
                setError("No se encontró información de horario para el médico.");
            }

        } catch (err) {
    console.error("Error al obtener horarios:", err);

    if (err.response?.status === 500 && err.response?.data?.message?.includes("sin horarios")) {
        // Caso especial: el médico existe pero no tiene horarios → NO es un error real
        const medico = err.response.data.medico || { identificacion: query };
        const especialidad = medico.especialidad || {};

        const data = {
            medico,
            especialidad,
            horarios: [],
            turnos: [],
        };

        onHorarioEncontrado(data);
    } else if (err.response?.status === 404) {
        setError("Médico no encontrado.");
    } else {
        setError("Ocurrió un error al consultar el horario.");
    }
}
 finally {
			setLoading(false);
		}
	};

    return (
        <SearchInput
            label="No. Identificación"
            placeholder="Ingresar identificación..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={fetchHorario}
            loading={loading}
            error={error}
        />
    );

}

HorarioSearch.propTypes = {
    onHorarioEncontrado: PropTypes.func.isRequired,
};

export default HorarioSearch;

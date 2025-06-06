"use client";

import { useState } from "react";
import authAxios from "@/utils/api/authAxios";
import PropTypes from "prop-types";
import SearchInput from "@/components/search/SearchInput";
// PERTENECE MEDICO ADFMIN
function CitaSearchMedico({ identificacion: idInicial = "", onSelectCita }) {
    const [identificacion, setIdentificacion] = useState(idInicial);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCitas = async () => {
        if (!identificacion.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await authAxios.get(`/api/cita/get/medico/${identificacion}?desdeHoy=true`);
            console.log("Citas response:", response);
            console.log("Citas obtenidas:", response.data);

            onSelectCita?.(response.data);

        } catch (err) {
            console.error("Error al obtener citas:", err);
            if (err.response?.status === 401) return;
            setError("No se pudieron obtener las citas. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchInput
            label="No. Identificación del Médico"
            placeholder="Ej. 1723456789"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            onClick={fetchCitas}
            loading={loading}
            error={error}
        />
    );
}

CitaSearchMedico.propTypes = {
    identificacion: PropTypes.string,
    onSelectCita: PropTypes.func,
};

export default CitaSearchMedico;

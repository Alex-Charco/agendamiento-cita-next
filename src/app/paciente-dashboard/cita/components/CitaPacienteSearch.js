"use client";

import { useState } from "react";
import authAxios from "@/utils/api/authAxios";
import PropTypes from "prop-types";
import SearchInput from "@/components/search/SearchInput";

function CitaPacienteSearch({ rol = "medico", identificacion: idInicial = "", onSelectCita }) {
    const [identificacion, setIdentificacion] = useState(idInicial);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCitas = async () => {
        if (!identificacion.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await authAxios.get(`/api/cita/get/paciente/${identificacion}`);
            console.log("Citas response:", response);
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
            label="No. Identificación"
            placeholder="Ej. 123456789"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            onClick={fetchCitas}
            loading={loading}
            error={error}
        />
    );
}

CitaPacienteSearch.propTypes = {
    rol: PropTypes.string,
    identificacion: PropTypes.string,
    onSelectCita: PropTypes.func,
};

export default CitaPacienteSearch;

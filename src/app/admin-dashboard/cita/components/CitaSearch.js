"use client";

import { useState } from "react";
import authAxios from "@/utils/api/authAxios";
import PropTypes from "prop-types";
import SearchInput from "@/components/search/SearchInput";

function CitaSearch({ rol = "medico", identificacion: idInicial = "", onSelectCita }) {
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
        console.log("Citas obtenidas:", response.data);

        // Aquí podrías enviar las citas a otro componente o manejar el resultado
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
            label="No. Identificación del Paciente"
            placeholder="Ej. 123456789"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            onClick={fetchCitas}
            loading={loading}
            error={error}
        />
    );
}

CitaSearch.propTypes = {
    rol: PropTypes.string,
    identificacion: PropTypes.string,
    onSelectCita: PropTypes.func,
};

export default CitaSearch;

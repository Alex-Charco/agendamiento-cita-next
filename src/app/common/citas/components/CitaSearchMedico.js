"use client";

import { useState } from "react";
import authAxios from "@/utils/api/authAxios";
import PropTypes from "prop-types";
import SearchInput from "@/components/search/SearchInput";
import { obtenerCitas } from "@/utils/api/obtenerCitas";

// PERTENECE MEDICO ADFMIN
function CitaSearchMedico({ identificacion: idInicial = "", onSelectCita }) {
    const [identificacion, setIdentificacion] = useState(idInicial);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuscarCitas = () => {
        obtenerCitas({
            identificacion,
            rol: "medico",
            setLoading,
            setError,
            onSelectCita,
        });
    };

    return (
        <SearchInput
            label="No. Identificación del Médico"
            placeholder="Ej. 1723456789"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            onClick={handleBuscarCitas} 
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

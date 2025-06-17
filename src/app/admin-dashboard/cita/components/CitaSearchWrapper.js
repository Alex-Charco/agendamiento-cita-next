import PropTypes from "prop-types";
import { useState } from "react";
import CitaSearch from "@/admin-dashboard/cita/components/CitaSearch";
import CitaSearchMedico from "@/common/citas/components/CitaSearchMedico";

export default function CitaSearchWrapper({ onSelectCita }) {
    const [tipoBusqueda, setTipoBusqueda] = useState("paciente");

    return (
        <div className="space-y-4">
            <select
                className="border rounded px-3 py-1 text-sm text-blue-800"
                value={tipoBusqueda}
                onChange={(e) => setTipoBusqueda(e.target.value)}
            >
                <option value="paciente">Buscar por Paciente</option>
                <option value="medico">Buscar por Médico</option>
            </select>

            {tipoBusqueda === "paciente" ? (
                <CitaSearch rol="admin" onSelectCita={onSelectCita} />
            ) : (
                <CitaSearchMedico onSelectCita={onSelectCita} />
            )}
        </div>
    );
}

// Agregamos la validación de props:
CitaSearchWrapper.propTypes = {
    onSelectCita: PropTypes.func.isRequired
};

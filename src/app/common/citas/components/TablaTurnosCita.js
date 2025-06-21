import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "@/components/table/DynamicTable";
import { capitalizeCompleto } from "@/utils/stringUtils"; 

export default function TablaTurnosCita({ turnos, onSeleccionarTurno }) {
    const columns = [
        { name: "Fecha", uid: "fecha" },
        { name: "Hora", uid: "hora" },
        {
            name: "Médico",
            uid: "medico",
            render: (turno) => (
                <span>{turno.medico?.medico || "N/A"}</span>
            ),
        },
        {
            name: "Especialidad",
            uid: "especialidad",
            render: (turno) => (
                <span>{capitalizeCompleto(turno.medico?.Especialidad?.especialidad || "N/A")}</span>
            ),
        },
        {
            name: "Atención",
            uid: "atencion",
            render: (turno) => (
                <span>{capitalizeCompleto(turno.medico?.Especialidad?.atencion || "N/A")}</span>
            ),
        },        
        {
            name: "Acción",
            uid: "accion",
            render: (turno) => (
                <button
                    onClick={() => onSeleccionarTurno?.(turno)} // 👈 evita crash si es undefined
                    className="text-white bg-blue-700 hover:bg-blue-700 px-3 py-1 rounded-lg text-[12px]"
                >
                    Registrar Cita
                </button>
            ),
        },        
    ];

    return (
        <div className="flex w-full justify-center py-2 mx-2">
            <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 text-center">
                <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                    Turnos disponibles
                </div>
                <DynamicTable
                    columns={columns}
                    data={Array.isArray(turnos) ? turnos : []}
                    filterPlaceholder="Filtrar turnos..."
                    showActionButton={false}
                />
            </div>
        </div>
    );
}

TablaTurnosCita.propTypes = {
    turnos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSeleccionarTurno: PropTypes.func, // no es obligatorio
};

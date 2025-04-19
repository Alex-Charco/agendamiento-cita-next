import React from "react";
import PropTypes from 'prop-types';
import DynamicTable from "@/components/table/DynamicTable";

export default function TablaHorarios({ horarios, onSeleccionarHorario, onActualizarTurnoExtra }) {

    const columns = [
        { name: "Fecha", uid: "fecha_horario" },
        { name: "Institución", uid: "institucion" },
        { name: "Inicio", uid: "hora_inicio" },
        { name: "Fin", uid: "hora_fin" },
        { name: "Máx. consultas", uid: "consulta_maxima" },
        { name: "Asignadas", uid: "asignado" },
        {
            name: "Disponible",
            uid: "disponible",
            render: (horario) => {
                const disponible = (horario.consulta_maxima ?? 0) - (horario.asignado ?? 0);
                return <span>{disponible}</span>;
            },
        },
        { name: "Seleccionar", uid: "seleccion" },
        {
            name: "Turno extra",
            uid: "turno_extra",
            render: (horario) => (
                <input
                    type="checkbox"
                    checked={horario.turno_extra === 1}
                    readOnly
                    className="w-4 h-4 cursor-default"
                />
            )
        },        
        {
            name: "Ver Turnos",
            uid: "acciones",
            render: (horario) => (
                <button
                    onClick={() => onSeleccionarHorario(horario)}
                    className="bg-gray-100 text-gray-600 text-xs px-4 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-md active:translate-y-0.5 active:shadow-inner transition-all duration-150"
                >
                    Ver turnos
                </button>
            ),
        },
    ];

    return (
        <div className="flex justify-center py-2">
            <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 text-center">
                {/* Título flotante */}
                <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                    Horarios disponibles
                </div>
                <DynamicTable
                    columns={columns}
                    data={horarios}
                    filterPlaceholder="Filtrar horario..."
                />
            </div>
        </div>
    );
}

TablaHorarios.propTypes = {
    horarios: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSeleccionarHorario: PropTypes.func.isRequired,
    onActualizarTurnoExtra: PropTypes.func.isRequired,
};

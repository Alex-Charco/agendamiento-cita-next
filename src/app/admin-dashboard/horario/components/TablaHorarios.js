import React from "react";
import PropTypes from 'prop-types';
import DynamicTable from "@/components/table/DynamicTable";
import { FaEye, FaEdit } from "react-icons/fa";
export default function TablaHorarios({ horarios, onSeleccionarHorario, onActualizarHorario, rol }) {

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
            name: "Acción",
            uid: "acciones",
            render: (horario) => (
                <div className="flex gap-3 justify-center items-center text-gray-600 text-lg">
                    <button
                        onClick={() => onSeleccionarHorario(horario)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        title="Ver turnos"
                    >
                        <FaEye />
                    </button>
                    {rol === 'administrador' && (
                        <button
                            onClick={() => onActualizarHorario(horario)}
                            className="text-green-600 hover:text-green-700 transition-colors"
                            title="Editar horario"
                        >
                            <FaEdit />
                        </button>
                    )}
                </div>
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
    onActualizarHorario: PropTypes.func.isRequired,
	rol: PropTypes.oneOf(['administrador', 'medico']).isRequired
};

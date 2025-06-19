import React from "react";
import PropTypes from 'prop-types';
import DynamicTable from "@/components/table/DynamicTable";
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
                        className="flex-1 sm:flex-none bg-blue-700 text-white text-[12px] px-3 py-1 rounded-lg shadow hover:bg-blue-800 transition-all"
                        title="Ver turnos"
                    >
                        Ver turno
                    </button>
                    {rol === 'administrador' && (
                        <button
                            onClick={() => onActualizarHorario(horario)}
                            className="flex-1 sm:flex-none bg-gray-200 text-gray-700 text-[12px] border border-gray-300 px-3 py-1 rounded-lg shadow hover:bg-gray-300 transition-all"
                            title="Actualizar horario"
                        >
                            Actualizar
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

import React from "react";
import DynamicTable from "@/components/table/DynamicTable";

export default function TablaHorarios({ horarios, onSeleccionarHorario }) {
    const columns = [
        { name: "Fecha", uid: "fecha_horario" },
        { name: "Institución", uid: "institucion" },
        { name: "Inicio", uid: "hora_inicio" },
        { name: "Fin", uid: "hora_fin" },
        { name: "Máx. consultas", uid: "consulta_maxima" },
        { name: "Asignadas", uid: "asignado" },
        {
            name: "Ver Turnos",
            uid: "acciones",
            render: (horario) => (
                <button
                    onClick={() => onSeleccionarHorario(horario)}
                    className="px-2 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Ver turnos
                </button>
            ),
        },
    ];

    return (
        <div className="my-6">
            <h2 className="text-xl text-gray-600 font-semibold mb-2">Horarios disponibles</h2>
            <DynamicTable
                columns={columns}
                data={horarios}
                filterPlaceholder="Buscar horario..."
            />
        </div>
    );
}

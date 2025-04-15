// components/TablaTurnos.jsx
import React from "react";
import DynamicTable from "@/components/table/DynamicTable";

export default function TablaTurnos({ turnos }) {
    console.log("Turnos recibidos:", turnos);
    const columns = [
        { name: "Turno", uid: "numero_turno" },
        { name: "Hora", uid: "hora_turno" },
        { name: "Estado", uid: "estado" },
    ];

    if (!turnos || turnos.length === 0) {
        return <p className="text-center text-gray-500">No hay turnos disponibles para mostrar.</p>;
    }
    

    return (
        <div className="my-6 text-gray-600">
            <h2 className="text-xl font-semibold mb-2">Turnos</h2>
            <DynamicTable columns={columns} data={turnos} filterPlaceholder="Buscar turno..." />
        </div>
    );
}

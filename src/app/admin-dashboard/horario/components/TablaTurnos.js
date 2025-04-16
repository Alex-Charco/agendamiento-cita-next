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

    return (
        <div className="my-6 text-gray-600">
            <h2 className="text-xl font-semibold mb-2">Turnos</h2>
            <DynamicTable 
				columns={columns} 
				data={turnos}
				actionLabel="Nuevo Turno"
				actionRoute="/admin-dashborad/paciente/consultar-paciente"
				filterPlaceholder="Buscar turno..." />
        </div>
    );
}

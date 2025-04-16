import React from "react";
import DynamicTable from "@/components/table/DynamicTable";

export default function TablaTurnos({ turnos }) {
    console.log("Turnos recibidos:", turnos);
    const columns = [
        { name: "Fecha", uid: "fecha" },
        { name: "Turno", uid: "numero_turno" },
        { name: "Hora", uid: "hora_turno" },
        { name: "Estado", uid: "estado" },
    ];

    return (
        <div className="flex justify-center py-2">
            <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50  text-center">
                {/* Título flotante */}
                <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                    Turnos disponibles
                </div>
            <DynamicTable 
				columns={columns} 
				data={turnos}
				actionLabel="Nuevo Turno"
				actionRoute="/admin-dashborad/paciente/consultar-paciente"
				filterPlaceholder="Buscar turno..." />
			</div>
		</div>
    );
}
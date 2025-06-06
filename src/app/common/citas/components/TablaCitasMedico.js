import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "@/components/table/DynamicTable";
import { capitalize } from "@/utils/stringUtils";


export default function TablaCitasMedico({ citas, onVerCita, onEditarCita }) {
    const columns = [
        { name: "Paciente", uid: "nombre" },
        { name: "Identificacion", uid: "identificacion" },
        { name: "Correo", uid: "correo" },
        { name: "Fecha Turno", uid: "fecha_turno" },
        { name: "Hora Turno", uid: "hora_turno" },
        { name: "No. Turno", uid: "numero_turno" },
        { name: "Fecha Creación", uid: "fecha_creacion" },
        { name: "Estado", uid: "estado" },
    ];

    // Capitaliza los campos de texto de cada cita
    const citasTransformadas = citas.map((cita) => ({
        ...cita,
        estado: capitalize(cita.estado),
    }));

    return (
        <div className="flex justify-center py-2">
            <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 text-center">
                {/* Título flotante */}
                <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                    Lista de citas
                </div>
                <DynamicTable
                    columns={columns}
                    data={citasTransformadas}
                    filterPlaceholder="Filtrar citas..."
                    actionLabel="" i
                    actionRoute="/admin-dashboard/citas/crear"
                />
            </div>
        </div>
    );
}

TablaCitasMedico.propTypes = {
    citas: PropTypes.arrayOf(PropTypes.object).isRequired,
    onVerCita: PropTypes.func.isRequired,
    onEditarCita: PropTypes.func.isRequired,
};

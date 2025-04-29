import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "@/components/table/DynamicTable";

// Función para capitalizar la primera letra de un string
const capitalize = (text) => {
  if (typeof text !== "string") return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default function TablaCitas({ citas, onVerCita, onEditarCita }) {
    const columns = [
	  { name: "Médico", uid: "nombre_medico" },
	  { name: "Especialidad", uid: "especialidad" },
	  { name: "Tipo Atención", uid: "tipo_atencion" },
	  { name: "Consultorio", uid: "consultorio" },
	  { name: "Fecha Turno", uid: "fecha_turno" },
	  { name: "Hora Turno", uid: "hora_turno" },
	  { name: "No. Turno", uid: "numero_turno" },
	  { name: "Fecha Creación", uid: "fecha_creacion" },
	  { name: "Estado", uid: "estado" },
	];
	
	// Capitaliza los campos de texto de cada cita
	const citasTransformadas = citas;

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
                    actionLabel="Nueva cita"
                    actionRoute="/admin-dashboard/citas/crear"
                />
            </div>
        </div>
    );
}

TablaCitas.propTypes = {
    citas: PropTypes.arrayOf(PropTypes.object).isRequired,
    onVerCita: PropTypes.func.isRequired,
    onEditarCita: PropTypes.func.isRequired,
};

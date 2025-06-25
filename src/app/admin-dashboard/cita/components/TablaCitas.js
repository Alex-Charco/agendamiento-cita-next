import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "@/components/table/DynamicTable";

const capitalize = (text) => {
  if (typeof text !== "string") return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export default function TablaCitas({
  citas,
  onVerCita,
  onEditarCita,
  onRegistrarAsistencia,
  onReagendarCita,
}) {
  const columns = [
	{ name: "Fecha Turno", uid: "fecha_turno" },
    { name: "Hora Turno", uid: "hora_turno" },
    { name: "No. Turno", uid: "numero_turno" },
    { name: "Médico", uid: "nombre_medico" },
    { name: "Especialidad", uid: "especialidad" },
    { name: "Tipo Atención", uid: "tipo_atencion" },
    { name: "Consultorio", uid: "consultorio" },
    { name: "Estado", uid: "estado" },
	{ name: "Fecha Creación", uid: "fecha_creacion" },
    {
      name: "Acciones",
      uid: "acciones",
      render: (cita) => (
        <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
          <button
		  className="flex-1 sm:flex-none bg-gray-200 text-gray-700 text-[12px] border border-gray-300 px-3 py-1 rounded-lg shadow hover:bg-gray-300 transition-all"
		  onClick={() => onReagendarCita(cita)}
		>
		  Reagendar
		</button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center py-2">
      <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 text-center">
        <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
          Lista de citas
        </div>
        <DynamicTable
          columns={columns}
          data={citas}
          filterPlaceholder="Filtrar citas..."
          actionLabel=""
          actionRoute="/admin-dashboard/citas/crear"
        />
      </div>
    </div>
  );
}

// ✅ Asegúrate de definir los nuevos props aquí:
TablaCitas.propTypes = {
  citas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onVerCita: PropTypes.func.isRequired,
  onEditarCita: PropTypes.func.isRequired,
  onRegistrarAsistencia: PropTypes.func.isRequired,
  onReagendarCita: PropTypes.func, // Puede ser opcional si no siempre se usa
};

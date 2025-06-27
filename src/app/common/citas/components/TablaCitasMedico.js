import React from "react";
import PropTypes from "prop-types";
import DynamicTable from "@/components/table/DynamicTable";
import { capitalize } from "@/utils/stringUtils";

export default function TablaCitasMedico({
  citas,
  onRegistrarAsistencia,
  onReagendarCita,
  mostrarAsistencia = false,
}) {
  const columns = [
	{ name: "Fecha Turno", uid: "fecha_turno" },
    { name: "Hora Turno", uid: "hora_turno" },
    { name: "No. Turno", uid: "numero_turno" },
    { name: "Paciente", uid: "nombre" },
    { name: "Identificación", uid: "identificacion" },
    { name: "Correo", uid: "correo", render: (cita) => <span>{cita.correo}</span> },
	{ name: "Estado", uid: "estado" },
    { name: "Fecha Creación", uid: "fecha_creacion" },
    {
      name: "Acciones",
      uid: "acciones",
      render: (cita) => (
        <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
          {mostrarAsistencia && (
            <button
              className="flex-1 sm:flex-none bg-blue-700 text-white text-[12px] px-3 py-1 rounded-lg shadow hover:bg-blue-800 transition-all"
              onClick={() => onRegistrarAsistencia(cita)}
            >
              Nota evolutiva
            </button>
          )}
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
          actionRoute=""
        />
      </div>
    </div>
  );
}

TablaCitasMedico.propTypes = {
  citas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRegistrarAsistencia: PropTypes.func,  
  onReagendarCita: PropTypes.func.isRequired,
  mostrarAsistencia: PropTypes.bool,
};

"use client";
import React from "react";
import DynamicTable from "@/components/table/DynamicTable";
import { FaSearch } from "react-icons/fa";
import PropTypes from "prop-types";

export default function TablaNotasEvolutivas({
  paciente,
  notas,
  currentPage,
  totalPages,
  onPageChange,
  onVerDetalle,
}) {
  const columns = [
    { name: "Fecha", uid: "fecha_creacion" },
    { name: "Persona de Salud", uid: "nombres_medico" },
    { name: "Especialidad", uid: "especialidad" },
    { name: "Tipo Consulta", uid: "tipo_consulta" },
    {
      name: "Acciones",
      uid: "acciones",
      render: (nota) => (
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs shadow hover:bg-blue-700 transition-all"
          onClick={() => onVerDetalle(nota)}
        >
          <FaSearch className="inline mr-1" /> Ver
        </button>
      ),
    },
  ];

  const transformNotas = notas.map((nota) => ({
    id_nota_evolutiva: nota.id_nota_evolutiva,
    fecha_creacion: nota.fecha_creacion,
    nombres_medico: paciente?.medico?.nombres_medico || "N/A",
    especialidad: paciente?.medico?.especialidad || "N/A",
    tipo_consulta: "Consulta Médica",
  }));

  return (
    <div className="relative w-full border rounded-lg p-3 mt-1 bg-white">
      <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
        Historial de Nota Médica
      </div>

      {(!notas || notas.length === 0) ? (
        <div className="text-sm text-gray-500 text-center py-6">
          No hay notas evolutivas registradas.
        </div>
      ) : (
        <DynamicTable
          columns={columns}
          data={transformNotas}
          filterPlaceholder="Buscar notas..."
          remotePagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

    </div>
  );
}

TablaNotasEvolutivas.propTypes = {
  paciente: PropTypes.object,
  notas: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onVerDetalle: PropTypes.func.isRequired,
};

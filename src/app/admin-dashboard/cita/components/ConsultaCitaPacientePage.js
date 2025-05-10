"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import PacienteDetalle from "@/admin-dashboard/cita/components/PacienteDetalle";
import TablaCitas from "@/admin-dashboard/cita/components/TablaCitas";
import { FaPlus } from "react-icons/fa";
import CitaSearch from "@/admin-dashboard/cita/components/CitaSearch";

export default function ConsultaCitaPacientePage() {
  const [selectedCita, setSelectedCita] = useState(null);
  const pathname = usePathname();

  const handleCitaSelect = (data) => {
    console.log("handleCitaSelect recibió:", data);
    if (data?.paciente && Array.isArray(data?.citas)) {
      setSelectedCita(data);
    }    
  };

  console.log("selectedCita:", selectedCita);

  const transformarCitasParaTabla = (citas) => {
    return citas.map((cita, index) => {
      const citaTransformada = {
        id_cita: index, // Si no hay ID en la API, usamos el índice
        nombre_medico: cita.datos_medico?.nombre || "No disponible",
        especialidad: cita.datos_especialidad?.nombre || "No disponible",
        tipo_atencion: cita.datos_especialidad?.atencion || "No disponible",
        consultorio: cita.datos_especialidad?.consultorio || "No disponible",
        fecha_turno: cita.datos_turno?.fecha_horario || "No disponible",
        hora_turno: cita.datos_turno?.hora_turno || "No disponible",
        numero_turno: cita.datos_turno?.numero_turno || "No disponible",
        fecha_creacion: cita.datos_cita?.fecha_creacion || "No disponible",
        estado: cita.datos_cita?.estado_cita || "No disponible",
      };

      console.log("Cita procesada:", citaTransformada);
      return citaTransformada;
    });
  };


  const buttons = [
    {
      label: "Nueva Cita",
      icon: FaPlus,
      action: "nueva-cita",
      href: "/admin-dashboard/cita/nueva-cita"
    },
    ...getCommonButtonsByPath(pathname),
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 min-h-screen">
      <NavbarComponent title="Consultar Cita Paciente" buttons={buttons} />

      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">

          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas
          </div>

          {/* Aquí puedes reemplazar rol e identificación por valores reales */}
          <CitaSearch onSelectCita={handleCitaSelect} />

          {selectedCita?.paciente ? (
            <>
              <PacienteDetalle
                paciente={selectedCita.paciente}
                mostrarCampos={["nombre", "identificacion", "nombre_usuario", "correo"]}
              />

              <TablaCitas
                citas={transformarCitasParaTabla(selectedCita.citas, selectedCita.paciente.nombre)}
                onVerCita={(cita) => console.log("Ver cita", cita)}
                onEditarCita={(cita) => console.log("Editar cita", cita)}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Selecciona un paciente para ver sus citas.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

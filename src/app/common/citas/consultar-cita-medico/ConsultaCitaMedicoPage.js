"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalleCita from "@/common/citas/components/MedicoDetalleCita"; 
import TablaCitasMedico from "@/common/citas/components/TablaCitasMedico"; // 👈 usar la tabla correcta
import { FaPlus } from "react-icons/fa";
import CitaSearchMedico from "@/common/citas/components/CitaSearchMedico"; 

export default function ConsultaCitaMedicoPage() {
  const [selectedMedico, setSelectedMedico] = useState(null);
  const pathname = usePathname();

  const handleCitaSelect = (data) => {
    console.log("handleCitaSelect recibió:", data);
    if (data?.medico && Array.isArray(data?.citas)) {
      setSelectedMedico(data);
    }    
  };

  const transformarCitasParaTabla = (citas) => {
    return citas.map((cita) => ({
      nombre: cita.paciente?.nombre || "", // 👈 tomar datos del paciente
      identificacion: cita.paciente?.identificacion || "",
      correo: cita.paciente?.correo || "",
      fecha_turno: cita.turno?.horario?.fecha_horario || "",
      hora_turno: cita.turno?.hora_turno || "",
      numero_turno: cita.turno?.id_turno || "",
      fecha_creacion: cita.fecha_creacion || "",
      estado: cita.estado_cita || "",
    }));
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
      <NavbarComponent title="Consultar Cita Médico" buttons={buttons} />

      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">

          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas Médico
          </div>

          <CitaSearchMedico onSelectCita={handleCitaSelect} />

          {selectedMedico?.medico ? (
            <>
              <MedicoDetalleCita
                medico={selectedMedico.medico}
                mostrarCampos={["nombre", "identificacion", "especialidad", "correo"]}
              />

              <TablaCitasMedico
                citas={transformarCitasParaTabla(selectedMedico.citas)}
                onVerCita={(cita) => console.log("Ver cita", cita)}
                onEditarCita={(cita) => console.log("Editar cita", cita)}
              />
            </>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Selecciona un médico para ver sus citas.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import PacienteDetalle from "@/admin-dashboard/cita/components/PacienteDetalle";
import MedicoDetalleCita from "@/common/citas/components/MedicoDetalleCita";
import TablaCitas from "@/admin-dashboard/cita/components/TablaCitas";
import TablaCitasMedico from "@/common/citas/components/TablaCitasMedico";
import CitaSearchWrapper from "@/admin-dashboard/cita/components/CitaSearchWrapper";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function ConsultaCitaAdminPage() {
  const [data, setData] = useState(null);
  const pathname = usePathname();

  const handleCitaSelect = (responseData) => {
    setData(responseData);
  };

  const buttons = [
    {
      label: "Nueva Cita",
      icon: FaPlus,
      action: "nueva-cita",
      href: "/admin-dashboard/cita/nueva-cita",
    },
    ...getCommonButtonsByPath(pathname),
  ];

  const renderDetalleYTabla = () => {
    if (data?.paciente) {
      return (
        <>
          <PacienteDetalle
            paciente={data.paciente}
            mostrarCampos={["nombre", "identificacion"]}
          />
          <TablaCitas
            citas={transformarCitasPaciente(data.citas)}
            onVerCita={(c) => console.log("Ver cita", c)}
            onEditarCita={(c) => console.log("Editar cita", c)}
          />
        </>
      );
    }

    if (data?.medico) {
      return (
        <>
          <MedicoDetalleCita
            medico={data.medico}
            mostrarCampos={["nombre", "especialidad", "atencion", "consultorio"]}
          />
          <TablaCitasMedico
            citas={transformarCitasMedico(data.citas)}
            onVerCita={(c) => console.log("Ver cita", c)}
            onEditarCita={(c) => console.log("Editar cita", c)}
          />
        </>
      );
    }

    return (
      <p className="text-center text-gray-500 mt-4">
        Busca un paciente o médico para ver sus citas.
      </p>
    );
  };

  return (
    <div className="bg-gray-50 border border-gray-200 min-h-screen">
      <NavbarComponent title="Buscar Cita" buttons={buttons} />
      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">
          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas
          </div>

          <CitaSearchWrapper onSelectCita={handleCitaSelect} />

          {renderDetalleYTabla()}
        </div>
      </div>
    </div>
  );
}

// Transformadores de citas
function transformarCitasPaciente(citas) {
  return citas.map((cita, index) => ({
    id_cita: index,
    nombre_medico: cita.datos_medico?.nombre || "No disponible",
    especialidad: cita.datos_especialidad?.nombre || "No disponible",
    tipo_atencion: cita.datos_especialidad?.atencion || "No disponible",
    consultorio: cita.datos_especialidad?.consultorio || "No disponible",
    fecha_turno: cita.datos_turno?.fecha_horario || "No disponible",
    hora_turno: cita.datos_turno?.hora_turno || "No disponible",
    numero_turno: cita.datos_turno?.numero_turno || "No disponible",
    fecha_creacion: cita.datos_cita?.fecha_creacion || "No disponible",
    estado: cita.datos_cita?.estado_cita || "No disponible",
  }));
}

function transformarCitasMedico(citas) {
  return citas.map((cita) => ({
    nombre: cita.paciente?.nombre || "",
    identificacion: cita.paciente?.identificacion || "",
    correo: cita.paciente?.correo || "",
    fecha_turno: cita.turno?.horario?.fecha_horario || "",
    hora_turno: cita.turno?.hora_turno || "",
    numero_turno: cita.turno?.id_turno || "",
    fecha_creacion: cita.fecha_creacion || "",
    estado: cita.estado_cita || "",
  }));
}

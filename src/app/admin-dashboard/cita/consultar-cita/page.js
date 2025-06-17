"use client";

import React, { useState } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import PacienteDetalle from "@/admin-dashboard/cita/components/PacienteDetalle";
import MedicoDetalleCita from "@/common/citas/components/MedicoDetalleCita";
import TablaCitas from "@/admin-dashboard/cita/components/TablaCitas";
import TablaCitasMedico from "@/common/citas/components/TablaCitasMedico";
import CitaSearchWrapper from "@/admin-dashboard/cita/components/CitaSearchWrapper";
import ModalRegistrarAsistencia from "@/common/citas/components/ModalRegistrarAsistencia";
import { FaPlus } from "react-icons/fa";
import { usePathname,  useRouter } from "next/navigation";
import { mostrarToastExito } from "@/utils/toast";
import { handleReagendarCita as handleReagendarCitaUtil } from "@/utils/citasHandlers";

export default function ConsultaCitaAdminPage() {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [accionActual, setAccionActual] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleCitaSelect = (responseData) => {
    setData(responseData);
  };

  const handleReagendarCita = (cita) => {
	  handleReagendarCitaUtil({
		cita,
		data,
		setCitaSeleccionada,
		setAccionActual,
		setModalOpen,
	  });
	};

  const handleRegistrarAsistencia = (cita) => {
    console.log("Registrar asistencia para cita", cita);
    setCitaSeleccionada({
      id_cita: cita.id_cita,
      id_paciente: data?.paciente?.id_paciente || null,
      estadoPorDefecto: "CONFIRMADA",
    });
    setAccionActual("asistencia");
    setModalOpen(true);
  };
	
  const handleAsistenciaRegistrada = ({ estado_asistencia }) => {

    if (accionActual === "asistencia") {
      if (estado_asistencia === "CONFIRMADA") {
        mostrarToastExito("Asistencia registrada con estado CONFIRMADA");
        router.push(`/admin-dashboard/nota-evolutiva`);
      } else {
        mostrarToastExito("Asistencia registrada");
        setModalOpen(false);
      }
    }

    if (accionActual === "reagendar") {
      if (estado_asistencia === "REAGENDADA") {
        mostrarToastExito("Asistencia registrada como REAGENDADA, redirigiendo...");
        console.log("Redirigiendo a registrar-cita con id_paciente:");
        router.push(`/admin-dashboard/cita/reagendar-cita`);
      } else {
        mostrarToastExito("Asistencia registrada");
        setModalOpen(false);
      }
    }
  };

  const buttons = [
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
			  onRegistrarAsistencia={handleRegistrarAsistencia}
			  onReagendarCita={handleReagendarCita}
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
        <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 mx-2">
          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas
          </div>

          <CitaSearchWrapper onSelectCita={handleCitaSelect} />

          {renderDetalleYTabla()}
        </div>
      </div>

      <ModalRegistrarAsistencia
		  isOpen={modalOpen}
		  onClose={() => setModalOpen(false)}
		  id_cita={citaSeleccionada?.id_cita}
		  id_paciente={citaSeleccionada?.id_paciente}
		  onAsistenciaRegistrada={handleAsistenciaRegistrada}
		/>
    </div>
  );
}

// Transformadores de citas
function transformarCitasPaciente(citas) {
  return citas.map((cita, index) => ({
    id_cita: cita.datos_cita?.id_cita || index,
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

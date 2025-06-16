"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalleCita from "@/common/citas/components/MedicoDetalleCita";
import TablaCitasMedico from "@/common/citas/components/TablaCitasMedico";
import { FaPlus } from "react-icons/fa";
import authAxios from "@/utils/api/authAxios";
import { mostrarToastExito, mostrarToastError } from "@/utils/toast";
import ModalRegistrarAsistencia from "@/common/citas/components/ModalRegistrarAsistencia";

export default function ConsultaCitaMedicoPage() {
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [error, setError] = useState(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoAccion, setTipoAccion] = useState(null); // "asistencia" o "reagendar"
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchCitasAutomaticamente = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      try {
        const parsedUser = JSON.parse(storedUser);
        const id = parsedUser?.identificacion;
        if (!id) return;

        const response = await authAxios.get(`/api/cita/get/medico/${id}?desdeHoy=true`);
        console.log("datos api medico:", response);
        setSelectedMedico(response.data);
      } catch (err) {
        console.error("Error al obtener citas automáticamente:", err);
        setError("No se pudieron obtener las citas. Inténtalo de nuevo.");
      }
    };

    fetchCitasAutomaticamente();
  }, []);

  const transformarCitasParaTabla = (citas) => {
    return citas.map((cita) => ({
      nombre: cita.paciente?.nombre || "",
      identificacion: cita.paciente?.identificacion || "",
      correo: cita.paciente?.correo || "",
      fecha_turno: cita.turno?.horario?.fecha_horario || "",
      hora_turno: cita.turno?.hora_turno || "",
      numero_turno: cita.turno?.id_turno || "",
      fecha_creacion: cita.fecha_creacion || "",
      estado: cita.estado_cita || "",
      original: cita,
    }));
  };

  const manejarAccion = (cita, accion) => {
    setCitaSeleccionada(cita.original);
    setTipoAccion(accion);
    setMostrarModal(true);

    if (typeof window !== "undefined") {
      const paciente = cita.original?.paciente;
      if (paciente) {
        sessionStorage.setItem("id_paciente_reagendar", paciente.id_paciente);
        sessionStorage.setItem("nombre_paciente_reagendar", paciente.nombre || "Paciente desconocido");
      }
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCitaSeleccionada(null);
    setTipoAccion(null);
  };

  const handleAsistenciaRegistrada = async ({ estado_asistencia }) => {
    if (tipoAccion === "asistencia") {
      if (estado_asistencia === "CONFIRMADA") {
        mostrarToastExito("Asistencia registrada con estado CONFIRMADA");
        router.push(`/medico-dashboard/nota-evolutiva`);
      } else {
        mostrarToastExito("Asistencia registrada");
        cerrarModal();
        await recargarCitas();
      }
    }

    if (tipoAccion === "reagendar") {
      if (estado_asistencia === "REAGENDADA") {
        mostrarToastExito("Asistencia registrada como REAGENDADA, redirigiendo...");
        router.push(`/medico-dashboard/cita/reagendar-cita-medico`);
      } else {
        mostrarToastExito("Asistencia registrada");
        cerrarModal();
        await recargarCitas();
      }
    }
  };

  const buttons = [...getCommonButtonsByPath(pathname)];

  return (
    <div className="bg-gray-50 border border-gray-200 min-h-screen">
      <NavbarComponent title="Buscar Cita Médico" buttons={buttons} />

      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 mx-2">
          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas Médico
          </div>

          {error && (
            <p className="text-center text-red-500 mt-4">{error}</p>
          )}

          {selectedMedico?.medico ? (
            <>
              <MedicoDetalleCita
                medico={selectedMedico.medico}
                mostrarCampos={["nombre", "especialidad", "atencion", "consultorio"]}
              />

              <TablaCitasMedico
                citas={transformarCitasParaTabla(selectedMedico.citas)}
                onRegistrarAsistencia={(cita) => manejarAccion(cita, "asistencia")}
                onReagendarCita={(cita) => manejarAccion(cita, "reagendar")}
              />

              <ModalRegistrarAsistencia
                isOpen={mostrarModal}
                onClose={cerrarModal}
                id_cita={citaSeleccionada?.id_cita}
                id_paciente={citaSeleccionada?.paciente?.id_paciente}
                estadoPorDefecto={citaSeleccionada?.estado_cita}
                onAsistenciaRegistrada={handleAsistenciaRegistrada}
              />
            </>
          ) : (
            !error && (
              <p className="text-center text-gray-500 mt-4">
                Cargando citas del médico...
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

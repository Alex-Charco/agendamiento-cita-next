"use client";

import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import authAxios from "@/utils/api/authAxios";
import { mostrarToastExito, mostrarToastError } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";

const obtenerNombreCompleto = (user) => {
  const {
    primer_nombre = "",
    segundo_nombre = "",
    primer_apellido = "",
    segundo_apellido = "",
  } = user || {};

  return [primer_nombre, segundo_nombre, primer_apellido, segundo_apellido]
    .filter(Boolean)
    .join(" ");
};

const ModalRegistrarCita = ({ turno, isOpen, onClose, onCitaRegistrada }) => {
  const registrarCita = async () => {
    const confirmado = await confirmarRegistro("¿Deseas registrar esta cita?");
    if (!confirmado) return;

    try {
      let id_paciente = null;
      let nombrePaciente = "Paciente desconocido";

      // Solo si estamos en entorno de navegador
      if (typeof window !== "undefined") {
        // 1. Intentar desde localStorage (modo paciente)
        const storedUser = localStorage.getItem("user");
        console.log("Intentando obtener datos del paciente...");
        if (storedUser) {
          console.log("Datos desde localStorage:", storedUser);
          const usuario = JSON.parse(storedUser);
          id_paciente = usuario?.id_paciente;
          nombrePaciente = obtenerNombreCompleto(usuario);
        }

        // 2. Si no se obtuvo desde localStorage, intentar desde sessionStorage (modo admin/médico)
        if (!id_paciente) {
          console.log("Buscando en sessionStorage...");
          console.log("id_paciente_reagendar:", sessionStorage.getItem("id_paciente_reagendar"));
          console.log("nombre_paciente_reagendar:", sessionStorage.getItem("nombre_paciente_reagendar"));
          id_paciente = sessionStorage.getItem("id_paciente_reagendar");
		  
		  const nombreSession = sessionStorage.getItem("nombre_paciente_reagendar");
			nombrePaciente = nombreSession ?? nombrePaciente;
        }
      }

      if (!id_paciente) {
        throw new Error("Identificación del paciente no disponible");
      }

      if (!turno?.id_turno) {
        throw new Error("ID del turno no disponible");
      }

      const payload = {
        id_turno: turno.id_turno,
        id_paciente,
      };

      console.log("Enviando datos a la API:", payload);

      await authAxios.post("/api/cita/registrar", payload);

      mostrarToastExito("Cita registrada con éxito");
      onCitaRegistrada?.();
      onClose();
    } catch (error) {
      console.error("Error al registrar cita:", error);
      mostrarToastError(error, "No se pudo registrar la cita");
    }
  };

  // Mostrar nombre del paciente en el modal (solo visual)
  let nombrePaciente = "Paciente desconocido";
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    const usuario = storedUser ? JSON.parse(storedUser) : null;
    const idPacienteLocal = usuario?.id_paciente;

    if (idPacienteLocal) {
      nombrePaciente = obtenerNombreCompleto(usuario);
      console.log("👤 Nombre desde localStorage (modo paciente):", nombrePaciente);
    } else {
      const nombreSession = sessionStorage.getItem("nombre_paciente_reagendar");
      nombrePaciente = nombreSession || nombrePaciente;
      console.log("👤 Nombre desde sessionStorage (modo admin/médico):", nombrePaciente);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent className="bg-gray-50 text-gray-600">
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-gray-200 text-gray-700">
              Confirmar Cita
            </ModalHeader>
            <ModalBody className="text-gray-600">
              <p><strong>Paciente:</strong> {nombrePaciente}</p>
              <p><strong>Médico:</strong> {turno.medico?.medico || "N/A"}</p>
              <p><strong>Fecha:</strong> {turno.fecha}</p>
              <p><strong>Hora:</strong> {turno.hora}</p>
              <p><strong>Especialidad:</strong> {turno.medico?.Especialidad?.especialidad || "N/A"}</p>
              <p><strong>Atención:</strong> {turno.medico?.Especialidad?.atencion || "N/A"}</p>
              <p><strong>Consultorio:</strong> {turno.medico?.Especialidad?.consultorio || "N/A"}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onModalClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={registrarCita}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

ModalRegistrarCita.propTypes = {
  turno: PropTypes.shape({
    id_turno: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    medico: PropTypes.shape({
      medico: PropTypes.string,
      Especialidad: PropTypes.shape({
        especialidad: PropTypes.string,
        atencion: PropTypes.string,
        consultorio: PropTypes.string,
      }),
    }),
    fecha: PropTypes.string,
    hora: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCitaRegistrada: PropTypes.func,
};


export default ModalRegistrarCita;

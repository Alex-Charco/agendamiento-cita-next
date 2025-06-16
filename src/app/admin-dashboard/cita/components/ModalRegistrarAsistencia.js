"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Textarea,
  Input
} from "@heroui/react";
import { useEffect, useState } from "react";
import authAxios from "@/utils/api/authAxios";
import { mostrarToastExito, mostrarToastError } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import { FaCalendarCheck } from "react-icons/fa";

const ModalRegistrarAsistencia = ({
  isOpen,
  onClose,
  id_cita,
  id_paciente,
  estadoPorDefecto,
  onAsistenciaRegistrada,
}) => {
  const [estadoAsistencia, setEstadoAsistencia] = useState("");
  const [comentario, setComentario] = useState("");
  
  // Al abrir el modal, establecer el estado por defecto si existe
  useEffect(() => {
    if (estadoPorDefecto && isOpen) {
      setEstadoAsistencia(estadoPorDefecto);
    } else if (!isOpen) {
      setEstadoAsistencia(""); // limpiar si se cierra
      setComentario("");
    }
  }, [estadoPorDefecto, isOpen]);

  const registrarAsistencia = async () => {
    const confirmado = await confirmarRegistro("¿Deseas registrar esta asistencia?");
    if (!confirmado) return;

    try {
      if (!id_cita) throw new Error("ID de cita no disponible");

      const payload = {
        id_cita,
        estado_asistencia: estadoAsistencia,
        comentario: comentario?.trim() || null,
      };

      await authAxios.post("/api/asistencia/registrar", payload);

      mostrarToastExito("Asistencia registrada con éxito");

      onAsistenciaRegistrada?.({
        id_cita,
        id_paciente,
        estado_asistencia: estadoAsistencia,
      });
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      mostrarToastError(error, "No se pudo registrar la asistencia");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent className="bg-white text-gray-800 rounded-lg shadow-lg">
        {(onModalClose) => (
          <>
            <ModalHeader className="bg-gradient-to-b from-celeste-fuerte to-[#F5F7FC] flex items-center gap-2 text-blue-800 font-semibold text-lg rounded-t-md px-4">
              <FaCalendarCheck className="text-xl" />
              Registrar Asistencia
            </ModalHeader>

            <ModalBody className="px-4 py-2">
              <div className="mt-2">
				  <label className="text-sm font-bold text-gray-700 mb-1 block">ID Cita</label>
				  <Input
					isReadOnly
					value={id_cita}
					variant="light"
					className="bg-gray-100 text-gray-800 rounded-md border-none shadow-none cursor-default"
				  />
				</div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Estado de asistencia</label>
                <Select
                  aria-label="Estado de asistencia"
                  variant="light"
                  fullWidth
                  placeholder="Selecciona estado"
                  onChange={(e) => setEstadoAsistencia(e.target.value)}
				  className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md shadow-sm focus:outline-none transition-colors duration-200"
                >
                  {["CONFIRMADA", "CANCELADA", "REAGENDADA", "NO_ASISTIO"].map((estado) => (
                    <SelectItem
                      key={estado}
                      value={estado}
                      className="text-blue-700 font-medium"
                    >
                      {estado}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Comentario (opcional)</label>
                <Textarea
                  placeholder="Escribe un comentario si es necesario..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  maxLength={600}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-0 border-none shadow-none"
                />
              </div>
            </ModalBody>

            <ModalFooter className="px-4 py-3 bg-gray-50 rounded-b-md">
              <Button
                color="danger"
                variant="light"
                onPress={onModalClose}
                className="text-sm"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={registrarAsistencia}
                isDisabled={!estadoAsistencia}
                className="text-sm font-semibold"
              >
                Registrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalRegistrarAsistencia;

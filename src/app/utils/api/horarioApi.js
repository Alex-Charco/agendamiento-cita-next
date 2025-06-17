import authAxios from "@/utils/api/authAxios";
import Swal from "sweetalert2";
import {
  mostrarToastExito,
  mostrarToastError,
  manejarSesionExpirada,
} from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";

// Función genérica para manejar errores
function manejarError(error, setMensaje, setSuccess) {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;

  console.error("Error:", { status, serverMessage, fullError: error });

  if (status === 401) {
    manejarSesionExpirada(setMensaje);
  } else {
    const mensajeError = serverMessage || error.message || "Error desconocido";
    setMensaje(`Error: ${mensajeError}`);
    mostrarToastError(error);
  }
  setSuccess(false);
}

// Función genérica para confirmación previa
async function confirmarAccion(mensaje) {
  const confirmado = await confirmarRegistro(mensaje);
  if (!confirmado) {
    await Swal.fire("Cancelado", "La operación fue cancelada.", "info");
  }
  return confirmado;
}

// Registrar horario
async function RegistrarHorario(data, identificacion, setMensaje, setSuccess) {
  if (!identificacion) {
    setMensaje("No se encontró la identificación del médico. Por favor, ingrésela.");
    return;
  }

  const confirmado = await confirmarAccion("¿Estás seguro de que deseas registrar este horario?");
  if (!confirmado) return;

  const payload = { ...data };

  if (payload.seleccion === "" || payload.seleccion === "null" || payload.seleccion === undefined) {
    payload.seleccion = null;
  }
  delete payload.identificacion_paciente_horario;

  try {
    await authAxios.post(`/api/horario/registrar/${identificacion}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    mostrarToastExito("¡Horario registrado exitosamente!");
    setMensaje("");
  } catch (error) {
    manejarError(error, setMensaje, setSuccess);
  }
}

// Actualizar horario
async function ActualizarHorario(data, id_horario, setMensaje, setSuccess) {
  const confirmado = await confirmarAccion("¿Estás seguro de que deseas actualizar este horario?");
  if (!confirmado) return;

  try {
    const response = await authAxios.put(`/api/horario/put/${id_horario}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Horario actualizado:", response.data);
    mostrarToastExito("¡Horario actualizado exitosamente!");
    setMensaje("");
  } catch (error) {
    manejarError(error, setMensaje, setSuccess);
  }
}

export { RegistrarHorario, ActualizarHorario };

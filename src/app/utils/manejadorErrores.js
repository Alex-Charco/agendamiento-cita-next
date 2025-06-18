import { mostrarToastError, manejarSesionExpirada } from "@/utils/toast";

// Función genérica para manejar errores
export function manejarError(error, setMensaje, setSuccess) {
  const status = error.response?.status;
  const serverMessage = error.response?.data?.message;

  console.error("Error:", { status, serverMessage, fullError: error });

  if (status === 401) {
    manejarSesionExpirada(setMensaje);
  } else {
    const mensajeError = serverMessage || error.message || "Error desconocido";
    if (setMensaje) setMensaje(`Error: ${mensajeError}`);
    mostrarToastError(error);
  }
  if (setSuccess) setSuccess(false);
}

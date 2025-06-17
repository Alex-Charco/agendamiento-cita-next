import Swal from "sweetalert2";
import "@/globals.css";

export const mostrarToastExito = (mensaje = "¡Registro exitoso!") => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

export function mostrarToastError(error, mensajePersonalizado = "Error al registrar") {
  // Si 'error' es string, lo tomamos directamente como mensaje
  const mensaje =
    typeof error === "string"
      ? error
      : error?.response?.data?.message || error?.message || "Error desconocido";

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: mensajePersonalizado,
    text: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

let toastMostrado = false;

export const manejarSesionExpirada = (setMensaje) => {
  if (toastMostrado) return;

  toastMostrado = true;
  setMensaje("Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.");
  mostrarToastError("Sesión expirada. Redirigiendo al inicio de sesión...");
  localStorage.removeItem("authToken");

  setTimeout(() => {
    window.location.href = "/auth/login";
    toastMostrado = false; // reset para futuras sesiones
  }, 2000);
};
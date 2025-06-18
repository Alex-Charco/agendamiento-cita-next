import authAxios from "@/utils/api/authAxios";
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import "@/globals.css";

export async function registrarUsuarioApi(data, setMensaje) {
  try {
    // Confirmación antes de registrar
    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas guardar este usuario en la base de datos?"
    );

    if (!confirmado) {
      await Swal.fire("Cancelado", "El usuario no fue registrado.", "info");
      return;
    }

    // Guardar algún dato local si lo necesitas
    localStorage.setItem("nombre_usuario", data.nombre_usuario);

    await authAxios.post(
      "/api/auth/register",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    mostrarToastExito("¡Usuario registrado exitosamente!");
    setMensaje("");
  } catch (error) {
    console.error("Error al registrar usuario:", error.response?.data || error.message);

    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
  }
}

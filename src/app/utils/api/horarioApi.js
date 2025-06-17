import authAxios from "@/utils/api/authAxios";
import Swal from "sweetalert2";
import {
  mostrarToastExito,
  mostrarToastError,
  manejarSesionExpirada,
} from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";

// *Registrar horario
async function RegistrarHorario(data, identificacion, setMensaje, setSuccess) {
  try {
    if (!identificacion) {
      setMensaje(
        "No se encontró la identificación del médico. Por favor, ingrésela."
      );
      return;
    }

    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas registrar este horario?"
    );
    if (!confirmado) {
      await Swal.fire("Cancelado", "El horario no fue registrado.", "info");
      return;
    }

    const payload = { ...data };

    // Asegura que seleccion solo sea null o 0/1
    if (
      payload.seleccion === "" ||
      payload.seleccion === "null" ||
      payload.seleccion === undefined
    ) {
      payload.seleccion = null;
    }

    delete payload.identificacion_paciente_horario;

    await authAxios.post(`/api/horario/registrar/${identificacion}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    mostrarToastExito("¡Horario registrado exitosamente!");
    setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    console.error("Error al registrar horario:", {
      status,
      serverMessage,
      fullError: error,
    });

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
    setSuccess(false);
  }
}

// *Actualizar horario
async function ActualizarHorario(data, id_horario, setMensaje, setSuccess) {
  try {
    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas actualizar este horario?"
    );
    if (!confirmado) {
      await Swal.fire("Cancelado", "El horario no fue actualizado.", "info");
      return;
    }

    const response = await authAxios.put(`/api/horario/put/${id_horario}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Horario actualizado:", response.data);
    mostrarToastExito("¡Horario actualizado exitosamente!");
    setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    console.error("Error al actualizar horario:", {
      status,
      serverMessage,
      fullError: error,
    });

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
    setSuccess(false);
  }
}


export { RegistrarHorario, ActualizarHorario };

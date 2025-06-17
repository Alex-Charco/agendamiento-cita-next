import authAxios from "@/utils/api/authAxios";
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada, manejarError } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import "@/globals.css";

// *** CONSULTAS ***

export const fetchFamiliar = async (identificacion, setSelectedFamiliar) => {
    try {
        const response = await authAxios.get(`/api/familiar/get/${identificacion}`);
        setSelectedFamiliar(response.data || null);
    } catch (error) {
        console.error("Error al obtener familiar:", error);
        setSelectedFamiliar(null);
    }
};

export const fetchInfoMilitar = async (identificacion, setSelectedInfoMilitar) => {
    try {
        const response = await authAxios.get(`/api/info-militar/get/${identificacion}`);
        setSelectedInfoMilitar(response.data || "");
    } catch (error) {
        console.error("Error al obtener información militar:", error);
        setSelectedInfoMilitar("");
    }
};

export const fetchResidencia = async (identificacion, setSelectedResidencia) => {
    try {
        const response = await authAxios.get(`/api/residencia/get/${identificacion}`);
        setSelectedResidencia(response.data || null);
    } catch (error) {
        console.error("Error al obtener residencia:", error);
        setSelectedResidencia(null);
    }
};

export const fetchSeguro = async (identificacion, setSelectedSeguro) => {
    try {
        const response = await authAxios.get(`/api/seguro/get/${identificacion}`);
        setSelectedSeguro(response.data || null);
    } catch (error) {
        console.error("Error al obtener seguro:", error);
        setSelectedSeguro(null);
    }
};

export const fetchHistorialPaciente = async (identificacion) => {
    try {
        const response = await authAxios.get(`/api/paciente/get/historial/${identificacion}`);
        console.log("URL consultada:", `/api/paciente/get/historial/${identificacion}`);

        if (response.data && response.data.historial) {
            return response.data.historial;  // devolvemos directamente el historial
        } else {
            return null;  // en caso de que no haya historial
        }
    } catch (error) {
        console.error("Error al obtener historial médico:", error);
        throw error;
    }
};

// *** REGISTROS ***

export const RegistrarPaciente = async (data, setMensaje, setSuccess) => {
    try {
        localStorage.setItem("identificacion", data.identificacion);
        await authAxios.post("/api/paciente/registrar", data, {
            headers: { "Content-Type": "application/json" }
        });
        mostrarToastExito("¡Paciente registrado exitosamente!");
        setMensaje("");
        setSuccess(true);
    } catch (error) {
        manejarError(error, setMensaje, setSuccess);
    }
};

export const RegistrarFamiliar = async (data, setMensaje, setSuccess) => {
    try {
        const pacienteId = data.identificacion_paciente;
        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente.");
            mostrarToastError("Identificación del paciente faltante.");
            setTimeout(() => window.location.href = "/auth/login", 2000);
            return;
        }

        const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;

        await authAxios.post(`/api/familiar/registrar/${pacienteId}`, dataSinIdentificacionPaciente, {
            headers: { "Content-Type": "application/json" }
        });
        mostrarToastExito("¡Familiar registrado exitosamente!");
        setMensaje("");
        setSuccess(true);
    } catch (error) {
        manejarError(error, setMensaje, setSuccess);
    }
};

export const RegistrarInfoMilitar = async (data, setMensaje, setSuccess) => {
    try {
        await authAxios.post("/api/info-militar/registrar", data, {
            headers: { "Content-Type": "application/json" }
        });
        mostrarToastExito("¡Información militar registrada exitosamente!");
        setMensaje("");
        setSuccess(true);
    } catch (error) {
        manejarError(error, setMensaje, setSuccess);
    }
};

// *** ACTUALIZACIONES ***

export const ActualizarFamiliar = async (data, setMensaje, setSuccess) => {
  try {
    const confirmado = await confirmarRegistro("¿Estás seguro de que deseas actualizar el familiar?");
    if (!confirmado) {
      await Swal.fire("Cancelado", "El familiar no fue actualizado.", "info");
      return;
    }

    const token = localStorage.getItem("authToken");
    const pacienteId = localStorage.getItem("identificacion");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      manejarSesionExpirada(setMensaje);
      return;
    }

    if (!pacienteId) {
      setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
      return;
    }

    if (!user || !user.id_usuario) {
      setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
      return;
    }

    // Agregamos el id_usuario_modificador como hiciste en paciente
    const dataConUsuario = {
      ...data,
      id_usuario_modificador: user.id_usuario,
    };

    await authAxios.put(`/api/familiar/put/${pacienteId}`, dataConUsuario, {
      headers: { "Content-Type": "application/json" }
    });

    mostrarToastExito("¡Familiar actualizado exitosamente!");
    setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      console.error("❌ Error al actualizar familiar:", mensajeError);
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
  }
};

export const ActualizarInfoMilitar = async (data, setMensaje, setSuccess) => {
  try {
    const confirmado = await confirmarRegistro("¿Estás seguro de que deseas actualizar la información militar?");
    if (!confirmado) {
      await Swal.fire("Cancelado", "La información militar no fue actualizada.", "info");
      return;
    }

    const token = localStorage.getItem("authToken");
    const pacienteId = localStorage.getItem("identificacion");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      manejarSesionExpirada(setMensaje);
      return;
    }

    if (!pacienteId) {
      setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
      return;
    }

    if (!user || !user.id_usuario) {
      setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
      return;
    }

    const dataConUsuario = {
      ...data,
      id_usuario_modificador: user.id_usuario,
    };

    await authAxios.put(`/api/info-militar/put/${pacienteId}`, dataConUsuario, {
      headers: { "Content-Type": "application/json" }
    });

    mostrarToastExito("¡Información militar actualizada exitosamente!");
    setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      console.error("❌ Error al actualizar información militar:", mensajeError);
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
  }
};

export const ActualizarResidencia = async (data, setMensaje, setSuccess) => {
  try {
    const confirmado = await confirmarRegistro("¿Estás seguro de que deseas actualizar la información de residencia?");
    if (!confirmado) {
      await Swal.fire("Cancelado", "La información de residencia no fue actualizada.", "info");
      return;
    }

    const token = localStorage.getItem("authToken");
    const pacienteId = localStorage.getItem("identificacion");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      manejarSesionExpirada(setMensaje);
      return;
    }

    if (!pacienteId) {
      setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
      return;
    }

    if (!user || !user.id_usuario) {
      setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
      return;
    }

    const dataConUsuario = {
      ...data,
      id_usuario_modificador: user.id_usuario,
    };

    await authAxios.put(`/api/residencia/put/${pacienteId}`, dataConUsuario, {
      headers: { "Content-Type": "application/json" }
    });

    mostrarToastExito("¡Información de residencia actualizada exitosamente!");
    setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      console.error("❌ Error al actualizar residencia:", mensajeError);
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
  }
};

// *** USUARIO ***

export async function registrarUsuarioApi(data, setMensaje) {
    try {
        const confirmado = await confirmarRegistro("¿Estás seguro de que deseas guardar este usuario en la base de datos?");
        if (!confirmado) {
            await Swal.fire("Cancelado", "El usuario no fue registrado.", "info");
            return;
        }

        localStorage.setItem("nombre_usuario", data.nombre_usuario);

        await authAxios.post("/api/auth/register", data, {
            headers: { "Content-Type": "application/json" }
        });

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

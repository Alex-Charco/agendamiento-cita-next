import authAxios from "@/utils/api/authAxios"; 
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";

//   ***MÉDICO***

export const RegistrarMedico = async (data, setMensaje, setSuccess) => {
    try {
        // Confirmación antes de registrar
        const confirmado = await confirmarRegistro(
            "¿Estás seguro de que deseas guardar este médico en la base de datos?"
        );

        if (!confirmado) {
            await Swal.fire("Cancelado", "El médico no fue registrado.", "info");
            return;
        }

        localStorage.setItem("identificacion", data.identificacion);

        await authAxios.post(
            "/api/medico/registrar",
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
		
		mostrarToastExito("¡Médico registrado exitosamente!");
        setMensaje("");
    } catch (error) {
        console.error("Error al registrar médico:", error.response?.data || error.message);

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
};


// Función para actualizar al médico
export const ActualizarMedico = async (data, setMensaje, setSuccess) => {
    try {
        const medicoId = localStorage.getItem("identificacion");

        if (!medicoId) {
            setMensaje("No se encontró la identificación del médico. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `/api/medico/put/${medicoId}`; // ya no necesitas poner el baseURL

        await authAxios.put(apiUrl, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });

        setSuccess(true); // Marca éxito para mostrar alerta en componente
    } catch (error) {
        console.error("❌ Error al actualizar médico:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};

// Función para obtener el historial de cambios del médico
export const fetchHistorialMedico = async (identificacion, setHistorialMedico) => {
  try {
    const apiUrl = `/api/medico/get/historial/${identificacion}`; // No necesitas el baseURL, authAxios ya lo incluye
    console.log("URL que se está consultando:", apiUrl);

    const response = await authAxios.get(apiUrl);

    if (response.data) {
      setHistorialMedico(response.data);
    } else {
      setHistorialMedico([]);
    }
  } catch (error) {
    console.error("Error al obtener historial médico:", error.response?.data || error.message);
    setHistorialMedico([]);
  }
};
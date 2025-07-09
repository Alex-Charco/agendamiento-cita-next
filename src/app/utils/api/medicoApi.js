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
            const mensaje = "No se encontró la identificación del médico. Por favor, vuelve a iniciar sesión.";
            setMensaje(mensaje);
            mostrarToastError(mensaje);
            return;
        }

        const apiUrl = `/api/medico/put/${medicoId}`;

        await authAxios.put(apiUrl, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
            },
        });

        mostrarToastExito("¡Médico actualizado exitosamente!");
        setMensaje("");
    } catch (error) {
        console.error("❌ Error al actualizar médico:", error.response?.data || error.message);

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

// Función para obtener el historial de cambios del médico
export const fetchHistorialMedico = async (identificacion, setHistorialMedico) => {
  try {
    const apiUrl = `/api/medico/get/historial/${identificacion}`;
    console.log("URL que se está consultando:", apiUrl);

    const response = await authAxios.get(apiUrl);

    if (response.data?.historial) {
      setHistorialMedico({
        datos_medico: response.data.historial.datos_medico || null,
        historial: response.data.historial.historial || [],
      });
    } else {
      setHistorialMedico({
        datos_medico: null,
        historial: [],
      });
    }
  } catch (error) {
    console.error("Error al obtener historial médico:", error.response?.data || error.message);
    setHistorialMedico({
      datos_medico: null,
      historial: [],
    });
  }
};

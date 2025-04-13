import authAxios from "@/utils/api/authAxios"; 

//   ***MÉDICO***

// Función para RegistrarMedico
export const RegistrarMedico = async (data, setMensaje, setSuccess) => {
    try {
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

        // Mostrar alerta de éxito
        setSuccess(true);
    } catch (error) {
        console.error("Error al registrar paciente:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
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


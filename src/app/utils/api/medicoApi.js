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
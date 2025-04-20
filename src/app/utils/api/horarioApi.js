import authAxios from "@/utils/api/authAxios"; 

// Buscar horario 
// Aun no esta en uso
export async function getHorario(query) {
    if (!query.trim()) return null;
    
    const response = await authAxios.get(`/api/horario/get/${query}`);
	console.log("Response: ", response);
    console.log("Data: ", response.data);
    return response.data?.horarios || null;
}

// *Registrar horario
export const RegistrarHorario = async (data, identificacion, setMensaje, setSuccess) => {
    try {
        if (!identificacion) {
            setMensaje("No se encontró la identificación del médico. Por favor, ingrésela.");
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
    
        console.log("Payload que se envía:", payload);

        delete payload.identificacion_paciente_horario;

        // 🔥 NO usamos JSON.stringify aquí
        await authAxios.post(
            `/api/horario/registrar/${identificacion}`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        setSuccess(true);
    } catch (error) {
        console.error("Error al registrar horario:", {
            message: error.message,
            response: error.response,
            data: error.response?.data,
            status: error.response?.status
        });
        
        setMensaje(`Error: ${error.response?.data?.message || error.message || "Error desconocido"}`);
    }
};


// *Actualizar horario
// *Actualizar horario
export async function ActualizarHorario(data, id_horario, setMensaje, setSuccess) {
    try {
        const response = await authAxios.put(`/api/horario/put/${id_horario}`, data);
        console.log("Horario actualizado:", response.data);
        setSuccess(true);
        setMensaje("");
    } catch (error) {
        console.error("Error actualizando horario:", error);
        setMensaje("Error al actualizar el horario. Intente nuevamente.");
        setSuccess(false);
    }
}

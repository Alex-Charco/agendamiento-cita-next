import authAxios from "@/utils/api/authAxios"; 

// Buscar horario
export async function getHorario(query) {
    if (!query.trim()) return null;
    
    const response = await authAxios.get(`/api/horario/get/${query}`);
	console.log("Response: ", response);
    console.log("Data: ", response.data);
    return response.data?.horarios || null;
}

//   ***MÉDICO***
// *Código para buscar*
import authAxios from "@/utils/api/authAxios"; // ajusta la ruta según tu proyecto

export const fetchMedico = async (identificacion, setSelectedMedico) => {
    try {
        const response = await authAxios.get(`/api/medico/get/${identificacion}`);

        if (response.data) {
            setSelectedMedico(response.data);
        } else {
            setSelectedMedico(null);
        }
    } catch (error) {
        console.error("Error al obtener médico:", error);
        setSelectedMedico(null);
    }
};

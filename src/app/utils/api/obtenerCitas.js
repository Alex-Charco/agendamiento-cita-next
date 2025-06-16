import authAxios from "@/utils/api/authAxios";

export async function obtenerCitas({
  identificacion,
  rol = "paciente",
  setLoading,
  setError,
  onSelectCita,
}) {
  if (!identificacion.trim()) return;

  setLoading(true);
  setError(null);

  try {
    const response = await authAxios.get(`/api/cita/get/${rol}/${identificacion}?desdeHoy=true`);
    console.log("Citas response:", response);
    console.log("Citas obtenidas:", response.data);

    onSelectCita?.(response.data);
  } catch (err) {
    console.error("Error al obtener citas:", err);
    if (err.response?.status === 401) return;
    setError("No se pudieron obtener las citas. Inténtalo de nuevo.");
  } finally {
    setLoading(false);
  }
}

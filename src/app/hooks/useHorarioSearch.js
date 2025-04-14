import { useState } from "react";
import { getHorario } from "@/utils/api/horarioApi";

export function useHorarioSearch(onSelectHorario) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHorario = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const horario = await getHorario(query);

            if (horario) {
                localStorage.setItem("horario_id", horario.id);
                onSelectHorario(horario);
            } else {
                setError("No se encontró el horario.");
            }
        } catch (err) {
            console.error("Error al obtener horario:", err);

            if (err.response?.status === 401) return;
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return {
        query,
        setQuery,
        fetchHorario,
        loading,
        error,
    };
}

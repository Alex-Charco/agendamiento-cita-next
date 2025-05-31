// src/hooks/usePacienteSearch.js
import { useState, useEffect } from "react";
import authAxios from "@/utils/api/authAxios";

export function usePacienteSearch(onSelectPaciente) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPaciente = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.get(`/api/paciente/get/${query}`);
      const paciente = response.data?.paciente;

      if (paciente) {
        const pacienteConUsuario = {
          ...paciente,
          nombre_usuario: paciente.usuario?.nombre_usuario || ""
        };

        localStorage.setItem("identificacion", paciente.identificacion);
        localStorage.setItem("nombre_usuario", pacienteConUsuario.nombre_usuario);

        onSelectPaciente?.(pacienteConUsuario);
      } else {
        setError("No se encontró el paciente.");
      }
    } catch (err) {
      console.error("Error al obtener paciente:", err);
      if (err.response?.status !== 401) {
        setError("Error al obtener los datos. Inténtelo nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem("identificacion", query);
    }
  }, [query]);

  return {
    query,
    setQuery,
    fetchPaciente,
    loading,
    error,
  };
}

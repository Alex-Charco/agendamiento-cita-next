"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import authAxios from "@/utils/api/authAxios";
import Search from "@/components/Search";

function MedicoSearch({ onSelectMedico }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedico = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.get(`/api/medico/get/${query}`);

      if (response.data?.medicos) {
        const medico = response.data.medicos;

        const medicoConUsuario = {
          ...medico,
          nombre_usuario: medico.usuario?.nombre_usuario || "",
        };

        localStorage.setItem("identificacion", medico.identificacion);
        localStorage.setItem("nombre_usuario", medicoConUsuario.nombre_usuario);

        onSelectMedico(medicoConUsuario);
      } else {
        setError("No se encontró el médico.");
      }
    } catch (err) {
      console.error("Error al obtener médico:", err);

      if (err.response?.status === 401) return;

      setError("Error al obtener los datos. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem("identificacion", query);
    }
  }, [query]);

  return (
    <div className="px-6 flex flex-col items-center rounded-lg">
      <Search
        query={query}
        setQuery={setQuery}
        onBuscarClick={fetchMedico}
        label="Buscar Médico por identificación"
        placeholder="Ej: 12345678"
        loading={loading}
        error={error}
      />
    </div>
  );
}

MedicoSearch.propTypes = {
  onSelectMedico: PropTypes.func.isRequired,
};

export default MedicoSearch;

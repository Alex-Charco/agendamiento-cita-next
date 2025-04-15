"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import authAxios from "@/utils/api/authAxios";
import { FaSearch } from "react-icons/fa";

function PacienteSearch({ onSelectPaciente }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPaciente = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.get(`/api/paciente/get/${query}`);

      if (response.data?.paciente) {
        const paciente = response.data.paciente;

        // Extraer nombre_usuario y pasarlo al objeto plano
        const pacienteConUsuario = {
          ...paciente,
          nombre_usuario: paciente.usuario?.nombre_usuario || ""
        };

        // Guardar en localStorage y enviar al componente padre
        localStorage.setItem("identificacion", paciente.identificacion);
        localStorage.setItem("nombre_usuario", pacienteConUsuario.nombre_usuario);

        onSelectPaciente(pacienteConUsuario);
      } else {
        setError("No se encontró el paciente.");
      }
    } catch (err) {
      console.error("Error al obtener paciente:", err);

      if (err.response?.status === 401) return;

      setError("Error al obtener los datos. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Guardar la identificación en localStorage cuando cambie el valor de query
  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem("identificacion", query);
    }
  }, [query]);

  return (
    <div>
      <div className="flex flex-row items-center space-x-4">
        {/* Etiqueta alineada verticalmente */}
        <p className="text-xs font-bold text-gray-600 ml-4">No. Identificación</p>

        {/* Input y botón */}
        <div className="flex space-x-2 w-full max-w-sm">
          <input
            type="text"
            placeholder="Ingresar identificación..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 text-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06), 0 4px 6px rgba(0,0,0,0.1)',
            }}
          />
          <button
            onClick={fetchPaciente}
            className="bg-gray-100 text-gray-600 px-4 py-1 rounded-lg hover:bg-gray-200 flex items-center gap-2 shadow-md active:translate-y-0.5 active:shadow-inner transition-all duration-150"
          >
            <FaSearch />
            Buscar
          </button>
        </div>
      </div>

      {/* Mensajes de estado */}
      {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );

}

PacienteSearch.propTypes = {
  onSelectPaciente: PropTypes.object,
}

export default PacienteSearch; 
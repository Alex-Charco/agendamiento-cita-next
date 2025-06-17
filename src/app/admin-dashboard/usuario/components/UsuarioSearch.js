"use client";

import PropTypes from "prop-types";
import React, { useState } from "react";
import axios from "axios";
import Search from "@/components/Search";

function UsuarioSearch({ onSelectUsuario }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsuarios = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/get/${query}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API GET", apiUrl);

      if (response.data?.id_usuario) {
        const usuario = {
          id_paciente: response.data.id_usuario,
          nombre_usuario: response.data.nombre_usuario,
          rol: response.data.rol,
          estatus: response.data.estatus,
        };

        localStorage.setItem("nombre_usuario", usuario.nombre_usuario);
        onSelectUsuario(usuario);
      } else {
        setError("No se encontró el usuario.");
      }
    } catch (err) {
      console.error("Error al obtener usuario:", err);
      setError("Error al obtener los datos. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Usuario</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <Search
          query={query}
          setQuery={setQuery}
          onBuscarClick={fetchUsuarios}
          label="Nombre de Usuario"
          placeholder="Ingresar nombre de usuario..."
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

UsuarioSearch.propTypes = {
  onSelectUsuario: PropTypes.func.isRequired,
};

export default UsuarioSearch;

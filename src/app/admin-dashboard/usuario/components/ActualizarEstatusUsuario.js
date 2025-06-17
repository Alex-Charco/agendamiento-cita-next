"use client";

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import EstatusUsuarioForm from "@/admin-dashboard/usuario/components/EstatusUsuarioForm";
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import '@/globals.css';

function ActualizarEstatusUsuario({ estatusUsuarioData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosEstatusUsuario, setDatosEstatusUsuario] = useState(estatusUsuarioData || "");

  useEffect(() => {
    if (estatusUsuarioData) {
      setDatosEstatusUsuario(estatusUsuarioData);
    }
  }, [estatusUsuarioData]);

  const handleFormSubmit = async (data) => {
    try {
      const confirmado = await confirmarRegistro("¿Estás seguro de que deseas actualizar el estatus del usuario?");
      if (!confirmado) {
        await Swal.fire("Cancelado", "El estatus no fue actualizado.", "info");
        return;
      }

      const token = localStorage.getItem("authToken");
      const nombreUsuario = localStorage.getItem("nombre_usuario");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token) {
        manejarSesionExpirada(setMensaje);
        return;
      }

      if (!nombreUsuario) {
        setMensaje("No se encontró el nombre de usuario. Por favor, vuelve a iniciar sesión.");
        return;
      }

      if (!user || !user.id_usuario) {
        setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
        return;
      }

      const dataConUsuario = {
        ...data,
        id_usuario_modificador: user.id_usuario, // Se agrega quien modifica
      };

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/put/estatus/${nombreUsuario}`;

      await axios.put(
        apiUrl,
        JSON.stringify(dataConUsuario),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      mostrarToastExito("¡Estatus de usuario actualizado exitosamente!");
      setMensaje("");

    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        manejarSesionExpirada(setMensaje);
      } else {
        const mensajeError = serverMessage || error.message || "Error desconocido";
        console.error("❌ Error al actualizar estatus usuario:", mensajeError);
        setMensaje(`Error: ${mensajeError}`);
        mostrarToastError(error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosEstatusUsuario ? (
          <EstatusUsuarioForm onSubmit={handleFormSubmit} estatusUsuarioData={datosEstatusUsuario} />
        ) : (
          <p>Buscar usuario para modificarlo</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

ActualizarEstatusUsuario.propTypes = {
  estatusUsuarioData: PropTypes.object,
};

export default ActualizarEstatusUsuario;

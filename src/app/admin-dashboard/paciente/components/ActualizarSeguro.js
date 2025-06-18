"use client";

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SeguroForm from "@/admin-dashboard/paciente/components/SeguroForm";
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import '@/globals.css';

function ActualizarSeguro({ seguroData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosSeguro, setDatosSeguro] = useState(seguroData || "");

  useEffect(() => {
    if (seguroData) {
      setDatosSeguro(seguroData);
    }
  }, [seguroData]);

  const handleFormSubmit = async (data) => {
    try {
      const confirmado = await confirmarRegistro("¿Estás seguro de que deseas actualizar el seguro?");
      if (!confirmado) {
        await Swal.fire("Cancelado", "El seguro no fue actualizado.", "info");
        return;
      }

      const token = localStorage.getItem("authToken");
      const pacienteId = localStorage.getItem("identificacion");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token) {
        manejarSesionExpirada(setMensaje);
        return;
      }

      if (!pacienteId) {
        setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
        return;
      }

      if (!user?.id_usuario) {
        setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
        return;
      }

      const dataConUsuario = {
        ...data,
        id_usuario_modificador: user.id_usuario,
      };

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/put/${pacienteId}`;

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

      mostrarToastExito("¡Seguro actualizado exitosamente!");
      setMensaje("");

    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        manejarSesionExpirada(setMensaje);
      } else {
        const mensajeError = serverMessage || error.message || "Error desconocido";
        console.error("❌ Error al actualizar seguro:", mensajeError);
        setMensaje(`Error: ${mensajeError}`);
        mostrarToastError(error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosSeguro ? (
          <SeguroForm onSubmit={handleFormSubmit} SeguroData={datosSeguro} />
        ) : (
          <p>Buscar paciente para modificar seguro</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

ActualizarSeguro.propTypes = {
  seguroData: PropTypes.object,
};

export default ActualizarSeguro;

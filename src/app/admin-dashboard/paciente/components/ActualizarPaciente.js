"use client";

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import Swal from "sweetalert2";
import {
  mostrarToastExito,
  mostrarToastError,
  manejarSesionExpirada,
} from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import '@/globals.css';

function ActualizarPaciente({ pacienteData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosPaciente, setDatosPaciente] = useState(pacienteData || "");

  useEffect(() => {
    if (pacienteData) {
      setDatosPaciente(pacienteData);
    }
  }, [pacienteData]);

  const handleFormSubmit = async (data) => {
  try {
    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas actualizar este paciente?"
    );

    if (!confirmado) {
      await Swal.fire("Cancelado", "El paciente no fue actualizado.", "info");
      return;
    }

    const token = localStorage.getItem("authToken");
    const pacienteId = localStorage.getItem("identificacion");
    const user = JSON.parse(localStorage.getItem("user")); // ✅ Obtener el objeto `user`

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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/put/${pacienteId}`;

    // ✅ Agregar id_usuario al cuerpo de datos
    const dataConUsuario = {
      ...data,
      id_usuario_modificador: user.id_usuario,
    };

    const response = await axios.put(
      apiUrl,
      JSON.stringify(dataConUsuario),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Respuesta de la API:", response.data);

    mostrarToastExito("¡Paciente actualizado exitosamente!");
    setMensaje("");

  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      console.error("❌ Error al actualizar paciente:", mensajeError);
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(error);
    }
  }
};

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosPaciente ? (
          <PacienteForm onSubmit={handleFormSubmit} pacienteData={datosPaciente} isEditable={false} />
        ) : (
          <p>Buscar paciente para modificar paciente</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

ActualizarPaciente.propTypes = {
  pacienteData: PropTypes.object,
};

export default ActualizarPaciente;
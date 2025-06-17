"use client";

import React, { useState } from "react";
import axios from "axios";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";
import Swal from "sweetalert2";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import "@/globals.css";

export default function RegistrarResidencia() {
  const [mensaje, setMensaje] = useState("");

  const handleFormSubmit = async (data) => {
    const confirmado = await confirmarRegistro(
      "¿Deseas registrar la residencia?"
    );
    if (!confirmado) {
      Swal.fire("Cancelado", "La residencia no fue registrada.", "info");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
		  manejarSesionExpirada(setMensaje);
		  return;
		}

      const pacienteId = data.identificacion_paciente;

      if (!pacienteId) {
        mostrarToastError("No se encontró la identificación del paciente.");
        setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/registrar/${pacienteId}`;

      // 🧹 Eliminar identificacion_paciente del cuerpo antes de enviarlo
      const { identificacion_paciente, ...dataSinIdentificacion } = data;

      await axios.post(apiUrl, JSON.stringify(dataSinIdentificacion), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      mostrarToastExito("✅ Residencia registrada con éxito");
      setMensaje(""); // Limpia el mensaje en caso de éxito

    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        manejarSesionExpirada(setMensaje);
      } else {
        const mensajeError = serverMessage || error.message || "Error desconocido";
        console.error("Error al registrar residencia:", mensajeError);
        setMensaje(`Error: ${mensajeError}`);
        mostrarToastError(error); // Puedes personalizar si prefieres `mostrarToastError(mensajeError)`
      }
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <ResidenciaForm onSubmit={handleFormSubmit} />
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

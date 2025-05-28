"use client";

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SeguroForm from "@/admin-dashboard/paciente/components/SeguroForm";
import {
  mostrarToastExito,
  mostrarToastError,
  manejarSesionExpirada,
} from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import "@/globals.css";

export default function RegistrarSeguro() {
  const [mensaje, setMensaje] = useState("");

  const handleFormSubmit = async (data) => {
    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas registrar este seguro en la base de datos?"
    );
    if (!confirmado) {
      Swal.fire("Cancelado", "El seguro no fue registrado.", "info");
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
        console.error("❌ No se encontró 'identificacion_paciente' en el formulario");
        setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
        return;
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/registrar/${pacienteId}`;

      // Eliminar identificacion_paciente del cuerpo del request
      const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;

      const response = await axios.post(apiUrl, JSON.stringify(dataSinIdentificacionPaciente), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Respuesta de la API:", response.data);

      mostrarToastExito("✅ Seguro registrado con éxito");
      setMensaje(""); // Limpiar mensaje si todo sale bien
    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        manejarSesionExpirada(setMensaje);
      } else {
        const mensajeError = serverMessage || error.message || "Error desconocido";
        console.error("❌ Error al registrar seguro:", mensajeError);
        setMensaje(`Error: ${mensajeError}`);
        mostrarToastError(error);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <SeguroForm onSubmit={handleFormSubmit} />
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

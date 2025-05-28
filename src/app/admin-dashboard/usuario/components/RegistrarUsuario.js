"use client";

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UsuarioForm from "@/admin-dashboard/usuario/components/UsuarioForm";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import "@/globals.css";

export default function RegistrarUsuario() {
  const [mensaje, setMensaje] = useState("");

  const handleFormSubmit = async (data) => {
    const confirmado = await confirmarRegistro(
      "¿Estás seguro de que deseas guardar este usuario en la base de datos?"
    );
    if (!confirmado) {
      Swal.fire("Cancelado", "El usuario no fue registrado.", "info");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
		  manejarSesionExpirada(setMensaje);
		  return;
		}

      localStorage.setItem("nombre_usuario", data.nombre_usuario);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;

      const response = await axios.post(apiUrl, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      mostrarToastExito("¡Usuario registrado exitosamente!");
      setMensaje(""); // Limpia el mensaje en caso de éxito
    } catch (error) {
      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (status === 401) {
        // 🔴 Token inválido o expirado
        manejarSesionExpirada(setMensaje);
      } else {
        const mensajeError = serverMessage || error.message || "Error desconocido";
        console.error("Error al registrar usuario:", mensajeError);
        setMensaje(`Error: ${mensajeError}`);
        mostrarToastError(error); // Pasamos el objeto `error`
      }
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <UsuarioForm onSubmit={handleFormSubmit} />
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

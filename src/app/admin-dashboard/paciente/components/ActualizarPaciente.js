"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ActualizarPaciente({ pacienteData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosPaciente, setDatosPaciente] = useState(pacienteData || null);

  useEffect(() => {
    if (pacienteData) {
      setDatosPaciente(pacienteData);
    }
  }, [pacienteData]);

  const handleFormSubmit = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← obtén identificación guardada

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/put/${pacienteId}`;

        const response = await axios.put(
            apiUrl,
            JSON.stringify(data),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Respuesta de la API:", response.data);

        Swal.fire({
            title: "Paciente actualizado!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        console.error("❌ Error al actualizar paciente:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};


  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosPaciente ? (
          <PacienteForm onSubmit={handleFormSubmit} pacienteData={datosPaciente} />
        ) : (
          <p>Buscar paciente para modificar paciente</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

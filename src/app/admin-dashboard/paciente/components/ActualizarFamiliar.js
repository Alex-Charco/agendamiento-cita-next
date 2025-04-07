"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ActualizarFamiliar({ familiarData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosFamiliar, setDatosFamiliar] = useState(familiarData || null);

  useEffect(() => {
    if (familiarData) {
      setDatosFamiliar(familiarData);
    }
  }, [familiarData]);

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

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/put/${pacienteId}`;

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

        Swal.fire({
            title: "Datos Familiar actualizado!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        console.error("❌ Error al actualizar datos de familiar:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosFamiliar ? (
          <FamiliarForm onSubmit={handleFormSubmit} familiarData={datosFamiliar} />
        ) : (
          <p>Buscar paciente para modificar familiar</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

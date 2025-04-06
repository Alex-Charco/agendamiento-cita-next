"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SeguroForm from "@/admin-dashboard/paciente/components/SeguroForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useParams } from "next/navigation";

export default function ActualizarSeguro({ seguroData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosSeguro, setDatosSeguro] = useState(seguroData || null);

  useEffect(() => {
    if (seguroData) {
      setDatosSeguro(seguroData);
    }
  }, [seguroData]);

  const handleFormSubmit = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← obtén identificación guardada

        console.log("🔍 Token desde localStorage:", token);
        console.log("🔍 Identificación del paciente desde localStorage:", pacienteId);

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            console.error("❌ No se encontró identificación del paciente en localStorage");
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/put/${pacienteId}`;
        console.log("Enviando datos a:", apiUrl);
        console.log("Datos:", data);

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
            title: "Seguro actualizado!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        console.error("❌ Error al actualizar seguro:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};


  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosSeguro ? (
          <SeguroForm onSubmit={handleFormSubmit} SeguroData={datosSeguro} />
        ) : (
          <p>Buscar paciente para modificar residencia</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

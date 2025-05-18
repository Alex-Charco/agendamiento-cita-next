"use client";

import React, { useState } from "react";
import axios from "axios";
import SeguroForm from "@/admin-dashboard/paciente/components/SeguroForm";
import Swal from "sweetalert2";
import '@/globals.css';

export default function RegistrarSeguro() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem("authToken");
            const pacienteId = data.identificacion_paciente; // se toma del formulario

            if (!token) {
                setMensaje("No se encontró el token de autenticación.");
                return;
            }

            if (!pacienteId) {
                console.error("❌ No se encontró 'identificacion_paciente' en el formulario");
                setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
                return;
            }

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/registrar/${pacienteId}`;

            // 🧹 Eliminar `identificacion_paciente` del cuerpo de datos antes de enviarlo
            const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;

            const response = await axios.post(apiUrl, JSON.stringify(dataSinIdentificacionPaciente), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Respuesta de la API:", response.data);

            Swal.fire({
                title: "Seguro registrado!",
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.error("❌ Error al registrar seguro:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
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

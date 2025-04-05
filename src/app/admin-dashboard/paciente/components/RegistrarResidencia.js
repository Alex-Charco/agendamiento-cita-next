"use client";

import { useState } from "react";
import axios from "axios";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarResidencia() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem("authToken");
            const pacienteId = data.identificacion_paciente; // se toma del formulario

            console.log("🔍 Token desde localStorage:", token);
            console.log("🔍 Identificación del paciente desde el formulario:", pacienteId);

            if (!token) {
                setMensaje("No se encontró el token de autenticación.");
                return;
            }

            if (!pacienteId) {
                console.error("❌ No se encontró 'identificacion_paciente' en el formulario");
                setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
                return;
            }

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/registrar/${pacienteId}`;
            console.log("🌐 URL construida para la API:", apiUrl);

            // 🧹 Eliminar `identificacion_paciente` del cuerpo de datos antes de enviarlo
            const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;

            console.log("📦 Datos a enviar en el body:", dataSinIdentificacionPaciente);

            const response = await axios.post(apiUrl, JSON.stringify(dataSinIdentificacionPaciente), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("✅ Respuesta de la API:", response.data);

            Swal.fire({
                title: "Residencia registrada!",
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.error("❌ Error al registrar residencia:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
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

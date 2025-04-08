"use client";

import { useState } from "react";
import axios from "axios";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarFamiliar() {
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
                setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
                return;
            }

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/registrar/${pacienteId}`;

            // 🧹 Eliminar `identificacion_paciente` del cuerpo de datos antes de enviarlo
            const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;


            await axios.post(apiUrl, JSON.stringify(dataSinIdentificacionPaciente), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            Swal.fire({
                title: "Familiar registrado!",
                icon: "success",
                confirmButtonText: "OK"
            });

        } catch (error) {
            console.error("❌ Error al registrar familiar:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <div>
                <FamiliarForm onSubmit={handleFormSubmit} />
                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
            </div>
        </div>
    );
}

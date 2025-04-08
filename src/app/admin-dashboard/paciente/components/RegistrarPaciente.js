"use client";

import { useState } from "react";
import axios from "axios";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarPaciente() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No se encontró un token de autenticación.");

            // Guardar la contraseña en localStorage
            localStorage.setItem("identificacion", data.identificacion);

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/registrar`;

            await axios.post(
                apiUrl,
                JSON.stringify(data),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Muestra la alerta de registro exitoso
            Swal.fire({
                title: "Paciente registrado!",
                icon: "success",
                draggable: true,
                confirmButtonText: "OK"
            }).then((result) => {
            });
        } catch (error) {
            console.error("Error al registrar paciente:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <div>
                <PacienteForm onSubmit={handleFormSubmit} />
                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import axios from "axios";
import UsuarioForm from "@/admin-dashboard/usuario/components/UsuarioForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarUsuario() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No se encontró un token de autenticación.");

            // Guardar la contraseña en localStorage
            localStorage.setItem("nombre_usuario", data.nombre_usuario);

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;

            const response = await axios.post(
                apiUrl,
                JSON.stringify(data),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Respuesta del servidor:", response.data);

            // Muestra la alerta de registro exitoso y redirige al usuario
            Swal.fire({
                title: "Usuario registrado!",
                icon: "success",
                draggable: true,
                confirmButtonText: "OK"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/admin-dashboard/paciente/registrar-paciente";
                }
            });
        } catch (error) {
            console.error("Error al registrar usuario:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
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

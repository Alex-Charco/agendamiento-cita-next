"use client";

import { useState } from "react";
import axios from "axios";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import UsuarioForm from "@/admin-dashboard/usuario/components/UsuarioForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
//import Link from "next/link";

export default function RegistrarUsuario() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No se encontró un token de autenticación.");

            // Guardar la contraseña en localStorage
            localStorage.setItem("nombre_usuario", data.nombre_usuario);

            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;
            console.log("Enviando datos a:", apiUrl);
            console.log("Datos:", data);
            console.log("Token de autenticación:", token);

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
                showConfirmButton: false, // Oculta el botón de confirmación
                timer: 1500, // Cierra automáticamente después de 1.5 segundos
            }).then(() => {
                window.location.href = "/admin-dashboard/paciente/registrar-paciente"; // Redirige al cerrar la notificación
            });

        } catch (error) {
            console.error("Error al registrar usuario:", error.response?.data || error.message);
            setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
        }
    };

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
    ];

    return (
        <div className="bg-gray-100 min-h-screen w-full flex flex-col items-center">
            <NavbarComponent title="Brigada de Selva No.17  - Paso 1" buttons={buttons} onAction={(action) => {
            }} />
            <div className="w-full flex-grow flex flex-col items-center mt-10">
                <UsuarioForm onSubmit={handleFormSubmit} />
                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
            </div>
        </div>
    );
}

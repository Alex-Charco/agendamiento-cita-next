"use client";

import React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { validarPassword } from "@/utils/validarPassword.js";
import { Card } from "@heroui/react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificación del token antes de cualquier otro campo
        if (!token || token === 'expired') {
            Swal.fire("Token inválido", "El token es inválido o ha expirado.", "error");
            return;
        }

        // Validación de campos vacíos
        if (!nombreUsuario.trim()) {
            Swal.fire("Campo vacío", "Por favor ingresa el nombre de usuario.", "error");
            return;
        }

        if (!password.trim()) {
            Swal.fire("Campo vacío", "Por favor ingresa una nueva contraseña.", "error");
            return;
        }

        // Validación de la contraseña (estructura)
        const validation = validarPassword(password);
        if (!validation.isValid) {
            setPasswordErrors(validation.errors);
            return;
        }

        // Llamada a la API después de todas las validaciones
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    nombre_usuario: nombreUsuario,
                    newPassword: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: data.message || "Contraseña restablecida con éxito.",
                    confirmButtonText: "Aceptar",
                }).then(() => {
                    setPassword("");
                    setNombreUsuario("");
                    setPasswordErrors([]);
                    window.location.href = "/auth/login"; // Redirige a la página de login
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Ocurrió un error al restablecer la contraseña.",
                });
            }

        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            Swal.fire(
                "Error de red",
                "No se pudo completar la solicitud. Verifica tu conexión e intenta nuevamente.",
                "error"
            );
        }
    };

    return (
        <Card className="max-w-lg w-full bg-gradient-to-b from-celeste-fuerte to-[#F5F7FC] bg-opacity-50"
            style={{
                border: "4px solid rgba(0, 56, 255, 0.3)",
                boxShadow: "0 4px 10px rgba(0, 56, 255, 0.5)",
            }}
        >
            <div className="bg-gradient-to-b from-blue-100 to-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-white py-8 px-6 rounded-t-2xl">
                    <h2 className="text-center text-xl font-bold text-blue-800">Restablecer contraseña</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6" data-testid="reset-password-form">
                    {/* Usuario */}
                    <div className="mb-5 relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                            <FaUserAlt />
                        </span>
                        <input
                            id="nombre_usuario"
                            name="nombre_usuario"
                            type="text"
                            placeholder="Ingresar el usuario"
                            className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </div>

                    {/* Contraseña */}
                    <div className="mb-4 relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                            <RiLockPasswordFill />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nueva contraseña"
                            className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrors([]);
                            }}
                        />
                    </div>

                    {/* Errores */}
                    {passwordErrors.length > 0 && (
                        <ul className="text-red-600 text-sm mb-4 list-disc list-inside">
                            {passwordErrors.map((error) => (
                                <li key={error}>⚠️ {error}</li>
                            ))}
                        </ul>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-3 rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </Card>
    );
}

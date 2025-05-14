"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { validarPassword } from "@/utils/validarPassword.js";
import { Card } from "@heroui/react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [message, setMessage] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage("El token es inválido o ha expirado.");
            return;
        }

        const validation = validarPassword(password);
        if (!validation.isValid) {
            setPasswordErrors(validation.errors);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
                token,
                nombre_usuario: nombreUsuario,
                newPassword: password,
            });

            setMessage(response.data.message || "Contraseña restablecida con éxito.");
            setPassword("");
            setNombreUsuario("");
            setPasswordErrors([]);
        } catch (error) {
            console.error("Error de Axios:", error);
            setMessage("Ocurrió un error, intenta nuevamente.");
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
                <form onSubmit={handleSubmit} className="p-6">
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
                            required
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
                            required
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

                    {message && (
                        <p className="mt-4 text-sm text-center text-green-600">{message}</p>
                    )}
                </form>
            </div>
        </Card>
    );
}

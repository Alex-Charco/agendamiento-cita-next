"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
	const [nombre_usuario, setNombreUsuario] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage("El token es inválido o ha expirado.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
                token,
				nombre_usuario,
                newPassword: password, // Verifica que el nombre del campo sea `newPassword`
            });

            setMessage(response.data.message || "Contraseña restablecida con éxito.");
        } catch (error) {
            setMessage("Ocurrió un error, intenta nuevamente.");
            console.error("Error de Axios:", error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Usuario</h2>
                <input
                    type="nombre_usuario"
                    className="border p-2 w-full"
                    placeholder="Ingresar el usuarioo"
                    value={nombre_usuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    required
                />
				<h2 className="text-lg font-bold mb-4">Nueva contraseña</h2>
                <input
                    type="password"
                    className="border p-2 w-full"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Restablecer contraseña
                </button>
                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </div>
    );
}

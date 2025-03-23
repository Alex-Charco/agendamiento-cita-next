"use client";
import { useState } from "react";
import axios from "axios";

export default function RequestResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cambia la URL de la API aquí
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-password-reset`,  // Cambiado a /api/auth
                { email }
            );
            setMessage(response.data.message || "Si el correo está registrado, recibirás un enlace.");
        } catch (error) {
            setMessage("Ocurrió un error, intenta nuevamente.");
            console.error(error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Recuperar contraseña</h2>
                <input
                    type="email"
                    className="border p-2 w-full"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Enviar enlace
                </button>
                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </div>
    );
}

"use client";
import { useState } from "react";
import Image from "next/image";
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
        <div className="flex flex-col h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/background.svg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>

            {/* Imagen fuera del formulario, centrada */}
            <div className="mb-4">
                <Image 
                    src="/images/reset.svg" // Cambia la ruta a tu imagen
                    alt="Logo"
                    width={150} // Establece el tamaño de la imagen
                    height={150} // Establece el tamaño de la imagen
                    className="mx-auto" // Centra la imagen
                />
            </div>

            {/* Formulario */}

            <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-lg w-96" style={{
                border: '4px solid rgba(0, 56, 255, 0.3)',
                boxShadow: '0 4px 10px rgba(0, 56, 255, 0.5)',
            }}>
                <h2 className="text-lg font-bold mb-5 text-center">Recuperar contraseña</h2>
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

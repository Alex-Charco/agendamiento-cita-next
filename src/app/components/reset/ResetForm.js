"use client";

import React from "react";
import { Card } from "@heroui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import '@/globals.css';
import { MdEmail } from "react-icons/md";

export default function ResetForm() {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            Swal.fire("Campo vacío", "Por favor ingresa un correo electrónico.", "error");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire("Correo inválido", "Por favor ingresa un correo electrónico válido.", "error");
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/request-password-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Solicitud enviada",
                    text: data.message || "Si el correo está registrado, recibirás un enlace.",
                    confirmButtonText: "Aceptar",
                });
                setEmail("");
                setMensaje("");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data.message || "Ocurrió un error al procesar la solicitud.",
                });
            }

        } catch (error) {
            console.error("Error al enviar solicitud de reset:", error);
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
                    <h2 className="text-center text-xl font-bold text-blue-800">Recuperar Contraseña</h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-5 relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                            <MdEmail />
                        </span>
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full pl-12 pr-4 py-3 rounded-[16px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-800 text-white px-10 py-3 rounded-xl hover:bg-blue-900 transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                    {mensaje && (
                        <p className="text-red-600 font-semibold mt-4 text-center">{mensaje}</p>
                    )}
                </form>
            </div>
        </Card>
    );
}

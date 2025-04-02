"use client";

import { useState } from "react";
import axios from "axios";
import UsuarioForm from "@/admin-dashboard/usuario/components/UsuarioForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Usuario() {
    const [mensaje, setMensaje] = useState("");

    const handleFormSubmit = async (data) => {
		try {
			const token = localStorage.getItem("authToken");
			if (!token) throw new Error("No se encontró un token de autenticación.");

			const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`;
			console.log("Enviando datos a:", apiUrl);
			console.log("Datos:", data);
			console.log("Token de autenticación:", token);

			const response = await axios.post(
				apiUrl,
				JSON.stringify(data), // Asegura que los datos sean enviados como JSON
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("Respuesta del servidor:", response.data);
			// Muestra la alerta de registro exitoso
			Swal.fire({
			  title: "Usuario registrado!",
			  icon: "success",
			  draggable: true
			});
		} catch (error) {
			console.error("Error al registrar usuario:", error.response?.data || error.message);
			setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
		}
	};

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Registrar Usuario</h1>
            <div>
                <UsuarioForm onSubmit={handleFormSubmit} />
                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
            </div>
        </div>
    );
}

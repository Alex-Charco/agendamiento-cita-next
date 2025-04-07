"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EstatusUsuarioForm from "@/admin-dashboard/usuario/components/EstatusUsuarioForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ActualizarEstatusUsuario({ estatusUsuarioData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosEstatusUsuario, setDatosEstatusUsuario] = useState(estatusUsuarioData || null);

  useEffect(() => {
    if (estatusUsuarioData) {
      setDatosEstatusUsuario(estatusUsuarioData);
    }
  }, [estatusUsuarioData]);

  const handleFormSubmit = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const nombreUsuario = localStorage.getItem("nombre_usuario"); // ← obtén identificación guardada

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!nombreUsuario) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/put/estatus/${nombreUsuario}`;

        const response = await axios.put(
            apiUrl,
            JSON.stringify(data),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ Respuesta de la API:", response.data);

        Swal.fire({
            title: "Estatus actualizado!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};


  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosEstatusUsuario ? (
          <EstatusUsuarioForm onSubmit={handleFormSubmit} estatusUsuarioData={datosEstatusUsuario} />
        ) : (
          <p>Buscar usuario para modificarlo</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

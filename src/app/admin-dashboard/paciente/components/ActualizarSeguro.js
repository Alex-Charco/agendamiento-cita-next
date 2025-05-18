"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import SeguroForm from "@/admin-dashboard/paciente/components/SeguroForm";
import Swal from "sweetalert2";
import '@/globals.css';

function ActualizarSeguro({ seguroData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosSeguro, setDatosSeguro] = useState(seguroData || "");

  useEffect(() => {
    if (seguroData) {
      setDatosSeguro(seguroData);
    }
  }, [seguroData]);

  const handleFormSubmit = async (data) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← obtén identificación guardada

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/put/${pacienteId}`;

        await axios.put(
            apiUrl,
            JSON.stringify(data),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        Swal.fire({
            title: "Seguro actualizado!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        console.error("❌ Error al actualizar seguro:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};


  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosSeguro ? (
          <SeguroForm onSubmit={handleFormSubmit} SeguroData={datosSeguro} />
        ) : (
          <p>Buscar paciente para modificar residencia</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

ActualizarSeguro.propTypes = {
  seguroData: PropTypes.object,
}

export default ActualizarSeguro;
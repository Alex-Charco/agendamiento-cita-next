"use client";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function ActualizarResidencia({ residenciaData }) {
  const [mensaje, setMensaje] = useState("");
  const [datosResidencia, setDatosResidencia] = useState(residenciaData || null);

  useEffect(() => {
    if (residenciaData) {
      setDatosResidencia(residenciaData);
    }
  }, [residenciaData]);

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

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/put/${pacienteId}`;

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
            title: "Residencia actualizada!",
            icon: "success",
            confirmButtonText: "OK"
        });

    } catch (error) {
        console.error("❌ Error al actualizar residencia:", error.response?.data || error.message);
        setMensaje(`Error: ${error.response?.data?.message || "Error desconocido"}`);
    }
};


  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        {datosResidencia ? (
          <ResidenciaForm onSubmit={handleFormSubmit} ResidenciaData={datosResidencia} />
        ) : (
          <p>Buscar paciente para modificar residencia</p>
        )}
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

ActualizarResidencia.propTypes = {
residenciaData: PropTypes.object,
}

export default ActualizarResidencia; 
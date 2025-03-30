"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PacienteForm from "./PacienteForm";

export default function ActualizarPaciente({ pacienteId }) {
    const [pacienteData, setPacienteData] = useState(null);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/get/${pacienteId}`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPacienteData(response.data.paciente);
            } catch (error) {
                console.error("Error al obtener los datos del paciente:", error);
            }
        };

        if (pacienteId) {
            fetchPaciente();
        }
    }, [pacienteId]);

    const handleFormSubmit = (data) => {
        console.log("Paciente actualizado:", data);
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
    };

    if (!pacienteData) {
        return <p>Cargando datos del paciente...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Actualizar Paciente</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <PacienteForm onSubmit={handleFormSubmit} pacienteData={pacienteData} />
            </div>
        </div>
    );
}

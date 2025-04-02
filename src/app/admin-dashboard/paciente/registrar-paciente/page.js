"use client";
//import { useState } from "react";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";

export default function RegistrarPaciente() {
    const handleFormSubmit = (data) => {
        console.log("Paciente registrado:", data);
        // Aquí puedes redirigir a una nueva página o mostrar un mensaje de éxito
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Registrar Paciente</h1>
            <div>
                <PacienteForm onSubmit={handleFormSubmit} />
            </div>
        </div>
    );
}
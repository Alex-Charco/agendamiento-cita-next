"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { RegistrarPaciente, RegistrarFamiliar } from "@/utils/api";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import RegistrarInfoMilitar from "@/admin-dashboard/paciente/components/RegistrarInfoMilitar";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";
import RegistrarSeguro from "@/admin-dashboard/paciente/components/RegistrarSeguro";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarPacientePage() {

    const [selectedUsuario] = useState(null);
    const [selectedInfoMilitar] = useState(null);
    const [selectedResidencia] = useState(null);
    const [selectedSeguro] = useState(null);
    const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);


    const handlePacienteSelect = async (data) => {
        await RegistrarPaciente(data, setMensaje, setSuccess);
    };
    const handleFamiliarSubmit = async (data) => {
        const familiarData = {
            ...data,
            identificacion_paciente: data.identificacion_paciente || data.identificacion,
        };
        await RegistrarFamiliar(familiarData, setMensaje, setSuccess);
    };

    // Mostrar la alerta si se registra con éxito
    useEffect(() => {
        if (success) {
            Swal.fire({
                title: "¡Registro exitoso!",
                icon: "success",
                draggable: true,
                confirmButtonText: "OK"
            });
            setSuccess(false); // Resetear para no mostrarlo más de una vez
        }
    }, [success]);
    


    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard/paciente/actualizar-paciente" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
    ];

    const tabsConfig = [
        {
            key: "registrar-usuario",
            title: "1. Usuario",
            content: selectedUsuario ? (
                <RegistrarUsuario usuario={selectedUsuario} /> // Pasa el paciente al formulario para editar
            ) : (
                <RegistrarUsuario /> // Si no hay usuario seleccionado, muestra el formulario vacío para registrar un nuevo paciente
            ),
        },
        {
            key: "registrar-paciente",
            title: "2. Paciente",
            content: (
                <div className="min-h-screen p-6 flex flex-col items-center">
                    <div className="lg:w-1/2">
                        <PacienteForm onSubmit={handlePacienteSelect} />
                        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
                    </div>
                </div>
            ),
        },
        {
            key: "familiar",
            title: "3. Familiar",
            content: (
                <div className="min-h-screen p-6 flex flex-col items-center">
                    <div className="lg:w-1/2">
                        <FamiliarForm onSubmit={handleFamiliarSubmit} />
                        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
                    </div>
                </div>
            ),
        },
        {
            key: "informacion-militar",
            title: "4. Info Militar",
            content: selectedInfoMilitar ? (
                <RegistrarInfoMilitar infoMilitar={selectedInfoMilitar} />
            ) : (
                <RegistrarInfoMilitar />
            ),
        },
        {
            key: "residencia",
            title: "5. Residencia",
            content: selectedResidencia ? (
                <RegistrarResidencia residencia={selectedResidencia} />
            ) : (
                <RegistrarResidencia />
            ),
        },
        {
            key: "seguro",
            title: "6. Seguro",
            content: selectedSeguro ? (
                <RegistrarSeguro seguro={selectedSeguro} />
            ) : (
                <RegistrarSeguro />
            ),
        },
    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Registrar Paciente" buttons={buttons} onAction={(action) => {
            }} />

            <CustomTabs tabs={tabsConfig} />

        </div>
    );
}

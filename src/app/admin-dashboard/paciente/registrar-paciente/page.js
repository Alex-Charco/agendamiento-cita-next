"use client";

import { useState } from "react";
import { FaTimes, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { useDisclosure } from "@heroui/react";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import RegistrarPaciente from "@/admin-dashboard/paciente/components/RegistrarPaciente";
import RegistrarFamiliar from "@/admin-dashboard/paciente/components/RegistrarFamiliar";
import RegistrarInfoMilitar from "@/admin-dashboard/paciente/components/RegistrarInfoMilitar";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";
import RegistrarSeguro from "@/admin-dashboard/paciente/components/RegistrarSeguro";

export default function RegistrarPacientePage() {

    const [selectedUsuario ] = useState(null);
    const [selectedPaciente ] = useState(null);
    const [selectedFamiliar ] = useState(null);
    const [selectedInfoMilitar ] = useState(null);
    const [selectedResidencia ] = useState(null);
    const [selectedSeguro ] = useState(null);

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
            content: selectedPaciente ? (
                <RegistrarPaciente paciente={selectedPaciente} />
            ) : (
                <RegistrarPaciente /> 
            ),
        },
        {
            key: "familiar",
            title: "3. Familiar",
            content: selectedFamiliar ? (
                <RegistrarFamiliar familiar={selectedFamiliar} />
            ) : (
                <RegistrarFamiliar /> 
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

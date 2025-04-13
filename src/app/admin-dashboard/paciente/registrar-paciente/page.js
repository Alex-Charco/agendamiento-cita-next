"use client";

import { useState } from "react";
import { FaTimes, FaSearch, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import FormWrapper from "@/components/FormWrapper";
import { RegistrarPaciente, RegistrarFamiliar, RegistrarInfoMilitar } from "@/utils/api";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import InfoMilitarForm from "@/admin-dashboard/paciente/components/InfoMilitarForm";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";
import RegistrarSeguro from "@/admin-dashboard/paciente/components/RegistrarSeguro";
import useSuccessAlert from "@/hooks/useSuccessAlert";
import { useClearLocalStorage } from "@/hooks/useClearLocalStorage";

export default function RegistrarPacientePage() {

    const [selectedUsuario] = useState(null);
    const [selectedResidencia] = useState(null);
    const [selectedSeguro] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [success, setSuccess] = useState(false);

    // Limpia localStorage al entrar/salir
    useClearLocalStorage(["identificacion", "nombre_usuario"]);

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
    const handleInfoMilitarSubmit = async (data) => {
        await RegistrarInfoMilitar(data, setMensaje, setSuccess);
    };

    // Mostrar la alerta si se registra con éxito
    useSuccessAlert(success, setSuccess, "¡Paciente registrado exitosamente!");

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", href: "/admin-dashboard" },
        { label: "Buscar Paciente", icon: FaSearch, action: "buscar-paciente", href: "/admin-dashboard/paciente/consultar-paciente" },
        { label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", href: "/admin-dashboard/paciente/actualizar-paciente" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", href: "/auth/login" },
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
                <FormWrapper mensaje={mensaje}>
                    <PacienteForm onSubmit={handlePacienteSelect} />
                </FormWrapper>
            ),
        },
        {
            key: "familiar",
            title: "3. Familiar",
            content: (
                <FormWrapper mensaje={mensaje}>
                    <FamiliarForm onSubmit={handleFamiliarSubmit} />
                </FormWrapper>
            ),
        },
        {
            key: "informacion-militar",
            title: "4. Info Militar",
            content: (
                <FormWrapper mensaje={mensaje}>
                    <InfoMilitarForm onSubmit={handleInfoMilitarSubmit} />
                </FormWrapper>
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

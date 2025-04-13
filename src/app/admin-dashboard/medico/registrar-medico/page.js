"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { RegistrarMedico } from "@/utils/api/medicoApi";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import MedicoForm from "@/admin-dashboard/medico/components/MedicoForm";
import useSuccessAlert from "@/hooks/useSuccessAlert";
import { useClearLocalStorage } from "@/hooks/useClearLocalStorage";
import { getCommonButtonsByPath } from "@/utils/commonButtons";


export default function RegistrarMedicoPage() {

    const [selectedUsuario] = useState(null);
    const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);
    const pathname = usePathname();

    const handleMedicoSelect = async (data) => {
        await RegistrarMedico(data, setMensaje, setSuccess);
    };

    // Mostrar la alerta si se registra con éxito
    useSuccessAlert(success, setSuccess, "¡Médico registrado exitosamente!");


    // Limpia localStorage al entrar/salir
    useClearLocalStorage(["nombre_usuario"]);

    const buttons = [
        { label: "Buscar Médico", icon: FaSearch, action: "buscar-medico", href: "/admin-dashboard/medico/consultar-medico" },
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", href: "/admin-dashboard/medico/actualizar-medico" },
        ...getCommonButtonsByPath(pathname)
    ];

    const tabsConfig = [
        {
            key: "registrar-usuario",
            title: "1. Usuario",
            content: selectedUsuario ? (
                <RegistrarUsuario usuario={selectedUsuario} /> 
            ) : (
                <RegistrarUsuario /> // Si no hay usuario seleccionado, muestra el formulario vacío para registrar un nuevo paciente
            ),
        },
        {
            key: "registrar-medico",
            title: "2. Médico",
            content: (
                <div className="min-h-screen p-6 flex flex-col items-center">
                    <div className="lg:w-1/2">
                        <MedicoForm onSubmit={handleMedicoSelect} />
                        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
                    </div>
                </div>
            ),
        },
        
    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Registrar Médico" buttons={buttons} onAction={(action) => {
            }} />

            <CustomTabs tabs={tabsConfig} />

        </div>
    );
}

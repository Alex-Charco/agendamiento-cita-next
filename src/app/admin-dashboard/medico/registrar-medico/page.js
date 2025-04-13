"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaSearch, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { RegistrarMedico } from "@/utils/api/medicoApi";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import MedicoForm from "@/admin-dashboard/medico/components/MedicoForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function RegistrarMedicoPage() {

    const [selectedUsuario] = useState(null);
    const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);

    const handleMedicoSelect = async (data) => {
        await RegistrarMedico(data, setMensaje, setSuccess);
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

    // Limpiar localStorage al montar y salir
	useEffect(() => {
		// Eliminar inmediatamente al entrar
		localStorage.removeItem("nombre_usuario");

		// También asegurarse de eliminar al salir
		const clearNombreUsuario = () => {
			localStorage.removeItem("nombre_usuario");
		};

		window.addEventListener("beforeunload", clearNombreUsuario);
		window.addEventListener("pagehide", clearNombreUsuario);

		return () => {
			window.removeEventListener("beforeunload", clearNombreUsuario);
			window.removeEventListener("pagehide", clearNombreUsuario);
		};
	}, []);

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Buscar Médico", icon: FaSearch, action: "buscar-medico", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard/medico/consultar-medico" },
		{ label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard/medico/actualizar-medico" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
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

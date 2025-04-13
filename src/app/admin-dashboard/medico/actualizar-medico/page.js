"use client";

import { useState, useEffect } from "react";
import { FaTimes, FaSearch, FaPlus, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { ActualizarMedico } from "@/utils/api/medicoApi";
import MedicoSearch from "@/admin-dashboard/medico/components/MedicoSearch";
import MedicoForm from "@/admin-dashboard/medico/components/MedicoForm";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ActualizarMedicoPage() {
	const [selectedMedico, setSelectedMedico] = useState(null);
	const [selectedUsuario, setSelectedUsuario] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);


	const handleMedicoSelect = (medico) => {
		console.log("Médico seleccionado:", medico);
		setSelectedMedico(medico);
	};

	useEffect(() => {
		if (selectedMedico) {
			const valoresIniciales = {
				...selectedMedico,
				nombre_usuario: selectedMedico.usuario?.nombre_usuario || ""
			};
			console.log("Valores para el formulario:", valoresIniciales);
		}
	}, [selectedMedico]);
	

	const handleUsuarioSelect = (usuario) => {
		const datosMapeados = {
			nombre_usuario: usuario.nombre_usuario,
			estatus: usuario.estatus ?? "",
			nombre_rol: usuario.rol?.nombre_rol ?? "",
		};
		console.log("🧾 Usuario seleccionado:", usuario);
		setSelectedUsuario(datosMapeados);
	};

	const handleMedicoSubmit = async (data) => {
		await ActualizarMedico(data, setMensaje, setSuccess);
	};

	useEffect(() => {
		if (success) {
			Swal.fire({
				title: "¡Actualización exitosa!",
				icon: "success",
				confirmButtonText: "OK",
			});
			setSuccess(false);
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
		{ label: "Cancelar", icon: FaTimes, action: "cancelar", href: "/admin-dashboard" },
		{ label: "Buscar Médico", icon: FaSearch, action: "buscar-medico", href: "/admin-dashboard/medico/consultar-medico" },
		{ label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico",  href: "/admin-dashboard/medico/registrar-medico" },
		{ label: "Salir", icon: FaSignOutAlt, action: "salir", href: "/auth/login" },
	];

	const tabsConfig = [
		{
			key: "actualizar-medico",
			title: "1. Médico",
			content: (
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-1/2">
						<MedicoSearch onSelectMedico={handleMedicoSelect} />
					</div>
					<div className="lg:w-1/2">
						{selectedMedico && (
							<MedicoForm
								onSubmit={handleMedicoSubmit}
								medicoData={selectedMedico}
							/>
						)}
						{mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
					</div>
				</div>
			),
		},
		{
			key: "usuario",
			title: "2. Usuario",
			content: (
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-1/2">
						<UsuarioSearch onSelectUsuario={handleUsuarioSelect} />
					</div>
					<div className="lg:w-1/2">
						<ActualizarEstatusUsuario estatusUsuarioData={selectedUsuario} />
					</div>
				</div>
			),
		},
	];

	return (
		<div className="bg-white">
			<NavbarComponent title="Actualizar Médico y Usuario" buttons={buttons} />
			<CustomTabs tabs={tabsConfig} />
		</div>
	);
}

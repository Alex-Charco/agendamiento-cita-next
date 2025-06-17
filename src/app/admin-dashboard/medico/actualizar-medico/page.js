"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaPlus, FaHistory } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { ActualizarMedico } from "@/utils/api/medicoApi";
import MedicoSearch from "@/admin-dashboard/medico/components/MedicoSearch";
import MedicoForm from "@/admin-dashboard/medico/components/MedicoForm";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import useSuccessAlert from "@/hooks/useSuccessAlert";
import { useClearLocalStorage } from "@/hooks/useClearLocalStorage";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { confirmarRegistro } from "@/utils/confirmacion";


export default function ActualizarMedicoPage() {
	const [selectedMedico, setSelectedMedico] = useState(null);
	const [selectedUsuario, setSelectedUsuario] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);
	const pathname = usePathname();


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
	try {
		const confirmado = await confirmarRegistro?.(
			"¿Estás seguro de que deseas actualizar este médico?"
		);

		if (confirmado === false) {
			return;
		}

		const user = JSON.parse(localStorage.getItem("user"));

		if (!user || !user.id_usuario) {
			setMensaje("No se encontró el ID del usuario. Por favor, vuelve a iniciar sesión.");
			return;
		}

		const dataConModificador = {
			...data,
			id_usuario_modificador: user.id_usuario,
		};

		await ActualizarMedico(dataConModificador, setMensaje, setSuccess);
	} catch (error) {
		console.error("❌ Error al preparar datos para actualizar médico:", error);
		setMensaje("Ocurrió un error al enviar los datos.");
	}
};

	// Mostrar la alerta si se registra con éxito
    useSuccessAlert(success, setSuccess, "¡Médico actualizado exitosamente!");


	// Limpia localStorage al entrar/salir
    useClearLocalStorage(["nombre_usuario"]);


	const buttons = [
		{ label: "Buscar Médico", icon: FaSearch, action: "buscar-medico", href: "/admin-dashboard/medico/consultar-medico" },
		{ label: "Historial", icon: FaHistory, action: "historial-medico", href: "/admin-dashboard/medico/historial-medico" },
		{ label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico",  href: "/admin-dashboard/medico/registrar-medico" },
		...getCommonButtonsByPath(pathname)
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

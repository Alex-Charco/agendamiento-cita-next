"use client";

import { useState } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import FormWrapper from "@/components/FormWrapper";
import { fetchFamiliar, fetchInfoMilitar, fetchResidencia, fetchSeguro, ActualizarFamiliar, ActualizarInfoMilitar, ActualizarResidencia } from "@/utils/api";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import ActualizarPaciente from "@/admin-dashboard/paciente/components/ActualizarPaciente";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import InfoMilitarForm from "@/admin-dashboard/paciente/components/InfoMilitarForm";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";
import ActualizarSeguro from "@/admin-dashboard/paciente/components/ActualizarSeguro";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import { FaTimes, FaSearch, FaPlus, FaSignOutAlt } from "react-icons/fa";
import useSuccessAlert from "@/hooks/useSuccessAlert";

export default function ActualizarPacientePage() {
	const [selectedPaciente, setSelectedPaciente] = useState(null);
	const [selectedFamiliar, setSelectedFamiliar] = useState(null);
	const [selectedInfoMilitar, setSelectedInfoMilitar] = useState(null);
	const [selectedResidencia, setSelectedResidencia] = useState(null);
	const [selectedSeguro, setSelectedSeguro] = useState(null);
	const [selectedUsuario, setSelectedUsuario] = useState(null);
	const [mensaje, setMensaje] = useState("");
	const [success, setSuccess] = useState(false);

	const handleUsuarioSelect = (usuario) => {
		const datosMapeados = {
			nombre_usuario: usuario.nombre_usuario,
			estatus: usuario.estatus ?? "",
			nombre_rol: usuario.rol?.nombre_rol ?? "",
		};
		console.log("🧾 Usuario seleccionado:", usuario);
		setSelectedUsuario(datosMapeados); // ✅ Aquí ahora sí estás enviando lo necesario
	};

	const handlePacienteSelect = (paciente) => {
		console.log("Paciente seleccionado:", paciente);
		setSelectedPaciente(paciente);
		fetchFamiliar(paciente.identificacion, setSelectedFamiliar);

		// Verificar si el paciente es de tipo militar antes de intentar obtener la info militar
		if (paciente.tipo_paciente === "militar") {
			fetchInfoMilitar(paciente.identificacion, setSelectedInfoMilitar).catch((error) => {
				console.error("Error al obtener información militar:", error);
				setSelectedInfoMilitar(null); // Si hay error, aseguramos que no haya datos previos
			});
		} else {
			// Si no es de tipo militar, no se obtiene la información militar
			setSelectedInfoMilitar(null);
		}

		fetchResidencia(paciente.identificacion, setSelectedResidencia);
		fetchSeguro(paciente.identificacion, setSelectedSeguro);
	};

	const handleFamiliarSubmit = async (data) => {
		const familiarData = {
			...data,
			identificacion_paciente: data.identificacion_paciente || data.identificacion,
		};
		await ActualizarFamiliar(familiarData, setMensaje, setSuccess);  // Usamos la función del API
	};

	const handleInfoMilitarSubmit = async (data) => {
		const infoMilitarData = {
			...data,
			identificacion_paciente: data.identificacion_paciente || data.identificacion,
		};
		await ActualizarInfoMilitar(infoMilitarData, setMensaje, setSuccess);  // Usamos la función del API
	};

	const handleResidenciaSubmit = async (data) => {
		const residenciaData = {
			...data,
			identificacion_paciente: data.identificacion_paciente || data.identificacion,
		};
		await ActualizarResidencia(residenciaData, setMensaje, setSuccess);  // Usamos la función del API
	};

	// Mostrar la alerta si se registra con éxito
	useSuccessAlert(success, setSuccess, "¡Paciente actualizado exitosamente!");

	const buttons = [
		{ label: "Cancelar", icon: FaTimes, action: "cancelar", href: "/admin-dashboard" },
		{ label: "Buscar Paciente", icon: FaSearch, action: "buscar-paciente", href: "/admin-dashboard/paciente/consultar-paciente" },
		{ label: "Nuevo Paciente", icon: FaPlus, action: "nuevo-paciente", href: "/admin-dashboard/paciente/registrar-paciente" },
		{ label: "Salir", icon: FaSignOutAlt, action: "salir", href: "/auth/login" },
	];

	const tabsConfig = [
		{
			key: "actualizar-paciente",
			title: "1. Paciente",
			content: (
				<div className="flex flex-col lg:flex-row gap-6">
					<div className="lg:w-1/2">
						<PacienteSearch onSelectPaciente={handlePacienteSelect} />
					</div>
					<div className="lg:w-1/2">
						<ActualizarPaciente pacienteData={selectedPaciente} />
					</div>
				</div>
			),
		},
		{
			key: "actualizar-familiar",
			title: "2. Familiar",
			content: (
				<FormWrapper mensaje={mensaje}>
					{selectedFamiliar ? (
						<FamiliarForm
							onSubmit={handleFamiliarSubmit}
							familiarData={selectedFamiliar}
						/>
					) : (
						<p>Buscar paciente para modificar familiar</p>
					)}
				</FormWrapper>
			),
		},
		{
			key: "informacion-militar",
			title: "3. Información Militar",
			content: (
				<FormWrapper mensaje={mensaje}>
					{selectedInfoMilitar ? (
						<InfoMilitarForm
							onSubmit={handleInfoMilitarSubmit}
							infoMilitarData={selectedInfoMilitar}
						/>
					) : (
						<p>No hay información militar.</p>
					)}
				</FormWrapper>
			),
		},
		{
			key: "residencia",
			title: "4. Residencia",
			content: (
				<FormWrapper mensaje={mensaje}>
					{selectedResidencia ? (
						<ResidenciaForm
							onSubmit={handleResidenciaSubmit}
							residenciaData={selectedResidencia}
						/>
					) : (
						<p>Buscar paciente para modificar residencia</p>
					)}
				</FormWrapper>
			),
		},
		{
			key: "seguro",
			title: "5. Seguro",
			content: (
				<ActualizarSeguro seguroData={selectedSeguro} />
			),
		},
		{
			key: "usuario",
			title: "Actualizar Usuario",
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
			<NavbarComponent title="Actualizar Paciente y Usuario" buttons={buttons} onAction={() => {
			}} />

			<CustomTabs tabs={tabsConfig} />

		</div>
	);
}


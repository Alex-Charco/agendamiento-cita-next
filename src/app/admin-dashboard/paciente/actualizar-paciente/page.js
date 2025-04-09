"use client";

import { useState, useEffect  } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { fetchFamiliar, fetchInfoMilitar, fetchResidencia, fetchSeguro, ActualizarFamiliar, ActualizarInfoMilitar, ActualizarResidencia } from "@/utils/api";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import ActualizarPaciente from "@/admin-dashboard/paciente/components/ActualizarPaciente";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import InfoMilitarForm from "@/admin-dashboard/paciente/components/InfoMilitarForm";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";
import ActualizarSeguro from "@/admin-dashboard/paciente/components/ActualizarSeguro";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
		fetchInfoMilitar(paciente.identificacion, setSelectedInfoMilitar);
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
        const ResidenciaData = {
            ...data,
            identificacion_paciente: data.identificacion_paciente || data.identificacion,
        };
        await ActualizarResidencia(ResidenciaData, setMensaje, setSuccess);  // Usamos la función del API
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
		{ label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
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
				<div className="min-h-screen p-6 flex flex-col items-center">
					<div className="lg:w-1/2">
						{selectedFamiliar ? (
							<>
								{console.log("Familiar seleccionado:", selectedFamiliar)}  {/* Agregar el console.log aquí */}
								<FamiliarForm
									onSubmit={handleFamiliarSubmit}  // Usamos handleFamiliarSubmit para manejar el submit
									familiarData={selectedFamiliar}
								/>
							</>
						) : (
							<p>Buscar paciente para modificar familiar</p>
						)}
						{mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
					</div>
				</div>
			),
		},		
		{
			key: "informacion-militar",
			title: "3. Información Militar",
			content: (
				<div className="min-h-screen p-6 flex flex-col items-center">
					<div className="lg:w-1/2">
						{selectedInfoMilitar ? (
							<>
								{console.log("InfoMilitar seleccionado:", selectedInfoMilitar)}  {/* Agregar el console.log aquí */}
								<InfoMilitarForm
									onSubmit={handleInfoMilitarSubmit}  // Usamos handleFamiliarSubmit para manejar el submit
									infoMilitarData={selectedInfoMilitar}
								/>
							</>
						) : (
							<p>Buscar paciente para modificar familiar</p>
						)}
						{mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
					</div>
				</div>
			),
		},
		{
			key: "residencia",
			title: "4. Residencia",
			content: (
				<div className="min-h-screen p-6 flex flex-col items-center">
					<div className="lg:w-1/2">
						{selectedResidencia ? (
							<>
								{console.log("Residencia seleccionado:", selectedResidencia)}  {/* Agregar el console.log aquí */}
								<ResidenciaForm
									onSubmit={handleResidenciaSubmit}  // Usamos handleFamiliarSubmit para manejar el submit
									ResidenciaData={selectedResidencia}
								/>
							</>
						) : (
							<p>Buscar paciente para modificar residencia</p>
						)}
						{mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
					</div>
				</div>
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


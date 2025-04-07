"use client";
import { useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { fetchFamiliar, fetchInfoMilitar, fetchResidencia, fetchSeguro } from "@/utils/api";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import ActualizarPaciente from "@/admin-dashboard/paciente/components/ActualizarPaciente";
import ActualizarFamiliar from "@/admin-dashboard/paciente/components/ActualizarFamiliar";
import ActualizarInfoMilitar from "@/admin-dashboard/paciente/components/ActualizarInfoMilitar";
import ActualizarResidencia from "@/admin-dashboard/paciente/components/ActualizarResidencia";
import ActualizarSeguro from "@/admin-dashboard/paciente/components/ActualizarSeguro";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";

export default function ActualizarPacientePage() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [selectedFamiliar, setSelectedFamiliar] = useState(null);
    const [selectedInfoMilitar, setSelectedInfoMilitar] = useState(null);
    const [selectedResidencia, setSelectedResidencia] = useState(null);
    const [selectedSeguro, setSelectedSeguro] = useState(null);
	const [selectedUsuario, setSelectedUsuario] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [activeTab, setActiveTab] = useState("datos-generales");

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
        setSelectedPaciente(paciente);
        fetchFamiliar(paciente.identificacion, setSelectedFamiliar);
		fetchInfoMilitar(paciente.identificacion, setSelectedInfoMilitar);
		fetchResidencia(paciente.identificacion, setSelectedResidencia);
		fetchSeguro(paciente.identificacion, setSelectedSeguro);
        onOpenChange(false);
    };

    const buttons = [
		{ label: "Buscar Paciente", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", onClick: onOpen },
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
    ];

   const tabsConfig = [
	  {
		key: "actualizar-paciente",
		title: "1. Paciente",
		content: (
		  <ActualizarPaciente pacienteData={selectedPaciente} />
		),
	  },
	  {
		key: "actualizar-familiar",
		title: "2. Familiar",
		content: (
		  <ActualizarFamiliar familiarData={selectedFamiliar} />
		),
	  },
	  {
		key: "informacion-militar",
		title: "3. Información Militar",
		content: (
		  <ActualizarInfoMilitar infoMilitarData={selectedInfoMilitar} />
		),
	  },
	  {
		key: "residencia",
		title: "4. Residencia",
		content: (
		  <ActualizarResidencia residenciaData={selectedResidencia} />
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
            <NavbarComponent title="Actualizar Paciente y Usuario" buttons={buttons} onAction={(action) => {
                if (action === "buscar") onOpen();
                else console.log(action);
            }} />

            <CustomTabs tabs={tabsConfig} />

            <ReusableModal isOpen={isOpen} onOpenChange={onOpenChange}>
                <PacienteSearch onSelectPaciente={handlePacienteSelect} />
            </ReusableModal>

        </div>
    );
}


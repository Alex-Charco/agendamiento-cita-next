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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [activeTab, setActiveTab] = useState("datos-generales");



    const handlePacienteSelect = (paciente) => {
        setSelectedPaciente(paciente);
        fetchFamiliar(paciente.identificacion, setSelectedFamiliar);
		fetchInfoMilitar(paciente.identificacion, setSelectedInfoMilitar);
		fetchResidencia(paciente.identificacion, setSelectedResidencia);
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
	];


    return (
        <div className="bg-white">
            <NavbarComponent title="Actualizar Paciente" buttons={buttons} onAction={(action) => {
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


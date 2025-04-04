"use client";
import { useState } from "react";
import axios from "axios";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import { fetchFamiliar, fetchInfoMilitar, fetchResidencia, fetchSeguro } from "@/utils/api"; 
import CustomTabs from "@/components/CustomTabs";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";

export default function RegistrarPaciente() {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
	const [selectedUsuario, setSelectedUsuario] = useState(null);
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
		fetchSeguro(paciente.identificacion, setSelectedSeguro);
		onOpenChange(false);
	};


    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
    ];
	
    const tabsConfig = [
        {
            key: "registrar-usuario",
            title: "1. Usuario",
            content: selectedUsuario ? (
            <RegistrarUsuario usuario={selectedUsuario} /> // Pasa el paciente al formulario para editar
        ) : (
            <RegistrarUsuario /> // Si no hay paciente seleccionado, muestra el formulario vacío para registrar un nuevo paciente
        ),
    },
		{
            key: "registrar-paciente",
            title: "2. Paciente",
            content: selectedPaciente ? (
            <PacienteForm paciente={selectedPaciente} /> // Pasa el paciente al formulario para editar
        ) : (
            <PacienteForm /> // Si no hay paciente seleccionado, muestra el formulario vacío para registrar un nuevo paciente
        ),
    },
		{
            key: "familiar",
            title: "3. Familiar",
            content: selectedFamiliar ? (
				<div className="ml-5">
					<h2 className="text-lg font-semibold text-gray-700">Información Familiar</h2>
					<p className="text-gray-600"><strong>Nombre:</strong> {`${selectedFamiliar.primer_nombre} ${selectedFamiliar.segundo_nombre} ${selectedFamiliar.primer_apellido} ${selectedFamiliar.segundo_apellido}`}</p>
					<p className="text-gray-600"><strong>Relación:</strong> {selectedFamiliar.relacion}</p>
					<p className="text-gray-600"><strong>Identificacion</strong> {selectedFamiliar.identificacion}</p>
					<p className="text-gray-600"><strong>Celular:</strong> {selectedFamiliar.celular}</p>
					<p className="text-gray-600"><strong>Teléfono:</strong> {selectedFamiliar.telefono}</p>
					<p className="text-gray-600"><strong>Correo:</strong> {selectedFamiliar.correo}</p>
					<p className="text-gray-600"><strong>Dirección:</strong> {selectedFamiliar.direccion}</p>
				</div>
			) : (
				<p>No se ha seleccionado ningún familiar.</p>
			)
        },
		{
            key: "informacion-militar",
            title: "4. Info Militar",
            content: selectedInfoMilitar ? (
				<div className="ml-5">
                    <h2 className="text-lg font-semibold text-gray-700">Información Militar</h2>
                    <p className="text-gray-600"><strong>Cargo:</strong> {selectedInfoMilitar.cargo}</p>
                    <p className="text-gray-600"><strong>Grado:</strong> {selectedInfoMilitar.grado}</p>
                    <p className="text-gray-600"><strong>Fuerza:</strong> {selectedInfoMilitar.fuerza}</p>
                    <p className="text-gray-600"><strong>Unidad:</strong> {selectedInfoMilitar.unidad}</p>
                </div>
            ) : (
                <p>No se han encontrado datos militares para el paciente.</p>
            ),
        },
		{
        key: "residencia",
        title: "5. Residencia",
        content: selectedResidencia ? (
				<div className="ml-5">
                <h2 className="text-lg font-semibold text-gray-700">Información de Residencia</h2>
                <p className="text-gray-600"><strong>Lugar de Nacimiento:</strong> {selectedResidencia.lugar_nacimiento}</p>
                <p className="text-gray-600"><strong>País:</strong> {selectedResidencia.pais}</p>
                <p className="text-gray-600"><strong>Nacionalidad:</strong> {selectedResidencia.nacionalidad}</p>
                <p className="text-gray-600"><strong>Provincia:</strong> {selectedResidencia.provincia}</p>
                <p className="text-gray-600"><strong>Cantón:</strong> {selectedResidencia.canton}</p>
                <p className="text-gray-600"><strong>Parroquia:</strong> {selectedResidencia.parroquia}</p>
                <p className="text-gray-600"><strong>Dirección:</strong> {selectedResidencia.direccion}</p>
                <p className="text-gray-600"><strong>Fecha de Registro:</strong> {new Date(selectedResidencia.fecha_registro).toLocaleDateString()}</p>
            </div>
        ) : (
            <p>No se han encontrado datos de residencia para el paciente.</p>
        ),
    },
	{
            key: "seguro",
            title: "6. Seguro",
            content: selectedSeguro ? (
				<div className="ml-5">
                    <h2 className="text-lg font-semibold text-gray-700">Información del Seguro</h2>
                            <p className="text-gray-600"><strong>Tipo de Seguro:</strong> {selectedSeguro.tipo}</p>
                            <p className="text-gray-600"><strong>Beneficiario:</strong> {selectedSeguro.beneficiario}</p>
                            <p className="text-gray-600"><strong>Código:</strong> {selectedSeguro.codigo}</p>
                            <p className="text-gray-600"><strong>Cobertura:</strong> {selectedSeguro.cobertura}</p>
                            <p className="text-gray-600"><strong>Porcentaje:</strong> {selectedSeguro.porcentaje}</p>
                            <p className="text-gray-600"><strong>Fecha de Inicio:</strong> {new Date(selectedSeguro.fecha_inicio).toLocaleDateString()}</p>
                            <p className="text-gray-600"><strong>Fecha de Fin:</strong> {new Date(selectedSeguro.fecha_fin).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No se han encontrado datos de seguro para el paciente.</p>
            ),
        },
    ];

    return (
        <div className="bg-white">
            <NavbarComponent  title="Registrar Paciente" buttons={buttons} onAction={(action) => {
            }} />
	
            <CustomTabs tabs={tabsConfig} />

        </div>
    );
}

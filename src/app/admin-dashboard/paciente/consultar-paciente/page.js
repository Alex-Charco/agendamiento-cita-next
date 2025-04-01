"use client";

import { useState } from "react";
import axios from "axios";
import { FaTimes, FaSearch, FaPlus, FaCalendarAlt, FaSave } from "react-icons/fa";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";

export default function ConsultaPacientePage() {
    const [query, setQuery] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchPacientes = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setPacientes([]);

        try {
            const token = localStorage.getItem("authToken");
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/get/${query}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.paciente) {
                setPacientes([response.data.paciente]);
            } else {
                throw new Error("La API no devolvió un paciente válido");
            }
        } catch (err) {
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const handlePacienteSelect = (paciente) => {
        setSelectedPaciente(paciente);
        onOpenChange(false);
    };

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Buscar", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", onClick: onOpen },
        { label: "+Nuevo", icon: FaPlus, action: "nuevo", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700" },
        { label: "Nuevo Turno", icon: FaCalendarAlt, action: "nuevo-turno", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700" },
        { label: "Guardar", icon: FaSave, action: "guardar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700" }
    ];
	
    const tabsConfig = [
        {
            key: "datos-generales",
            title: "Datos Generales",
            content: selectedPaciente ? (
                <div className="ml-5" key={selectedPaciente.id_paciente}>
                    <h2 className="text-lg font-semibold text-gray-700">
                        {`${selectedPaciente.primer_nombre} ${selectedPaciente.segundo_nombre} ${selectedPaciente.primer_apellido} ${selectedPaciente.segundo_apellido}`}
                    </h2>
                    <p className="text-gray-600"><strong>Identificación:</strong> {selectedPaciente.identificacion}</p>
                    <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {selectedPaciente.fecha_nacimiento}</p>
                    <p className="text-gray-600"><strong>Género:</strong> {selectedPaciente.genero}</p>
                    <p className="text-gray-600"><strong>Celular:</strong> {selectedPaciente.celular}</p>
                    <p className="text-gray-600"><strong>Teléfono:</strong> {selectedPaciente.telefono}</p>
                    <p className="text-gray-600"><strong>Correo:</strong> {selectedPaciente.correo}</p>
                    <p className="text-gray-600"><strong>Estatus:</strong> {selectedPaciente.estatus}</p>
                    <p className="text-gray-600"><strong>Estado civil:</strong> {selectedPaciente.estado_civil}</p>
                    <p className="text-gray-600"><strong>Grupo sanguíneo:</strong> {selectedPaciente.grupo_sanguineo}</p>
                    <p className="text-gray-600"><strong>Instrucción:</strong> {selectedPaciente.instruccion}</p>
                    <p className="text-gray-600"><strong>Ocupación:</strong> {selectedPaciente.ocupacion}</p>
                    <p className="text-gray-600"><strong>Empresa:</strong> {selectedPaciente.empresa}</p>
                    <p className="text-gray-600"><strong>Discapacidad:</strong> {selectedPaciente.discapacidad}</p>
                    <p className="text-gray-600"><strong>Orientación:</strong> {selectedPaciente.orientacion}</p>
                    <p className="text-gray-600"><strong>Identidad:</strong> {selectedPaciente.identidad}</p>
                    <p className="text-gray-600"><strong>Tipo paciente:</strong> {selectedPaciente.tipo_paciente}</p>
                </div>
            ) : (
                <p>No se han encontrado datos para el paciente.</p>
            ),
        },
		{
            key: "familiar",
            title: "Familiar",
            content: selectedPaciente?.familiares && selectedPaciente.familiares.length > 0 ? (
                <div className="ml-5">
                    <h2 className="text-lg font-semibold text-gray-700">Información Familiar</h2>
                    {selectedPaciente.familiares.map((familiar) => (
                        <div key={familiar.id_familiar} className="mb-4">
                            <p className="text-gray-600"><strong>Nombre:</strong> {`${familiar.primer_nombre} ${familiar.segundo_nombre} ${familiar.primer_apellido} ${familiar.segundo_apellido}`}</p>
                            <p className="text-gray-600"><strong>Relación:</strong> {familiar.relacion}</p>
                            <p className="text-gray-600"><strong>Identificación:</strong> {familiar.identificacion}</p>
                            <p className="text-gray-600"><strong>Celular:</strong> {familiar.celular}</p>
                            <p className="text-gray-600"><strong>Teléfono:</strong> {familiar.telefono}</p>
                            <p className="text-gray-600"><strong>Correo:</strong> {familiar.correo}</p>
                            <p className="text-gray-600"><strong>Dirección:</strong> {familiar.direccion}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se han encontrado datos familiares para el paciente.</p>
            ),
        },
		{
            key: "informacion-militar",
            title: "Información Militar",
            content: selectedPaciente?.info_militar ? (
                <div className="ml-5">
                    <h2 className="text-lg font-semibold text-gray-700">Información Militar</h2>
                    <p className="text-gray-600"><strong>Cargo:</strong> {selectedPaciente.info_militar.cargo}</p>
                    <p className="text-gray-600"><strong>Grado:</strong> {selectedPaciente.info_militar.grado}</p>
                    <p className="text-gray-600"><strong>Fuerza:</strong> {selectedPaciente.info_militar.fuerza}</p>
                    <p className="text-gray-600"><strong>Unidad:</strong> {selectedPaciente.info_militar.unidad}</p>
                </div>
            ) : (
                <p>No se han encontrado datos militares para el paciente.</p>
            ),
        },
		{
        key: "residencia",
        title: "Residencia",
        content: selectedPaciente?.residencia ? (
            <div className="ml-5" key={selectedPaciente.residencia.id_residencia}>
                <h2 className="text-lg font-semibold text-gray-700">Información de Residencia</h2>
                <p className="text-gray-600"><strong>Lugar de Nacimiento:</strong> {selectedPaciente.residencia.lugar_nacimiento}</p>
                <p className="text-gray-600"><strong>País:</strong> {selectedPaciente.residencia.pais}</p>
                <p className="text-gray-600"><strong>Nacionalidad:</strong> {selectedPaciente.residencia.nacionalidad}</p>
                <p className="text-gray-600"><strong>Provincia:</strong> {selectedPaciente.residencia.provincia}</p>
                <p className="text-gray-600"><strong>Cantón:</strong> {selectedPaciente.residencia.canton}</p>
                <p className="text-gray-600"><strong>Parroquia:</strong> {selectedPaciente.residencia.parroquia}</p>
                <p className="text-gray-600"><strong>Dirección:</strong> {selectedPaciente.residencia.direccion}</p>
                <p className="text-gray-600"><strong>Fecha de Registro:</strong> {new Date(selectedPaciente.residencia.fecha_registro).toLocaleDateString()}</p>
            </div>
        ) : (
            <p>No se han encontrado datos de residencia para el paciente.</p>
        ),
    },
	{
            key: "seguro",
            title: "Seguro",
            content: selectedPaciente?.seguros && selectedPaciente.seguros.length > 0 ? (
                <div className="ml-5">
                    <h2 className="text-lg font-semibold text-gray-700">Información del Seguro</h2>
                    {selectedPaciente.seguros.map((seguro) => (
                        <div key={seguro.id_seguro} className="mb-4">
                            <p className="text-gray-600"><strong>Tipo de Seguro:</strong> {seguro.tipo}</p>
                            <p className="text-gray-600"><strong>Beneficiario:</strong> {seguro.beneficiario}</p>
                            <p className="text-gray-600"><strong>Código:</strong> {seguro.codigo}</p>
                            <p className="text-gray-600"><strong>Cobertura:</strong> {seguro.cobertura}</p>
                            <p className="text-gray-600"><strong>Porcentaje:</strong> {seguro.porcentaje}</p>
                            <p className="text-gray-600"><strong>Fecha de Inicio:</strong> {new Date(seguro.fecha_inicio).toLocaleDateString()}</p>
                            <p className="text-gray-600"><strong>Fecha de Fin:</strong> {new Date(seguro.fecha_fin).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se han encontrado datos de seguro para el paciente.</p>
            ),
        },
    ];

    return (
        <div className="bg-white">
            <NavbarComponent buttons={buttons} onAction={(action) => {
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


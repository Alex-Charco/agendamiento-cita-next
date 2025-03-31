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
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
        { label: "Buscar", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700", onClick: onOpen },
        { label: "+Nuevo", icon: FaPlus, action: "nuevo", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
        { label: "Nuevo Turno", icon: FaCalendarAlt, action: "nuevo-turno", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
        { label: "Guardar", icon: FaSave, action: "guardar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" }
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
    ];

    return (
        <div>
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


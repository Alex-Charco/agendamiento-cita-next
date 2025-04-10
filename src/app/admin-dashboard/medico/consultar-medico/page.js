"use client";

import { useState } from "react";
import { FaTimes, FaSearch, FaPlus, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import MedicoSearch from "@/admin-dashboard/medico/components/MedicoSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";

export default function ConsultaMedicoPage() {
    const [selectedMedico, setSelectedMedico] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleMedicoSelect = (medico) => {
        setSelectedMedico(medico);
        onOpenChange(false);
    };

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
        { label: "Buscar Médico", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", onClick: onOpen },
        { label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard/paciente/registrar-paciente" },
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard/paciente/actualizar-paciente" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" }
    ];

    const tabsConfig = [
        {
            key: "datos-medico",
            title: "Datos Médico",
            content: selectedMedico ? (
                <div className="ml-5" key={selectedMedico.id_medico}>
                    <h2 className="text-lg font-semibold text-gray-700">
                        {`${selectedMedico.primer_nombre} ${selectedMedico.segundo_nombre} ${selectedMedico.primer_apellido} ${selectedMedico.segundo_apellido}`}
                    </h2>
                    <p className="text-gray-600"><strong>Identificación:</strong> {selectedMedico.identificacion}</p>
                    <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {selectedMedico.fecha_nacimiento}</p>
                    <p className="text-gray-600"><strong>Género:</strong> {selectedMedico.genero}</p>
                    <p className="text-gray-600"><strong>Celular:</strong> {selectedMedico.celular}</p>
                    <p className="text-gray-600"><strong>Teléfono:</strong> {selectedMedico.telefono}</p>
                    <p className="text-gray-600"><strong>Correo:</strong> {selectedMedico.correo}</p>
                    <p className="text-gray-600"><strong>Estatus:</strong> {selectedMedico.estatus}</p>
                    <p className="text-gray-600"><strong>Reg. MSP:</strong> {selectedMedico.reg_msp}</p>
                </div>
            ) : (
                <p>No se han encontrado datos para el paciente.</p>
            ),
        },
        
    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Consultar Médicos" buttons={buttons} onAction={(action) => {
                if (action === "buscar") onOpen();
                else console.log(action);
            }} />

            <CustomTabs tabs={tabsConfig} />

            <ReusableModal isOpen={isOpen} onOpenChange={onOpenChange}>
                <MedicoSearch onSelectMedico={handleMedicoSelect} />
            </ReusableModal>

        </div>
    );
}


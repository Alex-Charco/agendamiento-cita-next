"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaPlus, FaSyncAlt } from "react-icons/fa";
import MedicoSearch from "@/admin-dashboard/medico/components/MedicoSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalle from "@/admin-dashboard/medico/components/MedicoDetalle";

export default function ConsultaMedicoPage() {
    const [selectedMedico, setSelectedMedico] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const pathname = usePathname();

    const handleMedicoSelect = (medico) => {
        setSelectedMedico(medico);
        onOpenChange(false);
    };

    const buttons = [
        { label: "Buscar Médico", icon: FaSearch, action: "buscar", onClick: onOpen },
        { label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico", href: "/admin-dashboard/medico/registrar-medico" },
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", href: "/admin-dashboard/medico/actualizar-medico" },
        ...getCommonButtonsByPath(pathname)
    ];

    const tabsConfig = [
        {
            key: "datos-medico",
            title: "Datos Médico",
            content: <MedicoDetalle medico={selectedMedico} />,
        }
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


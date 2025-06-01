"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaPlus, FaSyncAlt, FaHistory } from "react-icons/fa";
import MedicoSearch from "@/admin-dashboard/medico/components/MedicoSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalle from "@/admin-dashboard/medico/components/MedicoDetalle";

export default function ConsultaMedicoPage() {
    const [selectedMedico, setSelectedMedico] = useState(null);
    const pathname = usePathname();

    const handleMedicoSelect = (medico) => {
        setSelectedMedico(medico);
    };

    const buttons = [
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", href: "/admin-dashboard/medico/actualizar-medico" },
        { label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico", href: "/admin-dashboard/medico/registrar-medico" },
        { label: "Historial", icon: FaHistory, action: "historial-medico", href: "/admin-dashboard/medico/actualizar-medico" },
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
            <NavbarComponent
                title="Consultar Médicos"
                buttons={buttons}
                onAction={(action) => {
                    console.log(action);
                }}
            />
			
			<CustomTabs tabs={tabsConfig} />

            {/* Buscador visible directamente */}
            <div className="p-4">
                <MedicoSearch onSelectMedico={handleMedicoSelect} />
            </div>

        </div>
    );
}

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { RegistrarHorario } from "@/utils/api/horarioApi";
import HorarioForm from "@/admin-dashboard/horario/components/HorarioForm";
import useSuccessAlert from "@/hooks/useSuccessAlert";
import { getCommonButtonsByPath } from "@/utils/commonButtons";

export default function RegistrarHorarioPage() {
    const [mensaje, setMensaje] = useState("");
    const [success, setSuccess] = useState(false);
    const pathname = usePathname();

    const handleHorarioSubmit = async (data, identificacion) => {
        await RegistrarHorario(data, identificacion, setMensaje, setSuccess);
    };

    useSuccessAlert(success, setSuccess, "¡Horario registrado exitosamente!");

    const buttons = [
        { label: "Buscar Horario", icon: FaSearch, action: "buscar-horario", href: "/admin-dashboard/horario/consultar-horario" },
        { label: "Actualizar Horario", icon: FaSyncAlt, action: "actualizar-horario", href: "/admin-dashboard/horario/actualizar-horario" },
        ...getCommonButtonsByPath(pathname),
    ];

    const tabsConfig = [
        {
            key: "registrar-horario",
            title: "Registrar Horario",
            content: (
                <div className="min-h-screen p-6 flex flex-col items-center">
                    <div className="lg:w-1/2">
                        <HorarioForm onSubmit={handleHorarioSubmit} />
                        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Registrar Horario" buttons={buttons} onAction={() => { }} />
            <CustomTabs tabs={tabsConfig} />
        </div>
    );
}

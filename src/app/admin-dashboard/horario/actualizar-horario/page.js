"use client";

import { useRef, useState } from "react";
import { usePathname, useSearchParams  } from "next/navigation";
import { FaPlus, FaSearch } from "react-icons/fa";
import HorarioForm from "@/admin-dashboard/horario/components/HorarioForm";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import useSuccessAlert from "@/hooks/useSuccessAlert";
import { ActualizarHorario } from "@/utils/api/horarioApi";
import { getCommonButtonsByPath } from "@/utils/commonButtons";


export default function ActualizarHorarioPage() {
    const formRef = useRef();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 🔁 Primero extraes los datos
    const initialHorarioData = {
        id_horario: parseInt(searchParams.get("id")),
        id_medico: parseInt(searchParams.get("id_medico")),
        institucion: searchParams.get("institucion"),
        fecha_horario: searchParams.get("fecha_horario"),
        hora_inicio: searchParams.get("hora_inicio"),
        hora_fin: searchParams.get("hora_fin"),
        consulta_maxima: parseInt(searchParams.get("consulta_maxima")),
        asignado: parseInt(searchParams.get("asignado")),
        turno_extra: parseInt(searchParams.get("turno_extra")),
    };

    // ✅ Luego lo usas
    const [horarioData, setHorarioData] = useState(initialHorarioData);
    const [mensaje, setMensaje] = useState("");
    const [success, setSuccess] = useState(false);

    const handleHorarioSubmit = async (data) => {
        await ActualizarHorario(data, horarioData.id_horario, setMensaje, setSuccess);
    };

    const handleHorarioEncontrado = (data) => {
        if (data && data.horarios?.length > 0) {
            // Supongamos que solo se permite actualizar el primer horario
            setHorarioData(data.horarios[0]);
        } else {
            setMensaje("No se encontró ningún horario asignado.");
        }
    };

    useSuccessAlert(success, () => {
        setSuccess(false);
        setHorarioData(null);
        formRef.current?.resetForm();
    }, "¡Horario actualizado exitosamente!");

    const buttons = [
        { label: "Registrar Horario", icon: FaPlus, action: "registrar-horario", href: "/admin-dashboard/horario/registrar-horario" },
        { label: "Buscar Horario", icon: FaSearch, action: "buscar-horario", href: "/admin-dashboard/horario/consultar-horario" },
        ...getCommonButtonsByPath(pathname),
    ];

    const tabsConfig = [
        {
            key: "actualizar-horario",
            title: "Actualizar Horario",
            content: (
                <div className="min-h-screen px-6 pt-6 pb-16 flex flex-col items-center bg-white">
                    <div className="w-full md:w-3/4 lg:w-1/2">
                        {horarioData && (
                            <div className="mt-6">
                                <HorarioForm ref={formRef} onSubmit={handleHorarioSubmit} horarioData={horarioData} />
                                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Actualizar Horario" buttons={buttons} onAction={() => { }} />
            <CustomTabs tabs={tabsConfig} />
        </div>
    );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
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
    // ✅ Luego lo usas
    const [horarioData, setHorarioData] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);

		const getIntParam = (key) => {
			const value = searchParams.get(key);
			return value !== null ? parseInt(value, 10) : null;
		};

		const newHorario = {
			id_horario: getIntParam("id"),
			id_medico: getIntParam("id_medico"),
			institucion: searchParams.get("institucion") || "",
			fecha_horario: searchParams.get("fecha_horario") || "",
			hora_inicio: searchParams.get("hora_inicio") || "",
			hora_fin: searchParams.get("hora_fin") || "",
			consulta_maxima: getIntParam("consulta_maxima") ?? 0,
			asignado: getIntParam("asignado") ?? 0,
			turno_extra: getIntParam("turno_extra") ?? 0,
		};

		setHorarioData(newHorario);
	}, []);

    const handleHorarioSubmit = async (data) => {
        await ActualizarHorario(data, horarioData.id_horario, setMensaje, setSuccess);
    };

    useSuccessAlert(success, () => {
        setSuccess(false);
        setHorarioData({
            id_horario: null,
            id_medico: null,
            institucion: "",
            fecha_horario: "",
            hora_inicio: "",
            hora_fin: "",
            consulta_maxima: 0,
            asignado: 0,
            turno_extra: 0,
        });
        formRef.current?.resetForm();
        router.push("/admin-dashboard/horario/consultar-horario");
    }, "¡Horario actualizado exitosamente!");
    
    const buttons = [
		{ label: "Buscar Horario", icon: FaSearch, action: "buscar-horario", href: "/admin-dashboard/horario/consultar-horario" },
        { label: "Registrar Horario", icon: FaPlus, action: "registrar-horario", href: "/admin-dashboard/horario/registrar-horario" },
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

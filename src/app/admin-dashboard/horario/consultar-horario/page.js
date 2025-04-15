"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import HorarioSearch from "@/admin-dashboard/horario/components/HorarioSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalle from "@/admin-dashboard/medico/components/MedicoDetalle";
import TablaHorarios from "@/admin-dashboard/horario/components/TablaHorarios";
import TablaTurnos from "@/admin-dashboard/horario/components/TablaTurnos";

export default function ConsultaHorarioPage() {
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [horarioSeleccionadoParaTurnos, setHorarioSeleccionadoParaTurnos] = useState(null);
    const pathname = usePathname();

    const handleHorarioSelect = (data) => {
        setSelectedHorario(data);
        setHorarioSeleccionadoParaTurnos(null); // Reinicia selección de turnos al cambiar de médico
    };

    const handleVerTurnos = (horario) => {
        setHorarioSeleccionadoParaTurnos(horario);
    };

    const buttons = [
        {
            label: "Nuevo Horario",
            icon: FaPlus,
            action: "nuevo-horario",
            href: "/admin-dashboard/horario/registrar-horario",
        },
        ...getCommonButtonsByPath(pathname),
    ];

    return (
        <div className="bg-white border-1 border-gray-200">
            <NavbarComponent title="Consultar Horario" buttons={buttons} />

            <div className="flex justify-center py-8">
                <div className="flex flex-col w-full max-w-4xl gap-6 border rounded-xl shadow-lg p-6 bg-white">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Buscar Horario por Médico</h2>

                    <HorarioSearch onHorarioEncontrado={handleHorarioSelect} />

                    {selectedHorario && (
                        <>
                            <MedicoDetalle
                                medico={{
                                    ...selectedHorario.medico,
                                    especialidad: selectedHorario.especialidad,
                                }}
                            />

                            <TablaHorarios
                                horarios={selectedHorario.horarios}
                                onSeleccionarHorario={handleVerTurnos}
                            />

                            {horarioSeleccionadoParaTurnos ? (
                                <>
                                    <h3 className="text-xl font-bold mt-4 text-gray-700">
                                        Turnos del {horarioSeleccionadoParaTurnos.fecha_horario}
                                    </h3>
                                    <TablaTurnos turnos={horarioSeleccionadoParaTurnos.turnos} />
                                </>
                            ) : (
                                <p className="text-center text-gray-500">
                                    Selecciona un horario para ver sus turnos.
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

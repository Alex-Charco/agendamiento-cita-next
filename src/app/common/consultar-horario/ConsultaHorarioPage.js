"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HorarioSearch from "@/admin-dashboard/horario/components/HorarioSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalle from "@/admin-dashboard/medico/components/MedicoDetalle";
import TablaHorarios from "@/admin-dashboard/horario/components/TablaHorarios";
import TablaTurnos from "@/admin-dashboard/horario/components/TablaTurnos";
import { FaPlus } from "react-icons/fa";

export default function ConsultaHorarioPage() {
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [horarioSeleccionadoParaTurnos, setHorarioSeleccionadoParaTurnos] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    const handleHorarioSelect = (data) => {
        setSelectedHorario(data);
        setHorarioSeleccionadoParaTurnos(null);
    };

    const handleVerTurnos = (horario) => {
        setHorarioSeleccionadoParaTurnos(horario);
    };

    const handleActualizarTurnoExtra = (id_horario, nuevoValor) => {
        const nuevosHorarios = selectedHorario.horarios.map(horario =>
            horario.id_horario === id_horario
                ? { ...horario, turno_extra: nuevoValor }
                : horario
        );

        setSelectedHorario(prev => ({
            ...prev,
            horarios: nuevosHorarios
        }));
    };

    const handleActualizarHorario = (horario) => {
        const params = new URLSearchParams({
            id: horario.id_horario,
            id_medico: horario.id_medico,
            institucion: horario.institucion,
            fecha_horario: horario.fecha_horario,
            hora_inicio: horario.hora_inicio,
            hora_fin: horario.hora_fin,
            consulta_maxima: horario.consulta_maxima,
            asignado: horario.asignado,
            turno_extra: horario.turno_extra,
        }).toString();

        router.push(`/admin-dashboard/horario/actualizar-horario?${params}`);
    };

    const buttons = [
        { label: "Nuevo Horario", icon: FaPlus, action: "nuevo-horario", href: "/admin-dashboard/horario/registrar-horario" },
        ...getCommonButtonsByPath(pathname),
    ];

    return (
        <div className="bg-gray-50 border-1 border-gray-200">
            <NavbarComponent title="Consultar Horario" buttons={buttons} />

            <div className="flex justify-center py-2">
                <div className="relative flex flex-col w-full border rounded shadow-lg p-2 bg-gray-50 mx-2 text-center">

                    {/* Título flotante */}
                    <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                        Horarios
                    </div>

                    <HorarioSearch onHorarioEncontrado={handleHorarioSelect} />

                    {selectedHorario && (
                        <>
                            <MedicoDetalle
                                medico={{
                                    ...selectedHorario.medico,
                                    especialidad: selectedHorario.especialidad,
                                }}
                                mostrarCampos={["nombre", "identificacion", "correo", "especialidad"]}
                            />

                            {/* Si no tiene horarios disponibles */}
                            {selectedHorario.horarios.length === 0 ? (
                                <p className="text-center text-gray-500 py-4">
                                    Este médico no tiene ningún horario disponible.
                                </p>
                            ) : (
                                <>
                                    <TablaHorarios
                                        horarios={selectedHorario.horarios}
                                        onSeleccionarHorario={handleVerTurnos}
                                        onActualizarTurnoExtra={handleActualizarTurnoExtra}
                                        onActualizarHorario={handleActualizarHorario}
                                    />

                                    {/* Mostrar turnos solo si se selecciona un horario */}
                                    {horarioSeleccionadoParaTurnos ? (
                                        <TablaTurnos
                                            turnos={horarioSeleccionadoParaTurnos.turnos.map(turno => ({
                                                ...turno,
                                                fecha: horarioSeleccionadoParaTurnos.fecha_horario
                                            }))}
                                        />
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">
                                            Selecciona un horario para ver sus turnos.
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

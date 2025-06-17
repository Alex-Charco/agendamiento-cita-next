"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import MedicoDetalle from "@/admin-dashboard/medico/components/MedicoDetalle";
import TablaHorarios from "@/admin-dashboard/horario/components/TablaHorarios";
import TablaTurnos from "@/admin-dashboard/horario/components/TablaTurnos";
import authAxios from "@/utils/api/authAxios";
import { getCommonButtonsByPath } from "@/utils/commonButtons";

export default function ConsultaHorarioMedicoPage() {
    const [selectedHorario, setSelectedHorario] = useState(null);
    const [horarioSeleccionadoParaTurnos, setHorarioSeleccionadoParaTurnos] = useState(null);
    const [error, setError] = useState(null);
    const pathname = usePathname();

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

    useEffect(() => {
        const fetchHorarioDelMedico = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user.identificacion) {
                    setError("No se encontró la información del médico en localStorage.");
                    return;
                }

                const identificacion = user.identificacion;
                const response = await authAxios.get(`/api/horario/get/${identificacion}`);
                const { medico, horarios, turnos } = response.data;

                if (medico) {
					const especialidad = medico.especialidad || {};
					const data = { medico, especialidad, horarios: horarios || [], turnos: turnos || [] };
					setSelectedHorario(data);

					if (!horarios || horarios.length === 0) {
						setError("");
					}
				} else {
					setError("No se encontró información del médico.");
				}
            } catch (err) {
                console.error("Error al obtener los horarios:", err);
                setError("Ocurrió un error al consultar el horario.");
            }
        };

        fetchHorarioDelMedico();
    }, []);
	
	const buttons = [
        ...getCommonButtonsByPath(pathname),
    ];

    return (
    <div className="bg-gray-50 border-1 border-gray-200">
        <NavbarComponent title="Consultar Horario" buttons={buttons} />

        <div className="flex justify-center py-2">
            <div className="relative flex flex-col w-full border rounded shadow-lg p-2 bg-gray-50 mx-2 text-center">

                <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                    Horarios
                </div>

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                {selectedHorario && (
                    <>
                        <MedicoDetalle
                            medico={{
                                ...selectedHorario.medico,
                                especialidad: selectedHorario.especialidad,
                            }}
                            mostrarCampos={["nombre", "identificacion", "correo", "especialidad"]}
                        />

                        {selectedHorario.horarios.length === 0 ? (
                            <p className="text-blue-600 text-sm text-center my-2">
                                No tiene horarios ni turnos registrados.
                            </p>
                        ) : (
                            <>
                                <TablaHorarios
                                    horarios={selectedHorario.horarios}
                                    onSeleccionarHorario={handleVerTurnos}
                                    onActualizarTurnoExtra={handleActualizarTurnoExtra}
                                    onActualizarHorario={null}
									rol="medico"
                                />
                                {horarioSeleccionadoParaTurnos && (
                                    <TablaTurnos
                                        turnos={horarioSeleccionadoParaTurnos.turnos.map(turno => ({
                                            ...turno,
                                            fecha: horarioSeleccionadoParaTurnos.fecha_horario
                                        }))}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div> {/* cierre de div con className="relative..." */}
        </div> {/* cierre de flex justify-center */}
    </div> // cierre final del contenedor principal
);

}

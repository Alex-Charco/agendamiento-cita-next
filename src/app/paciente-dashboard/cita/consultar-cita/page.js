"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import PacienteDetalle from "@/admin-dashboard/cita/components/PacienteDetalle";
import TablaCitas from "@/admin-dashboard/cita/components/TablaCitas";
import { FaPlus } from "react-icons/fa";
import CitaPacienteSearch from "@/paciente-dashboard/cita/components/CitaPacienteSearch";
import authAxios from "@/utils/api/authAxios";

export default function ConsultaCitaPacientePage() {
    const [selectedCita, setSelectedCita] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchCitasPaciente = async (identificacion) => {
            try {
                const response = await authAxios.get(`/api/cita/get/paciente/${identificacion}?desdeHoy=true`);
                console.log("Citas obtenidas:", response.data);
                setSelectedCita(response.data);
            } catch (error) {
                console.error("Error al obtener citas:", error);
            }
        };

        if (usuario?.rol?.nombre_rol === "PACIENTE") {
            if (usuario.identificacion) {
                fetchCitasPaciente(usuario.identificacion);
            }
        }
    }, [usuario]);

    const handleCitaSelect = (data) => {
        console.log("handleCitaSelect recibió:", data);
        if (data?.paciente && Array.isArray(data?.citas)) {
            setSelectedCita(data);
        }
    };

    const transformarCitasParaTabla = (citas, nombrePaciente) => {
        return citas.map((cita, index) => ({
            id_cita: index + 1, // o usa un ID real si está disponible
            nombre_medico: cita.datos_medico.nombre,
            especialidad: cita.datos_especialidad.nombre,
            tipo_atencion: cita.datos_especialidad.atencion,
            consultorio: cita.datos_especialidad.consultorio,
            fecha_turno: cita.datos_turno.fecha_horario,
            hora_turno: cita.datos_turno.hora_turno,
            numero_turno: cita.datos_turno.numero_turno,
            usuario: nombrePaciente,
            fecha_creacion: cita.datos_cita.fecha_creacion,
            estado: cita.datos_cita.estado_cita,
        }));
    };


    const buttons = [
        {
            label: "Nueva Cita",
            icon: FaPlus,
            action: "nueva-cita",
            href: "/admin-dashboard/cita/nueva-cita"
        },
        ...getCommonButtonsByPath(pathname),
    ];

    return (
        <div className="bg-gray-50 border border-gray-200 min-h-screen">
            <NavbarComponent title="Consultar Cita" buttons={buttons} />

            <div className="flex justify-center py-2">
                <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">

                    <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                        Citas
                    </div>

                    {/* Mostrar buscador solo si NO es paciente */}
                    {usuario?.rol?.nombre_rol !== "PACIENTE" && (
                        <CitaPacienteSearch onSelectCita={handleCitaSelect} />
                    )}

                    {selectedCita?.paciente ? (
                        <>
                            <PacienteDetalle
                                paciente={selectedCita.paciente}
                                mostrarCampos={["nombre", "identificacion", "nombre_usuario", "correo"]}
                            />

                            <TablaCitas
                                citas={transformarCitasParaTabla(selectedCita.citas, selectedCita.paciente.nombre)}
                                onVerCita={(cita) => console.log("Ver cita", cita)}
                                onEditarCita={(cita) => console.log("Editar cita", cita)}
                            />
                        </>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            {usuario?.rol?.nombre_rol === "PACIENTE"
                                ? "Cargando citas..."
                                : "Selecciona un paciente para ver sus citas."
                            }
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
}

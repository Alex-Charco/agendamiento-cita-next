"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaPlus, FaSyncAlt } from "react-icons/fa";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { fetchInfoMilitar } from "@/utils/api";

export default function ConsultaPacientePage() {
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [selectedInfoMilitar, setSelectedInfoMilitar] = useState(null);
    const pathname = usePathname();

    const handlePacienteSelect = (paciente) => {
        console.log("Paciente seleccionado:", paciente);
        setSelectedPaciente(paciente);

        // Verificar si el paciente es de tipo militar antes de intentar obtener la info militar
        if (paciente.tipo_paciente === "MILITAR") {
            fetchInfoMilitar(paciente.identificacion, setSelectedInfoMilitar).catch((error) => {
                console.error("Error al obtener información militar:", error);
                setSelectedInfoMilitar(null); // Si hay error, aseguramos que no haya datos previos
            });
        } else {
            // Si no es de tipo militar, no se obtiene la información militar
            setSelectedInfoMilitar(null);
        }
    };

    const buttons = [
        { label: "Nuevo Paciente", icon: FaPlus, action: "nuevo-paciente", href: "/admin-dashboard/paciente/registrar-paciente" },
        { label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", href: "/admin-dashboard/paciente/actualizar-paciente" },
        ...getCommonButtonsByPath(pathname)
    ];

    const tabsConfig = [
        {
            key: "datos-generales",
            title: "Datos Generales",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-2 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Datos del Paciente</h2>
                        <PacienteSearch onSelectPaciente={handlePacienteSelect} />

                        {selectedPaciente && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700  border rounded-lg p-4 bg-gray-50">
                                <p><span className="font-semibold">Nombre:</span> {[selectedPaciente.primer_nombre, selectedPaciente.segundo_nombre, selectedPaciente.primer_apellido, selectedPaciente.segundo_apellido].filter(Boolean).join(" ")}</p>
                                <p><span className="font-semibold">Identificación:</span> {selectedPaciente.identificacion}</p>
                                <p><span className="font-semibold">Fecha de Nacimiento:</span> {selectedPaciente.fecha_nacimiento}</p>
                                <p><span className="font-semibold">Género:</span> {selectedPaciente.genero}</p>
                                <p><span className="font-semibold">Celular:</span> {selectedPaciente.celular}</p>
                                <p><span className="font-semibold">Teléfono:</span> {selectedPaciente.telefono}</p>
                                <p><span className="font-semibold">Correo:</span> {selectedPaciente.correo}</p>
                                <p><span className="font-semibold">Estatus:</span> {selectedPaciente.estatus}</p>
                                <p><span className="font-semibold">Estado civil:</span> {selectedPaciente.estado_civil}</p>
                                <p><span className="font-semibold">Grupo sanguíneo:</span> {selectedPaciente.grupo_sanguineo}</p>
                                <p><span className="font-semibold">Instrucción:</span> {selectedPaciente.instruccion}</p>
                                <p><span className="font-semibold">Ocupación:</span> {selectedPaciente.ocupacion}</p>
                                <p><span className="font-semibold">Empresa:</span> {selectedPaciente.empresa}</p>
                                <p><span className="font-semibold">Discapacidad:</span> {selectedPaciente.discapacidad}</p>
                                <p><span className="font-semibold">Orientación:</span> {selectedPaciente.orientacion}</p>
                                <p><span className="font-semibold">Identidad:</span> {selectedPaciente.identidad}</p>
                                <p><span className="font-semibold">Tipo paciente:</span> {selectedPaciente.tipo_paciente}</p>
                            </div>
                        )}
                    </div>
                </div>
            ),
        },

        {
            key: "datos-familiar",
            title: "Familiar",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-4 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Información Familiar</h2>
                        {selectedPaciente?.Familiars?.length > 0 ? (
                            selectedPaciente.Familiars.map((familiar, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700 border rounded-lg p-4 bg-gray-50"
                                >
                                    <p><span className="font-semibold">Nombre:</span> {[familiar.primer_nombre, familiar.segundo_nombre, familiar.primer_apellido, familiar.segundo_apellido].filter(Boolean).join(" ")}</p>
                                    <p><span className="font-semibold">Relación:</span> {familiar.relacion}</p>
                                    <p><span className="font-semibold">Identificación:</span> {familiar.identificacion}</p>
                                    <p><span className="font-semibold">Celular:</span> {familiar.celular}</p>
                                    <p><span className="font-semibold">Teléfono:</span> {familiar.telefono}</p>
                                    <p><span className="font-semibold">Correo:</span> {familiar.correo}</p>
                                    <p className="sm:col-span-2"><span className="font-semibold">Dirección:</span> {familiar.direccion}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No se encontró información familiar asociada al paciente.</p>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "datos-info-militar",
            title: "Info Militar",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-2 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Información Militar</h2>
                        {selectedInfoMilitar ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 border rounded-lg p-4 bg-gray-50">
                                <p><span className="font-semibold">Cargo:</span> {selectedInfoMilitar.cargo}</p>
                                <p><span className="font-semibold">Grado:</span> {selectedInfoMilitar.grado}</p>
                                <p><span className="font-semibold">Fuerza:</span> {selectedInfoMilitar.fuerza}</p>
                                <p><span className="font-semibold">Unidad:</span> {selectedInfoMilitar.unidad}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600">No se encontró información militar asociada al paciente.</p>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "datos-residencia",
            title: "Residencia",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-2 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Información de Residencia</h2>
                        {selectedPaciente?.residencia ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700  border rounded-lg p-4 bg-gray-50">
                                <p><span className="font-semibold">Lugar de Nacimiento:</span> {selectedPaciente.residencia.lugar_nacimiento}</p>
                                <p><span className="font-semibold">País:</span> {selectedPaciente.residencia.pais}</p>
                                <p><span className="font-semibold">Nacionalidad:</span> {selectedPaciente.residencia.nacionalidad}</p>
                                <p><span className="font-semibold">Provincia:</span> {selectedPaciente.residencia.provincia}</p>
                                <p><span className="font-semibold">Cantón:</span> {selectedPaciente.residencia.canton}</p>
                                <p><span className="font-semibold">Parroquia:</span> {selectedPaciente.residencia.parroquia}</p>
                                <p className="md:col-span-2"><span className="font-semibold">Dirección:</span> {selectedPaciente.residencia.direccion}</p>
                                <p className="md:col-span-2"><span className="font-semibold">Fecha de Registro:</span> {new Date(selectedPaciente.residencia.fecha_registro).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600">No se encontraron datos de residencia asociados al paciente.</p>
                        )}
                    </div>
                </div>
            ),
        },

        {
            key: "datos-seguro",
            title: "Datos del Seguro",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-2 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Información del Seguro</h2>
                        {selectedPaciente?.Seguro ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700  border rounded-lg p-4 bg-gray-50">
                                <p><span className="font-semibold">Entidad Aseguradora:</span> {selectedPaciente.Seguro.entidad}</p>
                                <p><span className="font-semibold">Tipo de Seguro:</span> {selectedPaciente.Seguro.tipo}</p>
                                <p><span className="font-semibold">Número de Póliza:</span> {selectedPaciente.Seguro.numero_poliza}</p>
                                <p><span className="font-semibold">Fecha de Inicio:</span> {new Date(selectedPaciente.Seguro.fecha_inicio).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Fecha de Expiración:</span> {new Date(selectedPaciente.Seguro.fecha_expiracion).toLocaleDateString()}</p>
                            </div>
                        ) : (
                            <p className="text-gray-600">No se encontraron datos del seguro asociados al paciente.</p>
                        )}
                    </div>
                </div>
            ),
        },

        {
            key: "datos-usuario",
            title: "Datos del Usuario",
            content: (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-4xl gap-2 border rounded-xl shadow-lg p-6 bg-white">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">Información del Usuario</h2>
                        {selectedPaciente?.usuario ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700  border rounded-lg p-4 bg-gray-50">
                                <p><span className="font-semibold">Nombre de Usuario:</span> {selectedPaciente.usuario.nombre_usuario}</p>
                                <p><span className="font-semibold">Fecha de Creación:</span> {new Date(selectedPaciente.usuario.fecha_creacion).toLocaleDateString()}</p>
                                <p><span className="font-semibold">Rol:</span> {selectedPaciente.usuario.rol?.nombre_rol}</p>
                                <p><span className="font-semibold">Estatus:</span> {selectedPaciente.usuario.estatus === 1 ? "Activo" : "Inactivo"}</p>

                                <div className="md:col-span-2 mt-2">
                                    <h3 className="text-md font-semibold text-gray-600 mb-2">Permisos:</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedPaciente.usuario.rol?.permiso?.ver_cita && <li>Ver cita</li>}
                                        {selectedPaciente.usuario.rol?.permiso?.ver_turno && <li>Ver turno</li>}
                                        {selectedPaciente.usuario.rol?.permiso?.ver_historial && <li>Ver historial</li>}
                                        {selectedPaciente.usuario.rol?.permiso?.registrar_cita && <li>Registrar cita</li>}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">No se encontraron datos del usuario asociados al paciente.</p>
                        )}
                    </div>
                </div>
            ),
        }


    ];

    return (
        <div className="bg-white">
            <NavbarComponent title="Consultar Paciente" buttons={buttons} />
            <CustomTabs tabs={tabsConfig} />
        </div>
    );
}


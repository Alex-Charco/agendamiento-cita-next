"use client";

import { useState } from "react";
import { FaTimes, FaSearch, FaPlus, FaSyncAlt, FaSignOutAlt } from "react-icons/fa";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";

export default function ConsultaPacientePage() {
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handlePacienteSelect = (paciente) => {
        setSelectedPaciente(paciente);
        onOpenChange(false);
    };

    const buttons = [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", href: "/admin-dashboard" },
        { label: "Buscar Paciente", icon: FaSearch, action: "buscar", onClick: onOpen },
        { label: "Nuevo Paciente", icon: FaPlus, action: "nuevo-paciente", href: "/admin-dashboard/paciente/registrar-paciente" },
        { label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", href: "/admin-dashboard/paciente/actualizar-paciente" },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", href: "/admin-dashboard" }
    ];

    const tabsConfig = [
        {
            key: "datos-generales",
            title: "Datos Generales",
            content: selectedPaciente ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key={selectedPaciente.id_paciente}>
                    {/* Columna: Datos del Paciente */}
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Datos del Paciente</h2>
                        <p className="text-gray-600"><strong>Nombre:</strong>  {[
                            selectedPaciente.primer_nombre,
                            selectedPaciente.segundo_nombre,
                            selectedPaciente.primer_apellido,
                            selectedPaciente.segundo_apellido
                        ]
                            .filter(Boolean)  // Filtra los valores falsy (null, undefined, "", etc.)
                            .join(" ")}  {/* Une los valores con un solo espacio entre ellos */}
                        </p>
                        <p className="text-gray-600"><strong>Identificación:</strong> {selectedPaciente.identificacion}</p>
                        <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {selectedPaciente.fecha_nacimiento}</p>
                        <p className="text-gray-600"><strong>Género:</strong> {selectedPaciente.genero}</p>
                        <p className="text-gray-600"><strong>Celular:</strong> {selectedPaciente.celular}</p>
                        <p className="text-gray-600"><strong>Teléfono:</strong> {selectedPaciente.telefono}</p>
                        <p className="text-gray-600"><strong>Correo:</strong> {selectedPaciente.correo}</p>
                        <p className="text-gray-600"><strong>Estatus:</strong> {selectedPaciente.estatus}</p>
                        <p className="text-gray-600"><strong>Estado civil:</strong> {selectedPaciente.estado_civil}</p>
                        <p className="text-gray-600"><strong>Grupo sanguíneo:</strong> {selectedPaciente.grupo_sanguineo}</p>
                        <p className="text-gray-600"><strong>Instrucción:</strong> {selectedPaciente.instruccion}</p>
                        <p className="text-gray-600"><strong>Ocupación:</strong> {selectedPaciente.ocupacion}</p>
                        <p className="text-gray-600"><strong>Empresa:</strong> {selectedPaciente.empresa}</p>
                        <p className="text-gray-600"><strong>Discapacidad:</strong> {selectedPaciente.discapacidad}</p>
                        <p className="text-gray-600"><strong>Orientación:</strong> {selectedPaciente.orientacion}</p>
                        <p className="text-gray-600"><strong>Identidad:</strong> {selectedPaciente.identidad}</p>
                        <p className="text-gray-600"><strong>Tipo paciente:</strong> {selectedPaciente.tipo_paciente}</p>
                    </div>
                </div>
            ) : (
                <p>No se han encontrado datos para el paciente.</p>
            ),
        },
        {
            key: "datos-familiar",
            title: "Familiar",
            content: selectedPaciente?.Familiars ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key="familiar-info">
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Información Familiar</h2>
                        <p className="text-gray-600">
                            <strong>Nombre:</strong> {[
                                selectedPaciente.Familiars.primer_nombre,
                                selectedPaciente.Familiars.segundo_nombre,
                                selectedPaciente.Familiars.primer_apellido,
                                selectedPaciente.Familiars.segundo_apellido
                            ].filter(Boolean).join(" ")}
                        </p>
                        <p className="text-gray-600"><strong>Relación:</strong> {selectedPaciente.Familiars.relacion}</p>
                        <p className="text-gray-600"><strong>Identificación:</strong> {selectedPaciente.Familiars.identificacion}</p>
                        <p className="text-gray-600"><strong>Celular:</strong> {selectedPaciente.Familiars.celular}</p>
                        <p className="text-gray-600"><strong>Teléfono:</strong> {selectedPaciente.Familiars.telefono}</p>
                        <p className="text-gray-600"><strong>Correo:</strong> {selectedPaciente.Familiars.correo}</p>
                        <p className="text-gray-600"><strong>Dirección:</strong> {selectedPaciente.Familiars.direccion}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 ml-5">No se encontró información familiar asociada al paciente.</p>
            ),
        },
        {
            key: "datos-info-militar",
            title: "Info Militar",
            content: selectedPaciente?.InfoMilitar ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key="seguro-info">
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Información Militar</h2>
                        <p className="text-gray-600"><strong>Cargo:</strong> {infoMilitar.cargo}</p>
                        <p className="text-gray-600"><strong>Grado:</strong> {infoMilitar.grado}</p>
                        <p className="text-gray-600"><strong>Fuerza:</strong> {infoMilitar.fuerza}</p>
                        <p className="text-gray-600"><strong>Unidad:</strong> {infoMilitar.unidad}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 ml-5">No se encontró información militar asociados al paciente.</p>
            ),
        },
        {
            key: "datos-residencia",
            title: "Residencia",
            content: selectedPaciente?.residencia ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key="seguro-info">
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Información de la Residencia</h2>
                        <p className="text-gray-600"><strong>Lugar de Nacimiento:</strong> {selectedPaciente.residencia.lugar_nacimiento}</p>
                        <p className="text-gray-600"><strong>País:</strong> {selectedPaciente.residencia.pais}</p>
                        <p className="text-gray-600"><strong>Nacionalidad:</strong> {selectedPaciente.residencia.nacionalidad}</p>
                        <p className="text-gray-600"><strong>Provincia:</strong> {selectedPaciente.residencia.provincia}</p>
                        <p className="text-gray-600"><strong>Cantón:</strong> {selectedPaciente.residencia.canton}</p>
                        <p className="text-gray-600"><strong>Parroquia:</strong> {selectedPaciente.residencia.parroquia}</p>
                        <p className="text-gray-600"><strong>Dirección:</strong> {selectedPaciente.residencia.direccion}</p>
                        <p className="text-gray-600"><strong>Fecha de Registro:</strong> {new Date(selectedPaciente.residencia.fecha_registro).toLocaleDateString()}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 ml-5">No se encontraron datos de residencia asociados al paciente.</p>
            ),
        },
        {
            key: "datos-seguro",
            title: "Datos del Seguro",
            content: selectedPaciente?.Seguro ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key="seguro-info">
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Información del Seguro</h2>
                        <p className="text-gray-600"><strong>Entidad Aseguradora:</strong> {selectedPaciente.Seguro.entidad}</p>
                        <p className="text-gray-600"><strong>Tipo de Seguro:</strong> {selectedPaciente.Seguro.tipo}</p>
                        <p className="text-gray-600"><strong>Número de Póliza:</strong> {selectedPaciente.Seguro.numero_poliza}</p>
                        <p className="text-gray-600"><strong>Fecha de Inicio:</strong> {new Date(selectedPaciente.Seguro.fecha_inicio).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Fecha de Expiración:</strong> {new Date(selectedPaciente.Seguro.fecha_expiracion).toLocaleDateString()}</p>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 ml-5">No se encontraron datos del seguro asociados al paciente.</p>
            ),
        },
        {
            key: "datos-usuario",
            title: "Datos del Usuario",
            content: selectedPaciente?.usuario ? (
                <div className="flex flex-col md:flex-row gap-10 ml-5" key="usuario-info">
                    <div className="flex-1 border-1 rounded-xl shadow-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700">Información del Usuario</h2>
                        <p className="text-gray-600"><strong>Nombre de Usuario:</strong> {selectedPaciente.usuario.nombre_usuario}</p>
                        <p className="text-gray-600"><strong>Fecha de Creación:</strong> {new Date(selectedPaciente.usuario.fecha_creacion).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Rol:</strong> {selectedPaciente.usuario.rol?.nombre_rol}</p>
                        <p className="text-gray-600"><strong>Estatus:</strong> {selectedPaciente.usuario.estatus === 1 ? "Activo" : "Inactivo"}</p>

                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-600">Permisos:</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {selectedPaciente.usuario.rol?.permiso?.ver_cita && <li>Ver cita</li>}
                                {selectedPaciente.usuario.rol?.permiso?.ver_turno && <li>Ver turno</li>}
                                {selectedPaciente.usuario.rol?.permiso?.ver_historial && <li>Ver historial</li>}
                                {selectedPaciente.usuario.rol?.permiso?.registrar_cita && <li>Registrar cita</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 ml-5">No se encontraron datos del usuario asociados al paciente.</p>
            ),
        },

    ];


    return (
        <div className="bg-white">
            <NavbarComponent title="Consultar Pacientes" buttons={buttons} onAction={(action) => {
                if (action === "buscar") onOpen();
                else console.log(action);
            }} />

            <CustomTabs tabs={tabsConfig} />

            <ReusableModal isOpen={isOpen} onOpenChange={onOpenChange}>
                <PacienteSearch onSelectPaciente={handlePacienteSelect} />
            </ReusableModal>

        </div>
    );
}


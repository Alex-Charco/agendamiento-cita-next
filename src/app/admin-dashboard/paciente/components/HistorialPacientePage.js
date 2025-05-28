"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaFileMedical } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { fetchHistorialPaciente } from "@/utils/api";
import DynamicTable from "@/components/table/DynamicTable";

export default function HistorialCambiosPacientePage() {
    const pathname = usePathname();
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [historialCambios, setHistorialCambios] = useState([]);

    const handlePacienteSelect = async (paciente) => {
        setSelectedPaciente(paciente);

        if (paciente?.identificacion) {
            await fetchHistorialPaciente(paciente.identificacion, setHistorialCambios);
        } else {
            setHistorialCambios([]);
        }
    };

    const buttons = [
        { label: "Ver Consulta", icon: FaFileMedical, action: "ver-consulta", href: "/admin-dashboard/consulta" },
        ...getCommonButtonsByPath(pathname),
    ];

    const tableColumns = [
        {
            uid: "fecha_cambio",
            name: "Fecha",
            render: (item) => new Date(item.fecha_cambio).toLocaleString(),
        },
        { uid: "campo_modificado", name: "Campo Modificado" },
        { uid: "valor_anterior", name: "Valor Anterior" },
        { uid: "valor_nuevo", name: "Valor Nuevo" },
    ];

    return (
        <>
            <NavbarComponent
                title="Historial de Cambios del Paciente"
                buttons={buttons}
                onAction={(action) => {
                    console.log("Acción del navbar:", action);
                }}
            />

            <div className="flex justify-center bg-white py-4 border-b border-gray-100">
                <div className="w-full max-w-4xl px-4">
                    <PacienteSearch onSelectPaciente={handlePacienteSelect} />
                </div>
            </div>

            {selectedPaciente && (
                <div className="flex justify-center py-8">
                    <div className="flex flex-col w-full max-w-6xl gap-4 border rounded-xl shadow-lg p-6 bg-white">
                        {historialCambios.length > 0 ? (
                            <DynamicTable
                                columns={tableColumns}
                                data={historialCambios}
                                rowsPerPage={5}
                                filterPlaceholder="Buscar en el historial de cambios..."
                                actionLabel={null}
                                actionRoute=""
                            />
                        ) : (
                            <p className="text-gray-600">
                                No hay historial de cambios disponible para este paciente.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

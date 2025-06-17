"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaPlus, FaSyncAlt, FaSearch } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import Search from "@/components/Search";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { fetchHistorialMedico } from "@/utils/api/medicoApi";
import DynamicTable from "@/components/table/DynamicTable";

export default function HistorialCambiosMedicoPage() {
    const pathname = usePathname();
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [historialCambios, setHistorialCambios] = useState([]);
    const [query, setQuery] = useState("");

    const handleMedicoSelect = async (medico) => {
        setSelectedMedico(medico);

        if (medico?.identificacion) {
            await fetchHistorialMedico(medico.identificacion, setHistorialCambios);
        } else {
            setHistorialCambios([]);
        }
    };

    const buttons = [
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", href: "/admin-dashboard/medico/actualizar-medico" },
        { label: "Buscar Médico", icon: FaSearch, action: "buscar", href: "/admin-dashboard/medico/consultar-medico" }, // <- coma agregada aquí
        { label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico", href: "/admin-dashboard/medico/registrar-medico" },
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
                title="Historial de Cambios del Médico"
                buttons={buttons}
                onAction={(action) => {
                    console.log("Acción del navbar:", action);
                }}
            />

            <div className="flex justify-center bg-white py-4 border-b border-gray-100">
                <div className="w-full max-w-4xl px-4">
                    <Search
                        query={query}
                        setQuery={setQuery}
                        onBuscarClick={() => handleMedicoSelect({ identificacion: query })}
                    />
                </div>
            </div>

            {selectedMedico && (
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
                                No hay historial de cambios disponible para este médico.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

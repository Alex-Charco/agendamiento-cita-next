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
    const [historialCambios, setHistorialCambios] = useState({
	  datos_medico: null,
	  historial: [],
	});

    const [query, setQuery] = useState("");

    const handleMedicoSelect = async (medico) => {
	  setSelectedMedico(medico);

	  if (medico?.identificacion) {
		await fetchHistorialMedico(medico.identificacion, setHistorialCambios);
	  } else {
		setHistorialCambios({
		  datos_medico: null,
		  historial: [],
		});
	  }
	};

    const buttons = [
        { label: "Actualizar Médico", icon: FaSyncAlt, action: "actualizar-medico", href: "/admin-dashboard/medico/actualizar-medico" },
        { label: "Buscar Médico", icon: FaSearch, action: "buscar", href: "/admin-dashboard/medico/consultar-medico" }, // <- coma agregada aquí
        { label: "Nuevo Médico", icon: FaPlus, action: "nuevo-medico", href: "/admin-dashboard/medico/registrar-medico" },
        ...getCommonButtonsByPath(pathname),
    ];
	
	const renderDatosMedico = () => {
	  const m = historialCambios.datos_medico;
	  if (!m) return null;

	  return (
		<div className="relative w-full border rounded-lg p-3 bg-white">
		  <div className="absolute bg-white -top-2 left-4 px-2 text-[11px] text-blue-800 font-bold">
			Datos Médico
		  </div>
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
			<p>
			  <span className="font-semibold">Nombre:</span>{" "}
			  {[m.primer_nombre, m.segundo_nombre, m.primer_apellido, m.segundo_apellido]
				.filter(Boolean)
				.join(" ")}
			</p>
			<p><span className="font-semibold">Identificación:</span> {m.identificacion}</p>
			<p><span className="font-semibold">Celular:</span> {m.celular}</p>
			<p><span className="font-semibold">Correo:</span> {m.correo}</p>
		  </div>
		</div>
	  );
	};

    const tableColumns = [
        {
            uid: "fecha_cambio",
            name: "Fecha",
            render: (item) => new Date(item.fecha_cambio).toLocaleString(),
        },
        { uid: "campo_modificado", name: "Campo Modificado" },
        { uid: "valor_anterior", name: "Valor Anterior" },
        { uid: "valor_nuevo", name: "Valor Nuevo" },
		{
			uid: "realizado_por",
			name: "Realizado por",
			render: (item) => item.realizado_por || "Desconocido",
		  },
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
                    <div className="flex flex-col w-full mx-2 gap-4 border rounded-xl shadow-lg p-6 bg-white">
                        {renderDatosMedico()}
						{historialCambios.historial.length > 0 ? (
						  <DynamicTable
							columns={tableColumns}
							data={historialCambios.historial}
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

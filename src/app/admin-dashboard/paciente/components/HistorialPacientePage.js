"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaPlus, FaSyncAlt, FaSearch } from "react-icons/fa";

import NavbarComponent from "@/components/navbars/NavbarComponent";
import Search from "@/components/Search";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import DynamicTable from "@/components/table/DynamicTable";
import CustomTabs from "@/components/CustomTabs";
import { fetchHistorialPaciente } from "@/utils/api";

export default function HistorialCambiosPacientePage() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [historialCambios, setHistorialCambios] = useState({
    paciente: [],
    familiar: [],
    info_militar: [],
    residencia: [],
    seguro: [],
	datos_paciente: null
  });

  const handleBuscar = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const historial = await fetchHistorialPaciente(query);
      
      if (historial) {
        setHistorialCambios({
          paciente: historial.paciente || [],
          familiar: historial.familiares || [],
          info_militar: historial.info_militar || [],
          residencia: historial.residencia || [],
          seguro: historial.seguro || [],
		  datos_paciente: historial.datos_paciente || null
        });
        setSelectedPaciente(query);
      } else {
        limpiarEstadoConError("No se encontró historial para ese paciente.");
      }
    } catch (err) {
		console.error("Error al buscar historial del paciente:", err);
      limpiarEstadoConError("No se encontró el paciente o ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  const limpiarEstadoConError = (mensaje) => {
    setHistorialCambios({
      paciente: [],
      familiar: [],
      info_militar: [],
      residencia: [],
      seguro: [],
    });
    setSelectedPaciente(null);
    setError(mensaje);
  };

  const buttons = [
    { label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", href: "/admin-dashboard/paciente/actualizar-paciente" },
    { label: "Buscar Paciente", icon: FaSearch, action: "buscar-paciente", href: "/admin-dashboard/paciente/consultar-paciente" },
    { label: "Nuevo Paciente", icon: FaPlus, action: "nuevo-paciente", href: "/admin-dashboard/paciente/registrar-paciente" },
    ...getCommonButtonsByPath(pathname),
  ];

  const tableColumns = [
    {
      uid: "fecha_cambio",
      name: "Fecha",
      render: (item) => new Date(item.fecha_cambio).toLocaleString(),
    },
    { uid: "campo_modificado", name: "Campo Modificado" },
    {
		uid: "valor_anterior",
		name: "Valor Anterior",
		render: (item) =>
		  typeof item.valor_anterior === "object" && item.valor_anterior !== null
			? JSON.stringify(item.valor_anterior, null, 2)
			: item.valor_anterior ?? "—"
	  },
	  {
		uid: "valor_nuevo",
		name: "Valor Nuevo",
		render: (item) =>
		  typeof item.valor_nuevo === "object" && item.valor_nuevo !== null
			? JSON.stringify(item.valor_nuevo, null, 2)
			: item.valor_nuevo ?? "—"
	  },
	{
		uid: "realizado_por",
		name: "Realizado por",
		render: (item) => item.realizado_por || "Desconocido",
	  }
  ];

  const tabItems = [
    { key: "paciente", title: "Datos del Paciente", data: historialCambios.paciente },
    { key: "familiar", title: "Familiar", data: historialCambios.familiar },
    { key: "info_militar", title: "Info Militar", data: historialCambios.info_militar },
    { key: "residencia", title: "Residencia", data: historialCambios.residencia },
    { key: "seguro", title: "Seguro", data: historialCambios.seguro },
  ];
  
	  const renderDatosPaciente = () => {
	  const p = historialCambios.datos_paciente;
	  if (!p) return null;

	  return (
		<div className="relative w-full border rounded-lg p-3 bg-white">
                        <div className="absolute bg-white -top-2 left-4 px-2 text-[11px] text-blue-800 font-bold">
                            Datos Paciente
                        </div>
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
			<p>
			  <span className="font-semibold">Nombre:</span>{" "}
			  {[p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido].filter(Boolean).join(" ")}
			</p>
			<p><span className="font-semibold">Identificación:</span> {p.identificacion}</p>
			<p><span className="font-semibold">Celular:</span> {p.celular}</p>
			<p><span className="font-semibold">Correo:</span> {p.correo}</p>
		  </div>
		</div>
	  );
	};


  return (
    <>
      <NavbarComponent
        title="Historial de Cambios del Paciente"
        buttons={buttons}
        onAction={(action) => console.log("Acción del navbar:", action)}
      />

      <div className="flex justify-center bg-white py-4 border-b border-gray-100">
        <div className="w-full max-w-4xl px-4">
          <Search
            query={query}
            setQuery={setQuery}
            onBuscarClick={handleBuscar}
            loading={loading}
            error={error}
            label="Buscar paciente"
            placeholder="Ingrese número de identificación..."
            inputClassName="bg-gray-50"
            buttonClassName="bg-blue-600 text-white hover:bg-blue-700"
          />
        </div>
      </div>

      {selectedPaciente && (
        <div className="flex justify-center py-8">
          <div className="flex flex-col w-full mx-2 gap-4 border rounded-xl shadow-lg p-6 bg-white">
            {renderDatosPaciente()}
			<CustomTabs
              tabs={tabItems.map((tab) => ({
                key: tab.key,
                title: tab.title,
                content: tab.data.length > 0 ? (
                  <DynamicTable
                    columns={tableColumns}
                    data={tab.data}
                    rowsPerPage={5}
                    filterPlaceholder={`Buscar en ${tab.title.toLowerCase()}...`}
                    actionLabel={null}
                    actionRoute=""
                  />
                ) : (
                  <p className="text-gray-600">No hay cambios registrados en {tab.title.toLowerCase()}.</p>
                ),
              }))}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import authAxios from "@/utils/api/authAxios";
import DetalleDatosPaciente from "@/medico-dashboard/nota-evolutiva/components/DetalleDatosPaciente";
import { FaArrowLeft, FaSearch, FaFilePdf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DynamicTable from "@/components/table/DynamicTable";

export default function NotaEvolutivaDetallePage() {
  const [paciente, setPaciente] = useState(null);
  const [notaDetalle, setNotaDetalle] = useState(null);
  const [error, setError] = useState(null);
  const [idNota, setIdNota] = useState(null);
  const [idCita, setIdCita] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = JSON.parse(sessionStorage.getItem("notaDetalleParams"));
      if (params) {
        setIdNota(params.idNota);
        setIdCita(params.idCita);
      } else {
        setError("No se encontraron los parámetros de navegación.");
      }
    }
  }, []);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responsePaciente = await authAxios.get(`/api/paciente/get/detalle-por-cita/${idCita}`);
        setPaciente(responsePaciente.data.paciente);

        const responseNota = await authAxios.get(`/api/nota-evolutiva/get/nota/${idNota}`);
        setNotaDetalle(responseNota.data.data);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron obtener los datos.");
      }
    };

    if (idNota && idCita) {
      fetchDatos();
    }
  }, [idNota, idCita]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!paciente || !notaDetalle) return <p className="text-center text-gray-500">Cargando datos...</p>;

  const buttons = [
    { label: "Regresar", icon: FaArrowLeft, action: "regresar", href: "/medico-dashboard/nota-evolutiva" },
    ...getCommonButtonsByPath(pathname)
  ];

  const diagnosticoColumns = [
    { name: "Condición", uid: "condicion" },
    { name: "Tipo", uid: "tipo" },
    { name: "CIE-10", uid: "cie_10" },
    { name: "Descripción", uid: "descripcion" },
    {
      name: "Acción",
      uid: "accion",
      render: (item) => (
        // Dentro del render:
        <button
          onClick={() => setExpanded(expanded === item.id_diagnostico ? null : item.id_diagnostico)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs shadow hover:bg-blue-700 transition-all"
        >
          {expanded === item.id_diagnostico ? (
            <>
              <FaSearch className="inline mr-[2px]" /> Ocultar <FaChevronUp className="inline ml-[2px]" />
            </>
          ) : (
            <>
              <FaSearch className="inline mr-[2px]" /> Ver Procedimiento <FaChevronDown className="inline ml-[2px]" />
            </>
          )}
        </button>
      ),
    },
  ];

  const diagnosticoData = notaDetalle.Diagnosticos.map((diag) => ({
    ...diag,
    id_diagnostico: diag.id_diagnostico,
    condicion: diag.condicion,
    tipo: diag.tipo,
    cie_10: diag.cie_10,
    descripcion: diag.descripcion,
  }));

  return (
    <div className="bg-gray-50 min-h-screen border">
      <NavbarComponent title="Detalle de la Nota Evolución" buttons={buttons} />
      <div className="flex flex-col justify-center py-2 w-full">
        <div className="w-full relative border rounded-lg p-3 bg-white mx-2">
          <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
            Información de la Nota de Evolución
          </div>

          <DetalleDatosPaciente paciente={paciente} />

          {/* Signos Vitales */}
          {notaDetalle.signoVital && (
            <div className="relative w-full border rounded-lg p-3 bg-white mt-4">
              <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                Signos Vitales
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm text-gray-700">
                <div>
                  <strong>Presión Arterial:</strong> {notaDetalle.signoVital.presion_arterial_sistolica} / {notaDetalle.signoVital.presion_arterial_diastolica} mmHg
                </div>
                <div>
                  <strong>Frecuencia Cardíaca:</strong> {notaDetalle.signoVital.frecuencia_cardiaca} lpm
                </div>
                <div>
                  <strong>Frecuencia Respiratoria:</strong> {notaDetalle.signoVital.frecuencia_respiratoria} rpm
                </div>
                <div>
                  <strong>Temperatura:</strong> {notaDetalle.signoVital.temperatura} °C
                </div>
                <div>
                  <strong>Saturación de Oxígeno:</strong> {notaDetalle.signoVital.saturacion_oxigeno} %
                </div>
                <div>
                  <strong>Peso:</strong> {notaDetalle.signoVital.peso} kg
                </div>
                <div>
                  <strong>Talla:</strong> {notaDetalle.signoVital.talla} m
                </div>
                <div>
                  <strong>Observaciones:</strong> {notaDetalle.signoVital.observaciones || "Sin observaciones."}
                </div>
              </div>
            </div>
          )}

          {/* Tabla Diagnósticos */}
          <div className="relative w-full border rounded-lg p-3 bg-white mt-4">
            <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
              Diagnósticos
            </div>

            <DynamicTable columns={diagnosticoColumns} data={diagnosticoData} pagination={false} />

            {/* Aquí mostramos debajo de la tabla el detalle si está expandido */}
            {notaDetalle.Diagnosticos.map((diag) => (
              expanded === diag.id_diagnostico && (
                <div key={`proc-${diag.id_diagnostico}`} className="mt-4">
                  <div className="relative w-full border rounded-lg p-3 bg-white mt-4">
                    <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                      Procedimientos
                    </div>
                    {diag.Procedimientos?.length > 0 ? (
                      <DynamicTable
                        columns={[
                          { name: "Código", uid: "codigo" },
                          { name: "Descripción", uid: "descripcion_proc" }
                        ]}
                        data={diag.Procedimientos.map((proc) => ({
                          codigo: proc.codigo,
                          descripcion_proc: proc.descripcion_proc
                        }))}
                        pagination={false}
                      />
                    ) : (
                      <div className="text-sm text-gray-500 italic">No existen procedimientos para este diagnóstico.</div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Archivos */}
          {notaDetalle.links?.length > 0 && (
            <div className="relative w-full border rounded-lg p-3 bg-white mt-4">
              <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                Documentos Adjuntos
              </div>

              <DynamicTable
                columns={[
                  { name: "Categoría", uid: "categoria" },
                  { name: "Nombre del Documento", uid: "nombre_documento" },
                  { name: "Descripción", uid: "descripcion" },
                  {
                    name: "Archivo",
                    uid: "archivo",
                    render: (item) => (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 text-xl flex items-center justify-center"
                        title={item.nombre_documento}
                      >
                        <FaFilePdf />
                      </a>
                    ),
                  },
                ]}
                data={notaDetalle.links.map((link) => ({
                  categoria: link.categoria,
                  nombre_documento: link.nombre_documento,
                  descripcion: link.descripcion,
                  url: link.url,
                }))}
                pagination={false}
              />
            </div>
          )}



        </div>
      </div>
    </div>
  );
}

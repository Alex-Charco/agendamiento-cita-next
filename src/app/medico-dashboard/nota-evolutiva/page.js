"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import authAxios from "@/utils/api/authAxios";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { usePathname, useRouter } from "next/navigation";
import DetalleDatosPaciente from "@/medico-dashboard/nota-evolutiva/components/DetalleDatosPaciente";
import TablaNotasEvolutivas from "@/medico-dashboard/nota-evolutiva/components/TablaNotasEvolutivas";
import FormularioNotaEvolutiva from "@/medico-dashboard/nota-evolutiva/components/FormularioNotaEvolutiva";

export default function NotaEvolutivaPage() {
  const [paciente, setPaciente] = useState(null);
  const [notas, setNotas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Simulación de IDs
  const idCita = 40;
  const idPaciente = 19;
  const limit = 5;

  const [formNota, setFormNota] = useState({
    motivo_consulta: "",
    enfermedad: "",
    tratamiento: "",
    resultado_examen: "",
    decision_consulta: "",
    reporte_decision: "",
    diagnosticos: [],
    links: [],
	signos_vitales: {
    presion_arterial_sistolica: "",
    presion_arterial_diastolica: "",
    frecuencia_cardiaca: "",
    frecuencia_respiratoria: "",
    temperatura: "",
    saturacion_oxigeno: "",
    peso: "",
    talla: "",
    observaciones: ""
  }
  });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        if (!paciente) {
          const responsePaciente = await authAxios.get(`/api/paciente/get/detalle-por-cita/${idCita}`);
          setPaciente(responsePaciente.data.paciente);
        }

        const responseNotas = await authAxios.get(`/api/nota-evolutiva/get?id_paciente=${idPaciente}&page=${currentPage}&limit=${limit}`);
        setNotas(responseNotas.data.data);
        setTotalPages(responseNotas.data.pages);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("No se pudieron obtener los datos.");
      }
    };

    fetchDatos();
  }, [currentPage, paciente]);

  const handleVerDetalle = (nota) => {
    sessionStorage.setItem("notaDetalleParams", JSON.stringify({
      idNota: nota.id_nota_evolutiva,
      idCita,
      idPaciente
    }));
    router.push("/medico-dashboard/nota-evolutiva/detalle");
  };

  const guardarNotaEvolutiva = async () => {
    try {
      const payload = { id_cita: idCita, ...formNota };
      await authAxios.post("/api/nota-evolutiva/registrar", payload);
      alert("Nota evolutiva registrada correctamente");
      setFormNota({
        motivo_consulta: "",
        enfermedad: "",
        tratamiento: "",
        resultado_examen: "",
        decision_consulta: "",
        reporte_decision: "",
        diagnosticos: [],
        links: []
      });
      setCurrentPage(1);
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Error al registrar la nota.");
    }
  };

  const buttons = [...(getCommonButtonsByPath(pathname) || [])];

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarComponent title="Notas Evolutivas" buttons={buttons} />
      <div className="flex flex-col mx-2">
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        {paciente ? (
          <>
            <DetalleDatosPaciente paciente={paciente} />

            {/* Historial abajo de los datos del paciente */}
            <div>
              <TablaNotasEvolutivas
                paciente={paciente}
                notas={notas}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onVerDetalle={handleVerDetalle}
              />
            </div>

            {/* Registrar nueva nota evolutiva más abajo */}
            <div className="mt-4">
              <FormularioNotaEvolutiva
                formNota={formNota}
                setFormNota={setFormNota}
                onGuardar={guardarNotaEvolutiva}
              />
            </div>

          </>
        ) : (
          <p className="text-center text-gray-500">Cargando datos...</p>
        )}
      </div>
    </div>
  );
}

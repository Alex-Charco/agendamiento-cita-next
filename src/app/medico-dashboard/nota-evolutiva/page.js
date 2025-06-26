"use client";

import React, { useEffect, useState, useCallback } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import authAxios from "@/utils/api/authAxios";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { usePathname, useRouter } from "next/navigation";
import DetalleDatosPaciente from "@/medico-dashboard/nota-evolutiva/components/DetalleDatosPaciente";
import TablaNotasEvolutivas from "@/medico-dashboard/nota-evolutiva/components/TablaNotasEvolutivas";
import FormularioNotaEvolutiva from "@/medico-dashboard/nota-evolutiva/components/FormularioNotaEvolutiva";
import { mostrarToastExito, mostrarToastError } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import { FaArrowLeft } from "react-icons/fa";

// 🧠 Estado inicial extraído como constante reutilizable
const estadoInicialNota = {
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
};

export default function NotaEvolutivaPage() {
  const [paciente, setPaciente] = useState(null);
  const [notas, setNotas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const [idCita, setIdCita] = useState(null);
  const [idPaciente, setIdPaciente] = useState(null);
  const limit = 5;

  const [formNota, setFormNota] = useState(estadoInicialNota);

  useEffect(() => {
    const storedIdCita = sessionStorage.getItem("notaEvolutiva_id_cita");
    const storedIdPaciente = sessionStorage.getItem("notaEvolutiva_id_paciente");

    if (storedIdCita && storedIdPaciente) {
      setIdCita(Number(storedIdCita));
      setIdPaciente(Number(storedIdPaciente));
    } else {
      setError("No se encontró información de la cita o paciente en la sesión.");
    }
  }, []);

  // 🔁 Función para obtener datos (historial y paciente)
  const fetchDatos = useCallback(async () => {
    try {
      if (idCita && idPaciente) {
        if (!paciente) {
          const responsePaciente = await authAxios.get(`/api/paciente/get/detalle-por-cita/${idCita}`);
          setPaciente(responsePaciente.data.paciente);
        }
  
        const responseNotas = await authAxios.get(
          `/api/nota-evolutiva/get?id_paciente=${idPaciente}&page=${currentPage}&limit=${limit}`
        );
        setNotas(responseNotas.data.data);
        setTotalPages(responseNotas.data.pages);
      }
    } catch (err) {
      console.error("Error al obtener datos:", err);
      setError("No se pudieron obtener los datos.");
    }
  }, [idCita, idPaciente, currentPage, paciente]); // <-- dependencias necesarias
  

  // Cargar datos cuando se tenga idCita y idPaciente
  useEffect(() => {
    fetchDatos();
  }, [fetchDatos]);
  

  const handleVerDetalle = (nota) => {
    sessionStorage.setItem("notaDetalleParams", JSON.stringify({
      idNota: nota.id_nota_evolutiva,
      idCita,
      idPaciente
    }));
    router.push("/medico-dashboard/nota-evolutiva/detalle");
  };

  const guardarNotaEvolutiva = async () => {
    const confirmado = await confirmarRegistro("¿Deseas registrar esta nota evolutiva?");
    if (!confirmado) return;

    try {
      const payload = { id_cita: idCita, ...formNota };
      await authAxios.post("/api/nota-evolutiva/registrar", payload);

      mostrarToastExito("Nota evolutiva registrada correctamente");

      setFormNota(estadoInicialNota);
      setCurrentPage(1);

      // 🔄 Recargar historial y datos actualizados
      await fetchDatos();
    } catch (err) {
      mostrarToastError(err, "Error al registrar la nota evolutiva");
    }
  };

  const buttons = [
    { label: "Regresar", icon: FaArrowLeft, action: "regresar", href: "/medico-dashboard/cita/consultar-cita-medico" },
    ...(getCommonButtonsByPath(pathname) || [])];

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

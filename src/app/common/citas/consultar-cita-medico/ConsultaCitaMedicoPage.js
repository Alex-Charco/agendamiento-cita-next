"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import MedicoDetalleCita from "@/common/citas/components/MedicoDetalleCita";
import TablaCitasMedico from "@/common/citas/components/TablaCitasMedico";
import { FaPlus } from "react-icons/fa";
import authAxios from "@/utils/api/authAxios";

export default function ConsultaCitaMedicoPage() {
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCitasAutomaticamente = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      try {
        const parsedUser = JSON.parse(storedUser);
        const id = parsedUser?.identificacion;
        if (!id) return;

        const response = await authAxios.get(`/api/cita/get/medico/${id}?desdeHoy=true`);
        console.log("Citas response:", response);
        setSelectedMedico(response.data);
      } catch (err) {
        console.error("Error al obtener citas automáticamente:", err);
        setError("No se pudieron obtener las citas. Inténtalo de nuevo.");
      }
    };

    fetchCitasAutomaticamente();
  }, []);

  const transformarCitasParaTabla = (citas) => {
    return citas.map((cita) => ({
      nombre: cita.paciente?.nombre || "",
      identificacion: cita.paciente?.identificacion || "",
      correo: cita.paciente?.correo || "",
      fecha_turno: cita.turno?.horario?.fecha_horario || "",
      hora_turno: cita.turno?.hora_turno || "",
      numero_turno: cita.turno?.id_turno || "",
      fecha_creacion: cita.fecha_creacion || "",
      estado: cita.estado_cita || "",
    }));
  };

  const buttons = [
    {
      label: "Nueva Cita",
      icon: FaPlus,
      action: "nueva-cita",
      href: "/admin-dashboard/cita/nueva-cita",
    },
    ...getCommonButtonsByPath(pathname),
  ];

  return (
    <div className="bg-gray-50 border border-gray-200 min-h-screen">
      <NavbarComponent title="Buscar Cita Médico" buttons={buttons} />

      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">
          <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
            Citas Médico
          </div>

          {error && (
            <p className="text-center text-red-500 mt-4">{error}</p>
          )}

          {selectedMedico?.medico ? (
            <>
              <MedicoDetalleCita
                medico={selectedMedico.medico}
                mostrarCampos={[
                  "nombre",
                  "identificacion",
                  "especialidad",
                  "correo",
                ]}
              />

              <TablaCitasMedico
                citas={transformarCitasParaTabla(selectedMedico.citas)}
                onVerCita={(cita) => console.log("Ver cita", cita)}
                onEditarCita={(cita) => console.log("Editar cita", cita)}
              />
            </>
          ) : (
            !error && (
              <p className="text-center text-gray-500 mt-4">
                Cargando citas del médico...
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

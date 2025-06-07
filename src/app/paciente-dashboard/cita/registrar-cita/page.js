"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import authAxios from "@/utils/api/authAxios";
import TablaTurnosCita from "@/common/citas/components/TablaTurnosCita";
import { useDisclosure } from "@heroui/react";
import ModalRegistrarCita from "@/common/citas/components/ModalRegistrarCita";

export default function RegistrarCitaPage() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();

  const fetchTurnos = async () => {
    try {
      setLoading(true);
      const res = await authAxios.get("/api/turno/get/disponibles");
      setTurnos(res.data);
    } catch (error) {
      console.error("❌ Error al obtener turnos:", error.response?.data || error.message);
      setError("No se pudieron cargar los turnos disponibles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const buttons = [...getCommonButtonsByPath(pathname)];

  return (
    <div className="bg-gray-50 border-1 border-gray-200 min-h-screen">
      <NavbarComponent title="Registrar Cita" buttons={buttons} />

      <div className="flex justify-center py-2">
        <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 mx-2 text-center">

          {loading ? (
            <p className="text-gray-600 py-4">Cargando turnos...</p>
          ) : error ? (
            <p className="text-red-600 py-4">{error}</p>
          ) : turnos.length === 0 ? (
            <p className="text-gray-500 py-4">No hay turnos disponibles actualmente.</p>
          ) : (
            <TablaTurnosCita
              turnos={turnos}
              onSeleccionarTurno={(turno) => {
                setTurnoSeleccionado(turno);
                onOpen(); // Abrir modal
              }}
            />
          )}
        </div>
      </div>

      {/* ✅ Modal */}
      {turnoSeleccionado && (
        <ModalRegistrarCita
          turno={turnoSeleccionado}
          isOpen={isOpen}
          onClose={onOpenChange}
          onCitaRegistrada={() => {
            fetchTurnos(); // 👈 recargar los turnos disponibles
          }}
        />
      )}
    </div>
  );
}

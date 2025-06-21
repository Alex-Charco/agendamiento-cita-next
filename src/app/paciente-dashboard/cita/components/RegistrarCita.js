"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import authAxios from "@/utils/api/authAxios";
import TablaTurnosCita from "@/common/citas/components/TablaTurnosCita";
import { useDisclosure } from "@heroui/react";
import ModalRegistrarCita from "@/common/citas/components/ModalRegistrarCita";
import { FaSearch } from "react-icons/fa";

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
      const data = res.data.turnos;
      console.log("📦 Respuesta completa:", res.data);


      // Validar que data sea un array antes de setearlo
      if (Array.isArray(data)) {
        setTurnos(data);
      } else {
        console.error("❌ La respuesta no es un arreglo:", data);
        setTurnos([]); // fallback vacío
      }

    } catch (error) {
      console.error("❌ Error al obtener turnos:", error.response?.data || error.message);
      setError("No se pudieron cargar los turnos disponibles.");
      setTurnos([]); // fallback vacío
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurnos();
  }, []);

  const buttons = [
	{ label: "Buscar Cita", icon: FaSearch, action: "buscar-cita", href: "/paciente-dashboard/cita/consultar-cita" },
	...getCommonButtonsByPath(pathname)];

  return (
	  <div className="bg-gray-50 border-1 border-gray-200">
		<NavbarComponent title="Registrar Cita" buttons={buttons} />

		<div className="flex justify-center py-2">
			{(() => {
			  if (loading) {
				return <p className="text-gray-600 py-4">Cargando turnos...</p>;
			  }
			  if (error) {
				return <p className="text-red-600 py-4">{error}</p>;
			  }
			  if (turnos.length === 0) {
				return <p className="text-gray-500 py-4">No hay turnos disponibles actualmente.</p>;
			  }
			  return (
				<TablaTurnosCita
				  turnos={turnos}
				  onSeleccionarTurno={(turno) => {
					setTurnoSeleccionado(turno);
					onOpen();
				  }}
				/>
			  );
			})()}
		</div>

		{turnoSeleccionado && (
		  <ModalRegistrarCita
			turno={turnoSeleccionado}
			isOpen={isOpen}
			onClose={onOpenChange}
			onCitaRegistrada={fetchTurnos}
		  />
		)}
	  </div>
	);
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { FaCalendarPlus } from "react-icons/fa";
import authAxios from "@/utils/api/authAxios";
import TablaTurnosCita from "@/common/citas/components/TablaTurnosCita";

export default function RegistrarCitaPage() {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const res = await authAxios.get("/api/turno/get/disponibles");
                console.log("📦 Turnos recibidos:", res.data);
                setTurnos(res.data);
            } catch (error) {
                console.error("❌ Error al obtener turnos:", error.response?.data || error.message);
                setError("No se pudieron cargar los turnos disponibles.");
            } finally {
                setLoading(false);
            }
        };

        fetchTurnos();
    }, []);

    const buttons = [
        {
            label: "Registrar Cita",
            icon: FaCalendarPlus,
            action: "registrar-cita",
            href: "/admin-dashboard/citas/registrar-cita",
        },
        ...getCommonButtonsByPath(pathname),
    ];

    return (
        <div className="bg-gray-50 border-1 border-gray-200 min-h-screen">
            <NavbarComponent title="Registrar Cita" buttons={buttons} />

            <div className="flex justify-center py-2">
                <div className="relative flex flex-col w-full border rounded shadow-lg p-4 bg-gray-50 mx-2 text-center">

                    {/* Título flotante */}
                    <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                        Turnos Disponibles
                    </div>

                    {loading ? (
                        <p className="text-gray-600 py-4">Cargando turnos...</p>
                    ) : error ? (
                        <p className="text-red-600 py-4">{error}</p>
                    ) : turnos.length === 0 ? (
                        <p className="text-gray-500 py-4">
                            No hay turnos disponibles actualmente.
                        </p>
                    ) : (
                        <TablaTurnosCita
                            turnos={turnos} // ✅ pasa el objeto completo
                            onSeleccionarTurno={(turno) => {
                                console.log("📌 Turno seleccionado:", turno);
                                // Aquí puedes redirigir o abrir modal, etc.
                                // Por ejemplo: router.push(`/ruta/${turno.id_turno}`);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

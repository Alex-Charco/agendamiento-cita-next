"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import PacienteDetalle from "@/common/citas/components/PacienteDetalle";
import TablaCitas from "@/common/citas/components/TablaCitas";
import { FaPlus } from "react-icons/fa";
import CitaSearch from "@/common/citas/components/CitaSearch";

export default function ConsultaCitaPage() {
    const [selectedCita, setSelectedCita] = useState(null);
    const [horarioSeleccionadoParaTurnos, setHorarioSeleccionadoParaTurnos] = useState(null);
    const pathname = usePathname();
    const router = useRouter();
	const [listaCitas, setListaCitas] = useState([]);

    const handleCitaSelect = (data) => {
		console.log("handleCitaSelect recibió:", data);
		if (data && data.paciente && Array.isArray(data.citas)) {
			setSelectedCita(data); // ✅ almacena todo el objeto
		}
	};

	console.log("selectedCita:", selectedCita);
	
	const transformarCitasParaTabla = (citas, nombrePaciente) => {
	  return citas.map((cita) => ({
		id_cita: cita.id_cita,
		nombre_medico: cita.medico.nombre,
		especialidad: cita.medico.especialidad.nombre,
		tipo_atencion: cita.medico.especialidad.atencion,
		consultorio: cita.medico.especialidad.consultorio,
		fecha_turno: cita.turno.horario.fecha_horario,
		hora_turno: cita.turno.hora_turno,
		numero_turno: cita.turno.id_turno,
		usuario: nombrePaciente,
		fecha_creacion: cita.fecha_creacion,
		estado: cita.estado_cita,
	  }));
	};


    const buttons = [
        {
            label: "Nueva Cita",
            icon: FaPlus,
            action: "nueva-cita",
            href: "/admin-dashboard/cita/nueva-cita"
        },
        ...getCommonButtonsByPath(pathname),
    ];

    return (
        <div className="bg-gray-50 border border-gray-200 min-h-screen">
            <NavbarComponent title="Consultar Cita" buttons={buttons} />

            <div className="flex justify-center py-2">
                <div className="relative flex flex-col w-full max-w-5xl border rounded shadow-lg p-4 bg-gray-50 mx-2">

                    <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
                        Citas
                    </div>

                    {/* Aquí puedes reemplazar rol e identificación por valores reales */}
                    <CitaSearch onSelectCita={handleCitaSelect} />

                    {selectedCita?.paciente ? (
					  <>
						<PacienteDetalle
						  paciente={selectedCita.paciente}
						  mostrarCampos={["nombre", "identificacion", "nombre_usuario", "correo"]}
						/>

						<TablaCitas
						  citas={transformarCitasParaTabla(selectedCita.citas, selectedCita.paciente.nombre)}
						  onVerCita={(cita) => console.log("Ver cita", cita)}
						  onEditarCita={(cita) => console.log("Editar cita", cita)}
						/>
					  </>
					) : (
					  <p className="text-center text-gray-500 mt-4">
						Selecciona un paciente para ver sus citas.
					  </p>
					)}

                </div>
            </div>
        </div>
    );
}

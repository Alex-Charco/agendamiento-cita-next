"use client";

import { FaTimes, FaSearch, FaPlus, FaCalendarAlt, FaSave } from 'react-icons/fa';
import PacienteSearch from "@/admin-dashboard/paciente/components/PacienteSearch";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";

export default function ConsultaPacientePage() {
  const buttons = [
    { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
    { label: "Buscar", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
    { label: "+Nuevo", icon: FaPlus, action: "nuevo", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
    { label: "Nuevo Turno", icon: FaCalendarAlt, action: "nuevo-turno", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" },
    { label: "Guardar", icon: FaSave, action: "guardar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-300 hover:text-gray-700" }
];

  return (
    <div>
      <NavbarComponent buttons={buttons} onAction={(action) => console.log(action)} />
      <PacienteSearch />
    </div>
  );
}

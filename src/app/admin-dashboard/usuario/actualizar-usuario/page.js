"use client";
import { useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes, FaSignOutAlt } from "react-icons/fa";
import NavbarComponent from "@/admin-dashboard/paciente/components/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import ReusableModal from "@/components/ReusableModal";
import { useDisclosure } from "@heroui/react";

export default function ActualizarUsuarioPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState("datos-generales");



  const handleUsuarioSelect = (usuario) => {
    const datosMapeados = {
      nombre_usuario: usuario.nombre_usuario,
      estatus: usuario.estatus ?? "", // ← viene dentro de `rol`
      nombre_rol: usuario.rol?.nombre_rol ?? "", // ← también dentro de `rol`
    };
    console.log("🧾 Usuario seleccionado:", usuario);

    setSelectedUsuario(datosMapeados);
    onOpenChange(false);
  };

  const buttons = [
    { label: "Buscar Usuario", icon: FaSearch, action: "buscar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", onClick: onOpen },
    { label: "Cancelar", icon: FaTimes, action: "cancelar", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/admin-dashboard" },
    { label: "Salir", icon: FaSignOutAlt, action: "salir", color: "bg-gray-400", textColor: "text-black", hoverEffect: "hover:bg-gray-200 hover:text-gray-700", href: "/auth/login" },
  ];

  const tabsConfig = [
    {
      key: "actualizar-usuario",
      title: "Usuario",
      content: (
        <ActualizarEstatusUsuario estatusUsuarioData={selectedUsuario} />
      ),
    },
  ];


  return (
    <div className="bg-white">
      <NavbarComponent title="Actualizar Usuario" buttons={buttons} onAction={(action) => {
        if (action === "buscar") onOpen();
        else console.log(action);
      }} />
	  
	  <UsuarioSearch onSelectUsuario={handleUsuarioSelect} />

      <CustomTabs tabs={tabsConfig} />

      <ReusableModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UsuarioSearch onSelectUsuario={handleUsuarioSelect} />
      </ReusableModal>

	  
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaSearch, FaSyncAlt, FaHistory } from "react-icons/fa";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import CustomTabs from "@/components/CustomTabs";
import FormWrapper from "@/components/FormWrapper";
import {
  RegistrarPaciente,
  RegistrarFamiliar,
  RegistrarInfoMilitar,
} from "@/utils/api";
import RegistrarUsuario from "@/admin-dashboard/usuario/components/RegistrarUsuario";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";
import InfoMilitarForm from "@/admin-dashboard/paciente/components/InfoMilitarForm";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";
import RegistrarSeguro from "@/admin-dashboard/paciente/components/RegistrarSeguro";
import { useClearLocalStorage } from "@/hooks/useClearLocalStorage";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import Swal from "sweetalert2";
import { confirmarRegistro } from "@/utils/confirmacion";

export default function RegistrarPacientePage() {
  const [selectedUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);
  const pathname = usePathname();

  useClearLocalStorage(["identificacion", "nombre_usuario"]);

  const handlePacienteSelect = async (data) => {
	  const confirmado = await confirmarRegistro("¿Deseas guardar los datos del paciente?");
	  if (!confirmado) {
		Swal.fire("Cancelado", "El paciente no fue registrado.", "info");
		return;
	  }

	  try {
		await RegistrarPaciente(data, setMensaje, setSuccess);
	  } catch (error) {
		console.error("Error al registrar paciente:", error);
		setMensaje(`Error: ${error.response?.data?.message || error.message}`);
	  }
	};

  const handleFamiliarSubmit = async (data) => {
	  const confirmado = await confirmarRegistro("¿Deseas guardar los datos del familiar?");
	  if (!confirmado) {
		Swal.fire("Cancelado", "El familiar no fue registrado.", "info");
		return;
	  }

	  const familiarData = {
		...data,
		identificacion_paciente: data.identificacion_paciente || data.identificacion,
	  };

	  try {
		await RegistrarFamiliar(familiarData, setMensaje, setSuccess);
	  } catch (error) {
		console.error("Error al registrar familiar:", error);
		setMensaje(`Error: ${error.response?.data?.message || error.message}`);
	  }
	};

  const handleInfoMilitarSubmit = async (data) => {
	  const confirmado = await confirmarRegistro("¿Deseas guardar la información militar?");
	  if (!confirmado) {
		Swal.fire("Cancelado", "La información militar no fue registrada.", "info");
		return;
	  }

	  try {
		await RegistrarInfoMilitar(data, setMensaje, setSuccess);
	  } catch (error) {
		console.error("Error al registrar info militar:", error);
		setMensaje(`Error: ${error.response?.data?.message || error.message}`);
	  }
	};

  const handleResidenciaSubmit = async () => {
    const confirmado = await confirmarRegistro("¿Deseas guardar la residencia?");
    if (!confirmado) return;
  };

  const handleSeguroSubmit = async () => {
    const confirmado = await confirmarRegistro("¿Deseas guardar el seguro?");
    if (!confirmado) return;
  };

  const buttons = [
	{ label: "Actualizar Paciente", icon: FaSyncAlt, action: "actualizar-paciente", href: "/admin-dashboard/paciente/actualizar-paciente" },
    { label: "Buscar Paciente", icon: FaSearch, action: "buscar-paciente", href: "/admin-dashboard/paciente/consultar-paciente" },
	{ label: "Historial", icon: FaHistory, action: "historial-paciente", href: "/admin-dashboard/paciente/historial-paciente" },
    ...getCommonButtonsByPath(pathname)
  ];

  const tabsConfig = [
    {
      key: "registrar-usuario",
      title: "1. Usuario",
      content: selectedUsuario ? <RegistrarUsuario usuario={selectedUsuario} /> : <RegistrarUsuario />,
    },
    {
      key: "registrar-paciente",
      title: "2. Paciente",
      content: (
        <FormWrapper mensaje={mensaje}>
          <PacienteForm onSubmit={handlePacienteSelect} isEditable={true} />
        </FormWrapper>
      ),
    },
    {
      key: "familiar",
      title: "3. Familiar",
      content: (
        <FormWrapper mensaje={mensaje}>
          <FamiliarForm onSubmit={handleFamiliarSubmit} />
        </FormWrapper>
      ),
    },
    {
      key: "informacion-militar",
      title: "4. Info Militar",
      content: (
        <FormWrapper mensaje={mensaje}>
          <InfoMilitarForm onSubmit={handleInfoMilitarSubmit} />
        </FormWrapper>
      ),
    },
    {
      key: "residencia",
      title: "5. Residencia",
      content: (
        <RegistrarResidencia onSubmit={handleResidenciaSubmit} />
      ),
    },
    {
      key: "seguro",
      title: "6. Seguro",
      content: (
        <RegistrarSeguro onSubmit={handleSeguroSubmit} />
      ),
    },
  ];

  return (
    <div className="bg-white">
      <NavbarComponent title="Registrar Paciente" buttons={buttons} />
      <CustomTabs tabs={tabsConfig} />
    </div>
  );
}

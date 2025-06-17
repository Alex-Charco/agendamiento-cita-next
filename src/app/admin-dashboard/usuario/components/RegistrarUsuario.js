"use client";

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UsuarioForm from "@/admin-dashboard/usuario/components/UsuarioForm";
import { registrarUsuarioApi } from "@/utils/api/registrarUsuarioApi";

export default function RegistrarUsuario() {
  const [mensaje, setMensaje] = useState("");

  const handleFormSubmit = async (data) => {
    await registrarUsuarioApi(data, setMensaje);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div>
        <UsuarioForm onSubmit={handleFormSubmit} />
        {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
      </div>
    </div>
  );
}

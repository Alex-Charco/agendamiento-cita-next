"use client";

import React, { useState } from "react";
import { Button, Input, Card, CardHeader, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./globals.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const password = data.password;

    if (!password) {
      setErrorMessage("Por favor, ingresa tu número de identificación.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { password });

      const { token, user, message } = response.data;

      if (message !== "Inicio de sesión exitoso") {
        setErrorMessage("Número de identificación incorrecto.");
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.ID_ROLE) {
        case 1:
          router.push("/admin-dashboard");
          break;
        case 2:
          router.push("/doctor-dashboard");
          break;
        case 3:
          router.push("/patient-dashboard");
          break;
        default:
          setErrorMessage("Rol no reconocido.");
      }
    } catch (error) {
      setErrorMessage("Error en la autenticación. Verifica tus datos.");
      console.error("Error al autenticar:", error);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.svg')" }}
    >
      {/* Fondo con opacidad */}
      <div className="absolute inset-0 bg-black bg-opacity-5"></div> {/* Ajusta la opacidad aquí */}

      {/* Contenido dentro del fondo */}
      <div className="relative z-10">

        <Card className="max-w-md w-full bg-gradient-to-b from-celeste-fuerte to-plomo-claro to-[#F5F7FC] bg-opacity-50"
          style={{
            border: '4px solid rgba(0, 56, 255, 0.3)', // Azul translúcido
            boxShadow: '0 4px 10px rgba(0, 56, 255, 0.5)', // Sombra suave
          }}>
          <CardHeader className="text-center p-0 mb-6">
            <div className="mb-0">
              <img src="/images/logo.png" alt="Logo" className="w-full h-auto" />
            </div>
          </CardHeader>

          <CardBody>
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {/* Contenedor de Usuario y Contraseña alineados */}
              <div className="flex flex-col gap-4">
                {/* Usuario */}
                <div className="flex items-center w-full">
                  <label className="text-sm text-gray-700 w-1/3 text-left" htmlFor="id_usuario">
                    Usuario: *
                  </label>
                  <Input
                    isRequired
                    id="id_usuario"
                    name="id_usuario"
                    placeholder="Ingresar el usuario"
                    className="w-full md:w-3/4"
                  />
                </div>

                {/* Contraseña */}
                <div className="flex items-center w-full">
                  <label className="text-sm text-gray-700 w-1/3 text-left" htmlFor="id_password">
                    Contraseña: *
                  </label>
                  <div className="relative w-full md:w-3/4">
                    <Input
                      isRequired
                      id="id_password"
                      name="id_password"
                      placeholder="Ingresar la contraseña"
                      type={isVisible ? "text" : "password"} // Cambia entre "text" y "password" dependiendo de isVisible
                      className="w-full"
                    />
                    <button
                      aria-label="toggle password visibility"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? <FaEye className="text-2xl text-gray-500" /> : <FaEyeSlash className="text-2xl text-gray-500" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botón */}
              <div className="flex flex-col justify-center w-full">
                <Button className="mx-auto w-1/3" type="submit" color="primary">
                  Ingresar
                </Button>
                <p className="flex justify-center text-xs text-gray-700 mt-2">
                  Olvidó la contraseña: Recuperar contraseña
                </p>
              </div>
            </form>

            {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
            {/* Texto pequeño debajo del login */}
            <p className="text-sm text-center font-bold text-blue-700 mt-4 border-t border-plomo-claro pt-2 w-full mx-0">
              Sistema de Gestión Hospitalaria
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

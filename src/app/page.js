"use client";

import React, { useState } from "react";
import { Button, Input, Card, CardHeader, CardBody, Form } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importamos los íconos de react-icons
import "./globals.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false); // Estado para controlar la visibilidad del password

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const password = data.password;

    if (!password) {
      setErrorMessage("Por favor, ingresa tu numéro de identificación.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { password });

      const { token, user, message } = response.data;

      if (message !== "Inicio de sesión exitoso") {
        setErrorMessage("Numéro de identificación incorrecta.");
        return;
      }

      // Guardamos tanto el token como el objeto de usuario en localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Token y datos del usuario guardados en localStorage:", { token, user }); // Depuración

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
      console.error("Error al autenticar:", error); // Depuración
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-lg font-medium text-center">Iniciar sesión</h1>
          <div className="w-full">
            <p className="text-sm text-gray-500 text-left">Accede con tu número de cédula o tarjeta militar</p>
          </div>
        </CardHeader>
        <CardBody>
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {/* Contenedor con el label pegado al borde del Input */}
            <div className="relative w-full">
              <label className="absolute text-sm text-gray-700 left-0 ml-2" htmlFor="id_card">
                Número de identificación
              </label>
              <Input
                isRequired
                id="id_card"
                name="id_card"
                placeholder="Ingresa tu número de identificación"
                type={isVisible ? "text" : "id_card"} // Cambiar el tipo según la visibilidad
                className="w-full mt-5"
              />
              <button
                aria-label="toggle id_card visibility"
                className="absolute right-3 top-1/2 transform -translate-y-1 focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FaEyeSlash className="text-2xl text-gray-500" />
                ) : (
                  <FaEye className="text-2xl text-gray-500" />
                )}
              </button>
            </div>

            {/* Contenedor para centrar el botón */}
            <div className="flex justify-center w-full">
              <Button className="mx-auto" type="submit" color="primary">
                Iniciar sesión
              </Button>
            </div>
          </Form>
          {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </CardBody>
      </Card>
    </div>
  );
}

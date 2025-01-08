"use client";

import React, { useState } from "react";
import { Button, Input, Card, CardHeader, CardBody, Form } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./globals.css";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const idCard = data.idCard;

    if (!idCard) {
      setErrorMessage("Por favor, ingresa tu ID_CARD.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { id_card: idCard });
      const { token, user, message } = response.data;

      if (message !== "Inicio de sesión exitoso") {
        setErrorMessage("ID_CARD incorrecto.");
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
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <Card className="max-w-md w-full">
        <CardHeader>
          <h1 className="text-lg font-medium">Iniciar sesión</h1>
          <p className="text-sm text-gray-500">Accede con tu ID_CARD</p>
        </CardHeader>
        <CardBody>
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input
              isRequired
              label="ID_CARD"
              name="idCard"
              placeholder="Ingresa tu ID_CARD"
              type="text"
            />
            <Button type="submit" color="primary">
              Iniciar sesión
            </Button>
          </Form>
          {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </CardBody>
      </Card>
    </div>
  );
}

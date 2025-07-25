"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { logout } from "@/utils/auth";
import Link from "next/link";
import { redirectByRole } from "@/utils/redirectByRole";
import { ROUTES } from "@/routes/index.routes";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState(null);
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [loginSuccess, setLoginSuccess] = useState(false);

    // UseEffect para detectar sesion expirada
    useEffect(() => {
        if (localStorage.getItem("expiredSession") === "true") {
            setErrorMessage("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            localStorage.removeItem("expiredSession");
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push(ROUTES.LOGIN);
    };

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        const nombre_usuario = data.nombre_usuario;
        const password = data.password;

        if (!nombre_usuario || !password) {
            setErrorMessage("Por favor, ingresa tu usuario y contraseña.");
            return;
        }
		
		// 🔐 Validación de longitud mínima de la contraseña
		if (password.length < 10) {
			setErrorMessage("La contraseña debe tener al menos 10 caracteres.");
			return;
		}

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                { nombre_usuario, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            const { token, user } = response.data;

            if (!token) {
                setErrorMessage("Usuario o contraseña incorrectos.");
                return;
            }

            // Guardar token y usuario
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            const decodedToken = jwtDecode(token);
            const timeUntilExpiration = (decodedToken.exp - Date.now() / 1000) * 1000;
            setTimeout(handleLogout, timeUntilExpiration);

            // Después de redirigir:
            setLoginSuccess(true);

            // Redirigir según el rol
            redirectByRole(user, router, setErrorMessage);

        } catch (error) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Error en la autenticación. Verifica tus datos.");
            }

            console.error(
                "Error en la petición:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div
            className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4 bg-gray-100"
            style={{ backgroundImage: "url('/images/background.svg')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>

            <div className="relative z-10 w-full max-w-md">
                <Card className="max-w-lg w-full bg-gradient-to-b from-celeste-fuerte to-[#F5F7FC] bg-opacity-50"
                    style={{
                        border: "4px solid rgba(0, 56, 255, 0.3)",
                        boxShadow: "0 4px 10px rgba(0, 56, 255, 0.5)",
                    }}
                >
                    <CardHeader className="text-center p-0 mb-6">
                        <div className="relative w-full h-[12rem]">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                fill
                                className="object-cover"
                                priority
								sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                    </CardHeader>
                    <CardBody>
                        <form className="flex flex-col gap-6" onSubmit={onSubmit} data-testid="login-form">
                            <div className="flex flex-col">
                                <div className="flex items-center w-full mb-4">
                                    <label
                                        className="text-sm text-gray-700 w-1/3 text-left"
                                        htmlFor="nombre_usuario"
                                    >
                                        Usuario: *
                                    </label>
                                    <Input
                                        isRequired
                                        id="nombre_usuario"
                                        name="nombre_usuario"
                                        placeholder="Ingresar el usuario"
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex items-center w-full">
                                    <label
                                        className="text-sm text-gray-700 w-1/3 text-left"
                                        htmlFor="password"
                                    >
                                        Contraseña: *
                                    </label>
                                    <div className="relative w-full">
                                        <Input
                                            isRequired
                                            id="password"
                                            name="password"
                                            placeholder="Ingresar la contraseña"
                                            type={isVisible ? "text" : "password"}
                                            className="w-full"
                                        />
                                        <button
                                            aria-label="toggle password visibility"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <FaEye className="text-2xl text-gray-500" />
                                            ) : (
                                                <FaEyeSlash className="text-2xl text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center w-full">
                                <Button className="mx-auto w-1/3" type="submit" color="primary">
                                    Ingresar
                                </Button>
                                <p className="flex justify-center text-xs text-gray-700 mt-2">
                                    ¿Olvidaste tu contraseña?:{" "}
                                    <Link href="/auth/reset-password" className="text-blue-600 hover:underline">
                                        Recuperar contraseña
                                    </Link>
                                </p>
                            </div>
                        </form>

                        {errorMessage && (
                            <div className="text-red-500 mt-2">{errorMessage}</div>
                        )}
                        {loginSuccess && (
                            <div className="text-green-600 mt-2 text-center">
                                Inicio de sesión exitoso. Redirigiendo...
                            </div>
                        )}
                        <p className="text-sm text-center font-bold text-blue-700 mt-4 border-t border-plomo-claro pt-2 w-full mx-0">
                            Sistema de Gestión Hospitalaria
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
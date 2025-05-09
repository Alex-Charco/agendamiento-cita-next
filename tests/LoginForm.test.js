import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";

// Mock de useRouter
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Silenciar console.error durante las pruebas
beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
});

test("muestra un mensaje de error si no se ingresan credenciales", async () => {
    // Mock del router
    const push = jest.fn();
    useRouter.mockReturnValue({
        push,
    });

    render(<LoginForm />);

    // Buscar el formulario por test ID y enviarlo vacío
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    // Esperar el mensaje de error
    const errorMessage = await screen.findByText(/Por favor, ingresa tu usuario y contraseña/i);
    expect(errorMessage).toBeInTheDocument();
});

//Prueba 2: Comprobar si se muestra un mensaje de error cuando las credenciales son incorrectas
test("muestra un mensaje de error si las credenciales son incorrectas", async () => {
    // Mock del router
    const push = jest.fn();
    useRouter.mockReturnValue({
        push,
    });

    // Mock de la llamada a la API para que falle la autenticación
    axios.post = jest.fn().mockRejectedValue({
        response: { data: { message: "Usuario o contraseña incorrectos." } },
    });

    render(<LoginForm />);

    // Llenar el formulario con datos incorrectos
    fireEvent.change(screen.getByLabelText(/Usuario:/), { target: { value: "usuario_incorrecto" } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/), { target: { value: "password_incorrecta" } });
    
    // Enviar el formulario
    const form = screen.getByTestId("login-form");
    fireEvent.submit(form);

    // Esperar y comprobar que el mensaje de error se muestra
    const errorMessage = await screen.findByText(/Usuario o contraseña incorrectos./);
    expect(errorMessage).toBeInTheDocument();
});


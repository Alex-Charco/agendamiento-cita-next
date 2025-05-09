import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";

// Mock de useRouter
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

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

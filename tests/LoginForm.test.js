import React from "react";
import { render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";


// Mock de useRouter
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Silenciar console.error durante las pruebas
beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterEach(() => {
    jest.restoreAllMocks();
});
// * Prueba 1: Validación de campos vacíos
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

// *Prueba 2: Comprobar si se muestra un mensaje de error cuando las credenciales son incorrectas
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

// * Prueba 3: Comprobar si la contraseña es visible cuando el ícono de visibilidad está activado
test("la contraseña es visible cuando el ícono de visibilidad está activado", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/Contraseña:/);
    const toggleVisibilityButton = screen.getByRole("button", { name: /toggle password visibility/i });

    // Asegurarse de que la contraseña esté inicialmente oculta
    expect(passwordInput.type).toBe("password");

    // Hacer clic en el botón para mostrar la contraseña
    fireEvent.click(toggleVisibilityButton);

    // Comprobar que la contraseña ahora es visible
    expect(passwordInput.type).toBe("text");

    // Hacer clic nuevamente para ocultar la contraseña
    fireEvent.click(toggleVisibilityButton);

    // Comprobar que la contraseña vuelve a estar oculta
    expect(passwordInput.type).toBe("password");
});

// * Prueba 4: Verificar si la autenticación redirige correctamente según el rol

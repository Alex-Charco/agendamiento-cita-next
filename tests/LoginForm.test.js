import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

jest.mock("axios");

// Silenciar console.error durante las pruebas
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    localStorage.clear(); // limpiar localStorage antes de cada test
});

// Silenciar console.error durante las pruebas
beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("LoginForm", () => {
    // * Prueba 1: Validación de campos vacíos
    test("muestra un mensaje de error si no se ingresan credenciales", async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ push });

        render(<LoginForm />);

        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        const errorMessage = await screen.findByText(/Por favor, ingresa tu usuario y contraseña/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // * Prueba 2: Credenciales incorrectas
    test("muestra un mensaje de error si las credenciales son incorrectas", async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ push });

        axios.post.mockRejectedValue({
            response: { data: { message: "Usuario o contraseña incorrectos." } },
        });

        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/Usuario:/), { target: { value: "usuario_incorrecto" } });
        fireEvent.change(screen.getByLabelText(/Contraseña:/), { target: { value: "password_incorrecta" } });

        const form = screen.getByTestId("login-form");
        fireEvent.submit(form);

        const errorMessage = await screen.findByText(/Usuario o contraseña incorrectos./);
        expect(errorMessage).toBeInTheDocument();
    });

    // * Prueba 3: Mostrar/Ocultar contraseña
    test("la contraseña es visible cuando el ícono de visibilidad está activado", () => {
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText(/Contraseña:/);
        const toggleVisibilityButton = screen.getByRole("button", { name: /toggle password visibility/i });

        expect(passwordInput.type).toBe("password");

        fireEvent.click(toggleVisibilityButton);
        expect(passwordInput.type).toBe("text");

        fireEvent.click(toggleVisibilityButton);
        expect(passwordInput.type).toBe("password");
    });

    // * Prueba 4: Redirección por rol
    test("redirige correctamente según el rol del usuario después de autenticarse", async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ push });

        const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOnsiaWRfcm9sIjozLCJuYW1lIjoiQWRtaW4ifX0.signature';
        const fakeUser = {
            rol: { id_rol: 3 },
        };

        axios.post.mockResolvedValue({
            data: {
                token: fakeToken,
                user: fakeUser,
            },
        });

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText(/Ingresar el usuario/i), {
            target: { value: "admin" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingresar la contraseña/i), {
            target: { value: "Pasword123456" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

        await waitFor(() => {
            expect(push).toHaveBeenCalledWith("/admin-dashboard");
        });
    });

    // * Prueba 5: para intentos fallidos
    test("muestra un mensaje de error cuando las credenciales son incorrectas", async () => {
        // Simulamos una respuesta de error del servidor
        axios.post = jest.fn().mockRejectedValue({
            response: {
                data: {
                    message: "Usuario o contraseña incorrectos."
                }
            }
        });

        render(<LoginForm />);

        // Simula el llenado del formulario con credenciales incorrectas
        const form = screen.getByTestId("login-form");
        const usuarioInput = screen.getByLabelText(/Usuario: \*/);
        const passwordInput = screen.getByLabelText(/Contraseña: \*/);

        fireEvent.change(usuarioInput, { target: { value: "usuario_incorrecto" } });
        fireEvent.change(passwordInput, { target: { value: "contraseña_incorrecta" } });

        fireEvent.submit(form);

        // Esperar que el mensaje de error aparezca
        const errorMessage = await screen.findByText(/Usuario o contraseña incorrectos/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // * Prueba 6: Sesión expirada
    test("muestra mensaje de sesión expirada si existe expiredSession en localStorage", async () => {
        localStorage.setItem("expiredSession", "true");

        render(<LoginForm />);

        const expiredMessage = await screen.findByText(/Tu sesión ha expirado. Por favor, inicia sesión nuevamente./i);
        expect(expiredMessage).toBeInTheDocument();

        // Asegura que se borre de localStorage después de mostrarlo
        expect(localStorage.getItem("expiredSession")).toBeNull();
    });

    // * Prueba 7: Persistencia de sesión. El token queda guardado en localStorage
    test("guarda el token JWT en localStorage después del login exitoso", async () => {
        const push = jest.fn();
        useRouter.mockReturnValue({ push });

        const fakeToken = "token123";
        const fakeUser = {
            rol: { id_rol: 2 },
        };

        axios.post.mockResolvedValue({
            data: {
                token: fakeToken,
                user: fakeUser,
            },
        });

        render(<LoginForm />);

        fireEvent.change(screen.getByPlaceholderText(/Ingresar el usuario/i), {
            target: { value: "medico" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingresar la contraseña/i), {
            target: { value: "Password123456" },
        });

        fireEvent.click(screen.getByRole("button", { name: /Ingresar/i }));

        await waitFor(() => {
            expect(localStorage.getItem("authToken")).toBe(fakeToken);
        });
    });

    // * Prueba 8: Prueba del enlace "Recuperar contraseña"
    test("el enlace de 'Recuperar contraseña' redirige correctamente", () => {
        render(<LoginForm />);
        
        const forgotPasswordLink = screen.getByRole("link", { name: /recuperar contraseña/i });
        expect(forgotPasswordLink).toBeInTheDocument();
        expect(forgotPasswordLink).toHaveAttribute("href", "/auth/reset-password");

    });
    

});


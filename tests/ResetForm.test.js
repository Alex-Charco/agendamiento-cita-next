import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetForm from "@/components/reset/ResetForm";

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ success: true }),
        })
    );
});


beforeEach(() => {
    delete window.location;
    window.location = { href: '' };
});

beforeEach(() => {
    fetch.mockClear();
    Swal.fire.mockClear();
    jest.spyOn(console, "log").mockImplementation(() => { }); // 🔇 silencia console.log
});


// Mock de SweetAlert2
import Swal from "sweetalert2";
jest.mock("sweetalert2", () => ({
    fire: jest.fn(() => Promise.resolve({})),
}));

// Mock del fetch global
global.fetch = jest.fn();

describe("ResetForm", () => {
    beforeEach(() => {
        fetch.mockClear();
        Swal.fire.mockClear();
    });

    test("✅ Muestra mensaje de error si el campo email está vacío", async () => {
        render(<ResetForm />);

        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith(
                "Campo vacío",
                "Por favor ingresa un correo electrónico.",
                "error"
            );
        });
    });

    test("✅ Muestra mensaje de error si el email es inválido", async () => {
        render(<ResetForm />);

        const input = screen.getByPlaceholderText("Correo electrónico");
        fireEvent.change(input, { target: { value: "correo@invalido" } });

        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith(
                "Correo inválido",
                "Por favor ingresa un correo electrónico válido.",
                "error"
            );
        });
    });

    test("✅ Renderiza el título del formulario correctamente", () => {
        render(<ResetForm />);
        expect(screen.getByText("Recuperar Contraseña")).toBeInTheDocument();
    });

    test("✅ Muestra mensaje de éxito al enviar un correo válido", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: "Correo enviado" }),
        });

        render(<ResetForm />);

        const input = screen.getByPlaceholderText("Correo electrónico");
        fireEvent.change(input, { target: { value: "test@example.com" } });

        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith({
                icon: "success",
                title: "Solicitud enviada",
                text: "Correo enviado",
                confirmButtonText: "Aceptar",
            });
        });
    });

    test("❌ Muestra error si la API responde con error", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: "Correo no encontrado" }),
        });

        render(<ResetForm />);

        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
            target: { value: "test@example.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith({
                icon: "error",
                title: "Error",
                text: "Correo no encontrado",
            });
        });
    });

    test("🛑 Muestra error de red si falla la solicitud", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        fetch.mockRejectedValueOnce(new Error("Fallo de red"));

        render(<ResetForm />);
        fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
            target: { value: "test@example.com" },
        });
        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(require("sweetalert2").fire).toHaveBeenCalledWith(
                "Error de red",
                "No se pudo completar la solicitud. Verifica tu conexión e intenta nuevamente.",
                "error"
            );
        });

        consoleErrorSpy.mockRestore(); // Restaurar después del test
    });

});

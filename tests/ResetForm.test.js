import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetForm from "@/components/reset/ResetForm";

// Mock de SweetAlert2
jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

// Mock del fetch global
global.fetch = jest.fn();

describe("ResetForm", () => {
    beforeEach(() => {
        fetch.mockClear();
        require("sweetalert2").fire.mockClear();
    });

    test("✅ Muestra mensaje de error si el campo email está vacío", async () => {
        render(<ResetForm />);

        fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

        await waitFor(() => {
            expect(require("sweetalert2").fire).toHaveBeenCalledWith(
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
            expect(require("sweetalert2").fire).toHaveBeenCalledWith(
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
            expect(require("sweetalert2").fire).toHaveBeenCalledWith({
                icon: "success",
                title: "Solicitud enviada",
                text: "Correo enviado",
                confirmButtonText: "Aceptar",
            });
        });
    });

});

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

    
    
});

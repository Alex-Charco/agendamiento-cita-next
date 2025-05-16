import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";

describe("PacienteForm", () => {
    test("renderiza todos los inputs y envía los datos", () => {
        const mockSubmit = jest.fn();

        render(<PacienteForm onSubmit={mockSubmit} />);

        const inputNombreUsuario = screen.getByPlaceholderText("Ingrese el nombre de usuario");
        const inputIdentificacion = screen.getByPlaceholderText("Ingrese la identificación");

        fireEvent.change(inputNombreUsuario, { target: { value: "juan123" } });
        fireEvent.change(inputIdentificacion, { target: { value: "12345678" } });

        fireEvent.submit(screen.getByRole("form"));

        expect(mockSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                nombre_usuario: "juan123",
                identificacion: "12345678",
            })
        );
    });
});

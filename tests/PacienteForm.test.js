import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PacienteForm from "@/admin-dashboard/paciente/components/PacienteForm";

describe("PacienteForm", () => {
    // *Prueba 1
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

    // *Prueba 2
    test("renderiza el formulario con valores iniciales vacíos", () => {
        render(<PacienteForm onSubmit={jest.fn()} />);
        expect(screen.getByLabelText(/Nombre de usuario/i)).toHaveValue("");
        expect(screen.getByLabelText(/Identificación/i)).toHaveValue("");
        expect(screen.getByLabelText(/Primer nombre/i)).toHaveValue("");
        expect(screen.getByLabelText(/Segundo nombre/i)).toHaveValue("");
        expect(screen.getByLabelText(/Primer apellido/i)).toHaveValue("");
        expect(screen.getByLabelText(/Segundo apellido/i)).toHaveValue("");
        expect(screen.getByLabelText(/Fecha de nacimiento/i)).toHaveValue("");
        expect(screen.getByLabelText(/Celular/i)).toHaveValue("");
        expect(screen.getByLabelText(/Teléfono/i)).toHaveValue("");
        expect(screen.getByLabelText(/Correo/i)).toHaveValue("");
        expect(screen.getByLabelText(/Empresa/i)).toHaveValue("");
    });
});

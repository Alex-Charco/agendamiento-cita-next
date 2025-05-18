import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FamiliarForm from "@/admin-dashboard/paciente/components/FamiliarForm";

describe("FamiliarForm", () => {
    const mockSubmit = jest.fn();

    beforeEach(() => {
        localStorage.setItem("identificacion", "12345678");
    });

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("renderiza todos los campos requeridos", () => {
        render(<FamiliarForm onSubmit={mockSubmit} />);

        expect(screen.getByLabelText(/Identificación paciente/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Identificación$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Primer Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Primer Apellido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Celular/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Seleccione un género/)).toBeInTheDocument();
        expect(screen.getByText(/Registrar familiar/i)).toBeInTheDocument();
    });

    test("actualiza los valores del formulario", () => {
        render(<FamiliarForm onSubmit={mockSubmit} />);

        const inputNombre = screen.getByLabelText(/Primer Nombre/i);
        fireEvent.change(inputNombre, { target: { value: "María" } });

        expect(inputNombre.value).toBe("María");
    });

    test("llama a onSubmit con los datos del formulario al enviar", () => {
        render(<FamiliarForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/^Identificación$/i), {
            target: { value: "987654" },
        });

        fireEvent.change(screen.getByLabelText(/Primer Nombre/i), {
            target: { value: "Laura" },
        });

        fireEvent.change(screen.getByLabelText(/Correo/i), {
            target: { value: "laura@example.com" },
        });

        const submitButton = screen.getByText(/Registrar familiar/i);
        const form = submitButton.closest("form");
        fireEvent.submit(form);
        
        expect(mockSubmit).toHaveBeenCalled();
        expect(mockSubmit.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                identificacion: "987654",
                primer_nombre: "Laura",
                correo: "laura@example.com",
                identificacion_paciente: "12345678",
            })
        );
    });
});

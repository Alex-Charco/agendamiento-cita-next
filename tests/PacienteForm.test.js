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

    // * Prueba 3
    test("rellena los campos cuando se pasa pacienteData", () => {
        const pacienteMock = {
            nombre_usuario: "anauser",
            identificacion: "12345678",
            primer_nombre: "Ana",
            segundo_nombre: "María",
            primer_apellido: "González",
            segundo_apellido: "López",
            fecha_nacimiento: "1990-01-01",
            celular: "0991234567",
            telefono: "022345678",
            correo: "ana@example.com",
            empresa: "Empresa XYZ",
        };
    
        render(<PacienteForm onSubmit={jest.fn()} pacienteData={pacienteMock} />);
    
        expect(screen.getByLabelText(/Nombre de usuario/i)).toHaveValue("anauser");
        expect(screen.getByLabelText(/Identificación/i)).toHaveValue("12345678");
        expect(screen.getByLabelText(/Primer nombre/i)).toHaveValue("Ana");
        expect(screen.getByLabelText(/Segundo nombre/i)).toHaveValue("María");
        expect(screen.getByLabelText(/Primer apellido/i)).toHaveValue("González");
        expect(screen.getByLabelText(/Segundo apellido/i)).toHaveValue("López");
        expect(screen.getByLabelText(/Fecha de nacimiento/i)).toHaveValue("1990-01-01");
        expect(screen.getByLabelText(/Celular/i)).toHaveValue("0991234567");
        expect(screen.getByLabelText(/Teléfono/i)).toHaveValue("022345678");
        expect(screen.getByLabelText(/Correo/i)).toHaveValue("ana@example.com");
        expect(screen.getByLabelText(/Empresa/i)).toHaveValue("Empresa XYZ");
    });
    
});

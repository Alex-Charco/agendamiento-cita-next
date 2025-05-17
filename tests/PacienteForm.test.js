import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
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

    // * Prueba 4
    test("carga nombre_usuario desde localStorage", () => {
        localStorage.setItem("nombre_usuario", "usuario123");
        render(<PacienteForm onSubmit={jest.fn()} />);
        expect(screen.getByLabelText(/Nombre de usuario/i)).toHaveValue("usuario123");
    });

    // * Prueba 5
    test("llama onSubmit con los datos del paciente al enviar el formulario", () => {
        const mockSubmit = jest.fn();
        render(<PacienteForm onSubmit={mockSubmit} />);

        const input = screen.getByLabelText(/Primer nombre/i);
        fireEvent.change(input, { target: { value: "Carlos" } });

        fireEvent.submit(screen.getByRole("form"));
        expect(mockSubmit).toHaveBeenCalled();
        expect(mockSubmit.mock.calls[0][0].primer_nombre).toBe("Carlos");
    });

    // * Prueba 6
    test('puede seleccionar género desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const generoDropdown = within(formulario).getByText(/Seleccione un género/i);

        expect(generoDropdown).toBeInTheDocument();

        userEvent.click(generoDropdown);

        const opcionMasculino = await screen.findByText(/Masculino/i);
        userEvent.click(opcionMasculino);

        // Ahora buscamos el nodo que muestra el valor seleccionado
        // Por ejemplo, buscamos un elemento que contenga "Masculino"
        const generoSeleccionado = within(formulario).getByText(/Masculino/i);

        expect(generoSeleccionado).toBeInTheDocument();
    });

    // * Prueba 7
    test('puede seleccionar estado civil desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const estadoCivilDropdown = within(formulario).getByText(/Seleccione un estado civil/i);

        expect(estadoCivilDropdown).toBeInTheDocument();

        userEvent.click(estadoCivilDropdown);

        const opcionCasado = await screen.findByText(/Casado\/a/i);
        userEvent.click(opcionCasado);

        const estadoSeleccionado = within(formulario).getByText(/Casado\/a/i);
        expect(estadoSeleccionado).toBeInTheDocument();
    });
    // * Prueba 8
    test('puede seleccionar grupo sanguíneo desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const grupoSanguineoDropdown = within(formulario).getByText(/Seleccione un grupo sanguíneo/i);

        expect(grupoSanguineoDropdown).toBeInTheDocument();

        userEvent.click(grupoSanguineoDropdown);

        const opcionARHPos = await screen.findByText(/A RH\+/i);
        userEvent.click(opcionARHPos);

        const grupoSeleccionado = within(formulario).getByText(/A RH\+/i);
        expect(grupoSeleccionado).toBeInTheDocument();
    });

    // * Prueba 9
    test('puede seleccionar nivel de instrucción desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const instruccionDropdown = within(formulario).getByText(/Seleccione nivel de instrucción/i);

        expect(instruccionDropdown).toBeInTheDocument();

        userEvent.click(instruccionDropdown);

        const opcionBachillerato = await screen.findByText(/Bachillerato/i);
        userEvent.click(opcionBachillerato);

        const instruccionSeleccionada = within(formulario).getByText(/Bachillerato/i);
        expect(instruccionSeleccionada).toBeInTheDocument();
    });


    // * Prueba 10
    test('puede seleccionar ocupación desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const ocupacionDropdown = within(formulario).getByText(/Seleccione la ocupación/i);

        expect(ocupacionDropdown).toBeInTheDocument();

        userEvent.click(ocupacionDropdown);

        const opcionDocente = await screen.findByText(/Docente/i);
        userEvent.click(opcionDocente);

        const ocupacionSeleccionada = within(formulario).getByText(/Docente/i);
        expect(ocupacionSeleccionada).toBeInTheDocument();
    });


    // * Prueba 11
    test('puede seleccionar discapacidad desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const [discapacidadDropdown] = within(formulario).getAllByText(/¿Tiene discapacidad\?/i);

        expect(discapacidadDropdown).toBeInTheDocument();

        userEvent.click(discapacidadDropdown);

        const opcionSi = await screen.findByText(/Sí/i);
        userEvent.click(opcionSi);

        const discapacidadSeleccionada = within(formulario).getByText(/Sí/i);
        expect(discapacidadSeleccionada).toBeInTheDocument();
    });

    // * Prueba 12
    test('puede seleccionar orientación desde el dropdown', async () => {
        render(<PacienteForm />);

        const formulario = screen.getByRole('form');
        const orientacionDropdown = within(formulario).getByText(/Seleccione la orientación/i);

        expect(orientacionDropdown).toBeInTheDocument();

        userEvent.click(orientacionDropdown);

        const opcionOrientacion = await screen.findByText(/Heterosexual/i);
        userEvent.click(opcionOrientacion);

        const orientacionSeleccionada = within(formulario).getByText(/Heterosexual/i);
        expect(orientacionSeleccionada).toBeInTheDocument();
    });





});

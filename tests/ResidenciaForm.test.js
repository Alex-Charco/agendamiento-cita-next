import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResidenciaForm from "@/admin-dashboard/paciente/components/ResidenciaForm";

// Mocks simples para componentes hijos
jest.mock("@/components/ui/SectionTitle", () => {
    const SectionTitleMock = ({ text }) => <h2>{text}</h2>;
    SectionTitleMock.displayName = "SectionTitleMock";
    return SectionTitleMock;
});

jest.mock("@/components/form/CustomInput", () => {
    const CustomInputMock = (props) => (
        <input
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(props.name, e.target.value)}
            data-testid={props.name}
        />
    );
    CustomInputMock.displayName = "CustomInputMock";
    return CustomInputMock;
});

jest.mock("@/components/ui/SubmitButton", () => {
    const SubmitButtonMock = ({ text }) => <button type="submit">{text}</button>;
    SubmitButtonMock.displayName = "SubmitButtonMock";
    return SubmitButtonMock;
});


describe("ResidenciaForm", () => {
    beforeEach(() => {
        // Limpiar mocks y localStorage antes de cada prueba
        jest.clearAllMocks();
        localStorage.clear();
    });

    test("renderiza los inputs con valores iniciales vacíos", () => {
        render(<ResidenciaForm onSubmit={jest.fn()} />);

        expect(screen.getByTestId("identificacion_paciente").value).toBe("");
        expect(screen.getByTestId("lugar_nacimiento").value).toBe("");
        expect(screen.getByTestId("pais").value).toBe("");
        expect(screen.getByTestId("nacionalidad").value).toBe("");
    });

    test("renderiza con datos pasados en residenciaData", () => {
        const data = {
            identificacion_paciente: "123",
            lugar_nacimiento: "Quito",
            pais: "Ecuador",
            nacionalidad: "Ecuatoriana",
        };

        render(<ResidenciaForm onSubmit={jest.fn()} residenciaData={data} />);

        expect(screen.getByTestId("identificacion_paciente").value).toBe("123");
        expect(screen.getByTestId("lugar_nacimiento").value).toBe("Quito");
        expect(screen.getByTestId("pais").value).toBe("Ecuador");
        expect(screen.getByTestId("nacionalidad").value).toBe("Ecuatoriana");
    });

    test("actualiza el valor al cambiar un input", () => {
        render(<ResidenciaForm onSubmit={jest.fn()} />);

        const input = screen.getByTestId("pais");
        fireEvent.change(input, { target: { value: "Perú" } });
        expect(input.value).toBe("Perú");
    });

    test("llama a onSubmit con datos del formulario al enviar", () => {
        const handleSubmit = jest.fn();
        render(<ResidenciaForm onSubmit={handleSubmit} />);

        fireEvent.change(screen.getByTestId("pais"), { target: { value: "Chile" } });
        fireEvent.change(screen.getByTestId("nacionalidad"), { target: { value: "Chilena" } });

        fireEvent.click(screen.getByRole("button", { name: /registrar residencia/i }));

        expect(handleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                pais: "Chile",
                nacionalidad: "Chilena",
            })
        );
    });

    test("lee localStorage y actualiza identificacion_paciente en useEffect", () => {
        localStorage.setItem("identificacion", "456");
        render(<ResidenciaForm onSubmit={jest.fn()} />);

        const input = screen.getByTestId("identificacion_paciente");
        // waitFor no es estrictamente necesario aquí porque no hay async, pero es bueno para efectos.
        expect(input.value).toBe("456");
    });
});

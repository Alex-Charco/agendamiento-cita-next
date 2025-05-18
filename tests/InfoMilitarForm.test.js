import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InfoMilitarForm from "@/admin-dashboard/paciente/components/InfoMilitarForm";

// Mocks de los componentes hijos
jest.mock("@/components/ui/SectionTitle", () => {
  function SectionTitle({ text }) {
    return <h2>{text}</h2>;
  }
  SectionTitle.displayName = "SectionTitle";
  return SectionTitle;
});

jest.mock("@/components/form/CustomInput", () => {
  function CustomInput(props) {
    return (
      <input
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) =>
          props.onChange({ target: { name: props.name, value: e.target.value } })
        }
        data-testid={props.name}
      />
    );
  }
  CustomInput.displayName = "CustomInput";
  return CustomInput;
});

jest.mock("@/components/form/CustomSelect", () => {
  function CustomSelect(props) {
    return (
      <select
        name={props.name}
        value={props.value}
        onChange={(e) =>
          props.onChange({ target: { name: props.name, value: e.target.value } })
        }
        data-testid={props.name}
      >
        {props.items.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }
  CustomSelect.displayName = "CustomSelect";
  return CustomSelect;
});

jest.mock("@/components/ui/SubmitButton", () => {
  function SubmitButton({ text }) {
    return <button type="submit">{text}</button>;
  }
  SubmitButton.displayName = "SubmitButton";
  return SubmitButton;
});


describe("InfoMilitarForm", () => {
  test("renderiza correctamente el título", () => {
    render(<InfoMilitarForm onSubmit={jest.fn()} />);
    expect(screen.getByText("Información Militar")).toBeInTheDocument();
  });

  test("muestra los campos del formulario", () => {
    render(<InfoMilitarForm onSubmit={jest.fn()} />);
    expect(screen.getByTestId("identificacion")).toBeInTheDocument();
    expect(screen.getByTestId("cargo")).toBeInTheDocument();
    expect(screen.getByTestId("grado")).toBeInTheDocument();
    expect(screen.getByTestId("fuerza")).toBeInTheDocument();
    expect(screen.getByTestId("unidad")).toBeInTheDocument();
  });

  test("envía los datos correctamente", () => {
    const mockSubmit = jest.fn();
    render(<InfoMilitarForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByTestId("identificacion"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByTestId("cargo"), {
      target: { value: "COMANDANTE" },
    });

    fireEvent.change(screen.getByTestId("grado"), {
      target: { value: "GENERAL" },
    });

    fireEvent.change(screen.getByTestId("fuerza"), {
      target: { value: "TERRESTRE" },
    });

    fireEvent.change(screen.getByTestId("unidad"), {
      target: { value: "15-BAE" },
    });

    fireEvent.click(screen.getByText("Registrar Info Militar"));

    expect(mockSubmit).toHaveBeenCalledWith({
      identificacion: "123456",
      cargo: "COMANDANTE",
      grado: "GENERAL",
      fuerza: "TERRESTRE",
      unidad: "15-BAE",
    });
  });

  test("muestra el botón con texto 'Actualizar Info Militar' si infoMilitarData tiene id_paciente", () => {
    render(
      <InfoMilitarForm
        onSubmit={jest.fn()}
        infoMilitarData={{ id_paciente: 1 }}
      />
    );
    expect(screen.getByText("Actualizar Info Militar")).toBeInTheDocument();
  });
});

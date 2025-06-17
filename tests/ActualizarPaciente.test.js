import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualizarPaciente from "@/admin-dashboard/paciente/components/ActualizarPaciente";
import axios from "axios";
import Swal from "sweetalert2";

// Mock de axios
jest.mock("axios");

beforeEach(() => {
  // Simula que el usuario ya está autenticado
  localStorage.setItem("idUsuario", "1234567890");
  localStorage.setItem("token", "fake-token");
});

// Mock de SweetAlert2
jest.mock("sweetalert2", () => ({
    fire: jest.fn(() => Promise.resolve({ isConfirmed: true })),
}));

// Mock del formulario
jest.mock("@/admin-dashboard/paciente/components/PacienteForm", () => {
    const React = require("react");

    const MockPacienteForm = ({ onSubmit, pacienteData }) => {
        const [nombre, setNombre] = React.useState(pacienteData?.primer_nombre || "");

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit({ nombre });
                }}
            >
                <label htmlFor="primer_nombre">Primer nombre</label>
                <input
                    id="primer_nombre"
                    aria-label="Primer nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button type="submit">Enviar formulario</button>
            </form>
        );
    };

    return MockPacienteForm;
});

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});

beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3000";
    localStorage.clear();
    jest.clearAllMocks();
});

describe("ActualizarPaciente", () => {
    const mockPaciente = {
        primer_nombre: "Juan",
        identificacion: "1234567890",
    };

    it("renderiza mensaje si no hay datos de paciente", () => {
        render(<ActualizarPaciente pacienteData={null} />);
        expect(screen.getByText(/Buscar paciente para modificar paciente/i)).toBeInTheDocument();
    });

    it("renderiza el formulario si hay pacienteData", () => {
        render(<ActualizarPaciente pacienteData={mockPaciente} />);
        expect(screen.getByText(/Enviar formulario/i)).toBeInTheDocument();
    });

    it("muestra mensaje si no hay token en localStorage", async () => {
        localStorage.setItem("identificacion", "1234567890");
        render(<ActualizarPaciente pacienteData={mockPaciente} />);
        fireEvent.click(screen.getByText("Enviar formulario"));

        await waitFor(() => {
            expect(screen.getByText(/Tu sesión ha expirado\. Por favor, vuelve a iniciar sesión\./i)).toBeInTheDocument();
        });
    });

    it("muestra mensaje si no hay identificación en localStorage", async () => {
        localStorage.setItem("authToken", "fake-token");
        render(<ActualizarPaciente pacienteData={mockPaciente} />);
        fireEvent.click(screen.getByText("Enviar formulario"));

        await waitFor(() => {
            expect(screen.getByText(/No se encontró la identificación del paciente/i)).toBeInTheDocument();
        });
    });

    it("hace la petición PUT correctamente y muestra alerta de éxito", async () => {
	  const mockPaciente = {
		primer_nombre: "Juan",
		identificacion: "1234567890",
	  };

	  localStorage.setItem("authToken", "fake-token");
	  localStorage.setItem("identificacion", mockPaciente.identificacion);
	  localStorage.setItem("user", JSON.stringify({ id_usuario: "1" }));

	  axios.put.mockResolvedValue({ data: { success: true } });

	  render(<ActualizarPaciente pacienteData={mockPaciente} />);

	  const input = await screen.findByLabelText(/primer nombre/i);
	  fireEvent.change(input, { target: { value: "Juan" } });

	  const button = screen.getByRole("button", { name: /enviar/i });
	  fireEvent.click(button);

	  await waitFor(() =>
		expect(axios.put).toHaveBeenCalledWith(
		  expect.stringContaining("/api/paciente/put/1234567890"),
		  JSON.stringify({
			nombre: "Juan",
			id_usuario_modificador: "1",
		  }),
		  expect.objectContaining({
			headers: expect.objectContaining({
			  Authorization: "Bearer fake-token",
			}),
		  })
		)
	  );
	});

    it("muestra mensaje de error si axios falla", async () => {
	  // Configura correctamente el localStorage
	  localStorage.setItem("authToken", "fake-token");
	  localStorage.setItem("identificacion", "1234567890");
	  localStorage.setItem("user", JSON.stringify({ id_usuario: 1 })); // 👈 AÑADIDO

	  // Simula el error de la API
	  axios.put.mockRejectedValue({
		response: { data: { message: "Error de API" } },
	  });

	  render(<ActualizarPaciente pacienteData={mockPaciente} />);
	  fireEvent.click(screen.getByText("Enviar formulario"));

	  await waitFor(() => {
		expect(screen.getByText((content) => content.includes("Error: Error de API"))).toBeInTheDocument();
	  });
	});

    it("actualiza el estado del input desde ActualizarPacientePage", () => {
        render(<ActualizarPaciente pacienteData={{ primer_nombre: "" }} />);
        const input = screen.getByLabelText(/Primer nombre/i);
        fireEvent.change(input, { target: { value: "Juan" } });
        expect(input).toHaveValue("Juan");
    });
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualizarPaciente from "@/admin-dashboard/paciente/components/ActualizarPaciente";
import Swal from "sweetalert2";
import axios from "axios";

beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});

beforeEach(() => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3000";
    localStorage.clear();
    jest.clearAllMocks();
});


// Mock de axios y SweetAlert
jest.mock("axios");
jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

// Mock del formulario de paciente
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


describe("ActualizarPaciente", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

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
            expect(screen.getByText(/No se encontró el token de autenticación/i)).toBeInTheDocument();
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
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("identificacion", "1234567890");

        axios.put.mockResolvedValue({ data: { success: true } });

        render(<ActualizarPaciente pacienteData={mockPaciente} />);
        fireEvent.click(screen.getByText("Enviar formulario"));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                expect.stringContaining("/api/paciente/put/1234567890"),
                JSON.stringify({ nombre: "Juan" }),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: "Bearer fake-token",
                    }),
                })
            );
            expect(Swal.fire).toHaveBeenCalledWith({
                title: "Paciente actualizado!",
                icon: "success",
                confirmButtonText: "OK",
            });
        });
    });

    it("muestra mensaje de error si axios falla", async () => {
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("identificacion", "1234567890");

        axios.put.mockRejectedValue({
            response: { data: { message: "Error de API" } },
        });

        render(<ActualizarPaciente pacienteData={mockPaciente} />);
        fireEvent.click(screen.getByText("Enviar formulario"));

        await waitFor(() => {
            expect(screen.getByText(/Error: Error de API/i)).toBeInTheDocument();
        });
    });

    it("actualiza el estado del input desde ActualizarPacientePage", () => {
        render(<ActualizarPaciente pacienteData={{ primer_nombre: "" }} />);
    
        const input = screen.getByLabelText(/Primer nombre/i);
        fireEvent.change(input, { target: { value: "Juan" } });
    
        expect(input).toHaveValue("Juan");
    });
    
    
});

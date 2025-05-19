import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Swal from "sweetalert2";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";

// Mock axios
jest.mock("axios");

// Mock Swal
jest.mock("sweetalert2", () => ({
    fire: jest.fn(),
}));

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    console.error.mockRestore();
});

// Mock ResidenciaForm
jest.mock("@/admin-dashboard/paciente/components/ResidenciaForm", () => {
    // Definimos un componente nombrado
    const MockResidenciaForm = (props) => (
        <form
            data-testid="residencia-form"
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit({
                    identificacion_paciente: "12345",
                    direccion: "Av. Siempre Viva 123",
                    ciudad: "Springfield",
                });
            }}
        >
            <button type="submit">Enviar</button>
        </form>
    );
    return MockResidenciaForm;
});

describe("RegistrarResidencia", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test("renderiza ResidenciaForm", () => {
        render(<RegistrarResidencia />);
        expect(screen.getByTestId("residencia-form")).toBeInTheDocument();
    });

    test("muestra mensaje error si no hay token", async () => {
        render(<RegistrarResidencia />);
        // Enviamos el formulario
        userEvent.click(screen.getByText(/Enviar/i));

        // Esperamos que aparezca el mensaje de error por token
        await waitFor(() => {
            expect(screen.getByText(/No se encontró el token de autenticación/i)).toBeInTheDocument();
        });

        expect(axios.post).not.toHaveBeenCalled();
    });

    test("envía datos correctamente y muestra alerta éxito", async () => {
        localStorage.setItem("authToken", "fake-token");

        // Mock axios.post para que resuelva correctamente
        axios.post.mockResolvedValue({ data: { success: true } });

        render(<RegistrarResidencia />);

        userEvent.click(screen.getByText(/Enviar/i));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining("/api/residencia/registrar/12345"),
                JSON.stringify({
                    direccion: "Av. Siempre Viva 123",
                    ciudad: "Springfield",
                }),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        Authorization: "Bearer fake-token",
                        "Content-Type": "application/json",
                    }),
                })
            );
            expect(Swal.fire).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Residencia registrada!",
                    icon: "success",
                    confirmButtonText: "OK",
                })
            );
        });
    });

    test("muestra mensaje de error si axios falla", async () => {
        localStorage.setItem("authToken", "fake-token");

        // Mock axios.post para que falle
        axios.post.mockRejectedValue({
            response: { data: { message: "Error del servidor" } },
        });

        render(<RegistrarResidencia />);

        userEvent.click(screen.getByText(/Enviar/i));

        await waitFor(() => {
            expect(screen.getByText(/Error: Error del servidor/)).toBeInTheDocument();
        });
    });
});

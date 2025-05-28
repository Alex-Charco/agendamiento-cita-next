import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistrarSeguro from "@/admin-dashboard/paciente/components/RegistrarSeguro";
import Swal from "sweetalert2";

beforeAll(() => {
    // Opción 1: Silenciar console.error y console.log
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterAll(() => {
    // Restaurar implementación original después de los tests
    console.error.mockRestore();
    console.log.mockRestore();
});

// Mock del componente del formulario (porque no es el foco de la prueba)
jest.mock("@/admin-dashboard/paciente/components/SeguroForm", () => {
    const MockSeguroForm = (props) => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit(mockData);
            }}>
                <button type="submit">Enviar</button>
            </form>
        );
    };
    MockSeguroForm.displayName = "MockSeguroForm";
    return MockSeguroForm;
});

// Mocks globales
const mockData = {};
const mockSwal = jest.spyOn(Swal, "fire").mockImplementation(() => { });

jest.spyOn(Swal, "fire").mockResolvedValue({ isConfirmed: true });

describe("RegistrarSeguro", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("muestra mensaje de error si falta el token", async () => {
        render(<RegistrarSeguro />);

        await userEvent.click(screen.getByText(/Enviar/i));

        const mensaje = await screen.findByText(/Tu sesión ha expirado/i);
expect(mensaje).toBeInTheDocument();
    });

    test("muestra mensaje de error si falta identificacion_paciente", async () => {
        localStorage.setItem("authToken", "mock-token");
        mockData.identificacion_paciente = ""; // sin identificacion

        render(<RegistrarSeguro />);

        await userEvent.click(screen.getByText(/Enviar/i));

        const mensaje = await screen.findByText(/No se encontró la identificación del paciente/i);
        expect(mensaje).toBeInTheDocument();
    });

    test("llama a la API correctamente si todos los datos son válidos", async () => {
        localStorage.setItem("authToken", "mock-token");
        mockData.identificacion_paciente = "12345678";
        mockData.nombre_seguro = "Seguro Test";

        const mockPost = jest.spyOn(require("axios"), "post").mockResolvedValue({
            data: { success: true }
        });

        render(<RegistrarSeguro />);
        await userEvent.click(screen.getByText(/Enviar/i));

        expect(mockPost).toHaveBeenCalledWith(
            expect.stringContaining("/api/seguro/registrar/12345678"),
            expect.stringContaining("Seguro Test"),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: "Bearer mock-token",
                }),
            })
        );
        expect(mockSwal).toHaveBeenCalledWith(expect.objectContaining({
            title: expect.any(String),
            icon: "success",
        }));
    });
});

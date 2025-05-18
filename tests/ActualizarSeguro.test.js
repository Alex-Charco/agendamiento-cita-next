import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualizarSeguro from "@/admin-dashboard/paciente/components/ActualizarSeguro";
import Swal from "sweetalert2";
import axios from "axios";

// Mocks
jest.mock("axios");
jest.mock("sweetalert2", () => ({ fire: jest.fn() }));
jest.mock("@/admin-dashboard/paciente/components/SeguroForm", () => {
    const SeguroFormMock = ({ onSubmit, SeguroData }) => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit(SeguroData);
            }}>
                <button type="submit">Enviar</button>
            </form>
        );
    };

    SeguroFormMock.displayName = "SeguroFormMock";

    return SeguroFormMock;
});

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
});

afterEach(() => {
    console.error.mockRestore();
});


describe("ActualizarSeguro", () => {

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it("muestra mensaje si no hay seguroData", () => {
        render(<ActualizarSeguro seguroData={null} />);
        expect(screen.getByText("Buscar paciente para modificar residencia")).toBeInTheDocument();
    });

    it("renderiza el formulario si hay seguroData", () => {
        render(<ActualizarSeguro seguroData={{ tipo: "público" }} />);
        expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
    });

    it("muestra mensaje si no hay token", async () => {
        localStorage.setItem("identificacion", "12345");

        render(<ActualizarSeguro seguroData={{ tipo: "público" }} />);

        fireEvent.click(screen.getByText("Enviar"));

        await waitFor(() => {
            expect(screen.getByText("No se encontró el token de autenticación.")).toBeInTheDocument();
        });
    });

    it("muestra mensaje si no hay identificacion", async () => {
        localStorage.setItem("authToken", "fake-token");

        render(<ActualizarSeguro seguroData={{ tipo: "privado" }} />);

        fireEvent.click(screen.getByText("Enviar"));

        await waitFor(() => {
            expect(screen.getByText("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.")).toBeInTheDocument();
        });
    });

    it("hace llamada a la API y muestra Swal al enviar correctamente", async () => {
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("identificacion", "12345");

        axios.put.mockResolvedValueOnce({ data: {} });

        render(<ActualizarSeguro seguroData={{ tipo: "privado" }} />);

        fireEvent.click(screen.getByText("Enviar"));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
            expect(Swal.fire).toHaveBeenCalledWith({
                title: "Seguro actualizado!",
                icon: "success",
                confirmButtonText: "OK"
            });
        });
    });

    it("muestra mensaje de error si axios falla", async () => {
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("identificacion", "12345");

        axios.put.mockRejectedValueOnce({ response: { data: { message: "Algo salió mal" } } });

        render(<ActualizarSeguro seguroData={{ tipo: "privado" }} />);

        fireEvent.click(screen.getByText("Enviar"));

        await waitFor(() => {
            expect(screen.getByText("Error: Algo salió mal")).toBeInTheDocument();
        });
    });

});

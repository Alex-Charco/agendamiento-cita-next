import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import Swal from "sweetalert2";
import axios from "axios";

// Mocks
jest.mock("axios");
jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

// Mock del formulario (si no quieres probarlo directamente aquí)
jest.mock("@/admin-dashboard/usuario/components/EstatusUsuarioForm", () => {
    const MockComponent = (props) => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit({ estatus: "Inactivo" });
            }}>
                <button type="submit">Actualizar</button>
            </form>
        );
    };

    MockComponent.displayName = "MockEstatusUsuarioForm";

    return MockComponent;
});

describe("ActualizarEstatusUsuario", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test("renderiza mensaje si no hay datos de estatusUsuario", () => {
        render(<ActualizarEstatusUsuario />);
        expect(screen.getByText(/buscar usuario/i)).toBeInTheDocument();
    });

    test("renderiza el formulario si se pasan datos de estatusUsuario", () => {
        render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);
        expect(screen.getByRole("button", { name: /actualizar/i })).toBeInTheDocument();
    });

    test("muestra error si no hay token", async () => {
        localStorage.setItem("nombre_usuario", "juan");

        render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);

        fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

        await waitFor(() => {
            expect(screen.getByText(/no se encontró el token/i)).toBeInTheDocument();
        });
    });

    test("muestra error si no hay nombre_usuario", async () => {
        localStorage.setItem("authToken", "fake-token");

        render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);

        fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

        await waitFor(() => {
            expect(screen.getByText(/no se encontró la identificación/i)).toBeInTheDocument();
        });
    });

    test("muestra mensaje de éxito si la API responde correctamente", async () => {
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("nombre_usuario", "juan");

        axios.put.mockResolvedValueOnce({ data: { success: true } });

        render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);

        fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

        await waitFor(() => {
            expect(Swal.fire).toHaveBeenCalledWith({
                title: "Estatus actualizado!",
                icon: "success",
                confirmButtonText: "OK"
            });
        });
    });

    test("muestra mensaje de error si la API falla", async () => {
        localStorage.setItem("authToken", "fake-token");
        localStorage.setItem("nombre_usuario", "juan");

        axios.put.mockRejectedValueOnce({
            response: { data: { message: "Algo salió mal" } }
        });

        render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);

        fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

        await waitFor(() => {
            expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument();
        });
    });
});

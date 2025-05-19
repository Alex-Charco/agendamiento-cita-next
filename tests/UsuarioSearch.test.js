import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsuarioSearch from "@/admin-dashboard/usuario/components/UsuarioSearch";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import axios from "axios";

// Mock de axios
jest.mock("axios");

// Mock de localStorage
beforeEach(() => {
    localStorage.clear();
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost";
    jest.spyOn(window.localStorage.__proto__, "getItem");
    jest.spyOn(window.localStorage.__proto__, "setItem");
    jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
    console.log.mockRestore();
});

// Mock de onSelectUsuario
const mockOnSelectUsuario = jest.fn();

describe("UsuarioSearch", () => {
    test("renderiza el componente correctamente", () => {
        render(<UsuarioSearch onSelectUsuario={mockOnSelectUsuario} />);

        expect(screen.getByText("Buscar Usuario")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ingresar nombre de usuario...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    });

    test("muestra mensaje de error si el usuario no es encontrado", async () => {
        axios.get.mockResolvedValue({ data: {} }); // no hay id_usuario

        render(<UsuarioSearch onSelectUsuario={mockOnSelectUsuario} />);

        const input = screen.getByPlaceholderText("Ingresar nombre de usuario...");
        const button = screen.getByRole("button", { name: "Buscar" });

        await userEvent.type(input, "usuarioInvalido");
        await userEvent.click(button);


        await waitFor(() =>
            expect(screen.getByText("No se encontró el usuario.")).toBeInTheDocument()
        );
    });

    test("llama onSelectUsuario si el usuario es encontrado", async () => {
        const fakeUser = {
            id_usuario: "123",
            nombre_usuario: "juan",
            rol: "paciente",
            estatus: "activo",
        };

        axios.get.mockResolvedValue({ data: fakeUser });

        render(<UsuarioSearch onSelectUsuario={mockOnSelectUsuario} />);

        const input = screen.getByPlaceholderText("Ingresar nombre de usuario...");
        const button = screen.getByRole("button", { name: "Buscar" });

        fireEvent.change(input, { target: { value: "juan" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith("nombre_usuario", "juan");
            expect(mockOnSelectUsuario).toHaveBeenCalledWith({
                id_paciente: "123",
                nombre_usuario: "juan",
                rol: "paciente",
                estatus: "activo",
            });
        });
    });
});

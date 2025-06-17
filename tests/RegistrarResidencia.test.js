import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import RegistrarResidencia from "@/admin-dashboard/paciente/components/RegistrarResidencia";

// 🔧 Mocks
jest.mock("axios");
jest.mock("@/utils/toast", () => ({
  mostrarToastExito: jest.fn(),
  mostrarToastError: jest.fn(),
  manejarSesionExpirada: jest.fn((setMensaje) =>
    setMensaje("No se encontró el token de autenticación.")
  ),
}));
jest.mock("@/utils/confirmacion", () => ({
  confirmarRegistro: jest.fn(),
}));

// 🧪 Mock ResidenciaForm
jest.mock("@/admin-dashboard/paciente/components/ResidenciaForm", () => {
  return function MockResidenciaForm({ onSubmit }) {
    return (
      <form
        data-testid="residencia-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            identificacion_paciente: "12345",
            direccion: "Av. Siempre Viva 123",
            ciudad: "Springfield",
          });
        }}
      >
        <button type="submit">Enviar</button>
      </form>
    );
  };
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

  test("muestra error si no hay token", async () => {
    const { confirmarRegistro } = require("@/utils/confirmacion");
    confirmarRegistro.mockResolvedValue(true); // Confirmación positiva

    render(<RegistrarResidencia />);
    userEvent.click(screen.getByText(/Enviar/i));

    await waitFor(() => {
      expect(screen.getByText(/No se encontró el token de autenticación/i)).toBeInTheDocument();
    });
  });

  test("envía datos correctamente si hay token y confirmación", async () => {
    const { confirmarRegistro } = require("@/utils/confirmacion");
    const { mostrarToastExito } = require("@/utils/toast");

    localStorage.setItem("authToken", "fake-token");
    confirmarRegistro.mockResolvedValue(true);
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
          }),
        })
      );
    });

    expect(mostrarToastExito).toHaveBeenCalledWith("✅ Residencia registrada con éxito");
  });

  test("muestra error si axios falla con mensaje del servidor", async () => {
    const { confirmarRegistro } = require("@/utils/confirmacion");
	
	// 🧪 Suprimir logs de error temporalmente
  const consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => {});

    localStorage.setItem("authToken", "fake-token");
    confirmarRegistro.mockResolvedValue(true);
    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { message: "Error del servidor" },
      },
    });

    render(<RegistrarResidencia />);
    userEvent.click(screen.getByText(/Enviar/i));

    await waitFor(() => {
      expect(screen.getByText(/Error: Error del servidor/)).toBeInTheDocument();
    });
  });
});

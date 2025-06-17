import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetForm from "@/components/reset/ResetForm";
import Swal from "sweetalert2";

// Mock global fetch una sola vez
global.fetch = jest.fn();

// Mock único de Swal
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() => Promise.resolve({})),
}));

beforeEach(() => {
  fetch.mockClear();
  Swal.fire.mockClear();

  // Reset location
  delete window.location;
  window.location = { href: "" };

  // Silenciar logs
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("ResetForm", () => {
  test("✅ Muestra mensaje de error si el campo email está vacío", async () => {
    render(<ResetForm />);
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        "Campo vacío",
        "Por favor ingresa un correo electrónico.",
        "error"
      );
    });
  });

  test("✅ Muestra mensaje de error si el email es inválido", async () => {
    render(<ResetForm />);
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "correo@invalido" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        "Correo inválido",
        "Por favor ingresa un correo electrónico válido.",
        "error"
      );
    });
  });

  test("✅ Renderiza el título del formulario correctamente", () => {
    render(<ResetForm />);
    expect(screen.getByText("Recuperar Contraseña")).toBeInTheDocument();
  });

  test("✅ Muestra mensaje de éxito al enviar un correo válido", async () => {
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true }); // Confirmación
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Correo enviado" }),
    });

    render(<ResetForm />);
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "success",
        title: "Solicitud enviada",
        text: "Correo enviado",
        confirmButtonText: "Aceptar",
      });
    });
  });

  test("❌ Muestra error si la API responde con error", async () => {
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true }); // Confirmación
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: "Correo no encontrado" }),
    });

    render(<ResetForm />);
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenNthCalledWith(2, {
	  icon: "error",
	  title: "Error",
	  text: "Ocurrió un error al procesar la solicitud.",
	});
    });
  });

  test("🛑 Muestra error de red si falla la solicitud", async () => {
  // Mock de la confirmación de envío
  Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

  // Mock del fallo de red
  fetch.mockRejectedValueOnce(new Error("Fallo de red"));

  render(<ResetForm />);
  fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
    target: { value: "test@example.com" },
  });
  fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

  await waitFor(() => {
    expect(Swal.fire).toHaveBeenNthCalledWith(
      2,
      "Error de red",
      "No se pudo completar la solicitud. Verifica tu conexión e intenta nuevamente.",
      "error"
    );
  });
});

});

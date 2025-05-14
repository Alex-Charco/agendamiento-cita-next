import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ResetPasswordForm from "@/components/reset/ResetPasswordForm";
import Swal from "sweetalert2";

// Mock de SweetAlert
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock de useSearchParams
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "valid-token", // token simulado
  }),
}));

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra error si el campo nombre de usuario está vacío", () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByPlaceholderText(/nueva contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.click(submitButton);

    expect(Swal.fire).toHaveBeenCalledWith(
      "Campo vacío",
      "Por favor ingresa el nombre de usuario.",
      "error"
    );
  });

  test("muestra error si el campo contraseña está vacío", () => {
    render(<ResetPasswordForm />);

    const usernameInput = screen.getByPlaceholderText(/ingresar el usuario/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(usernameInput, { target: { value: "usuario123" } });
    fireEvent.click(submitButton);

    expect(Swal.fire).toHaveBeenCalledWith(
      "Campo vacío",
      "Por favor ingresa una nueva contraseña.",
      "error"
    );
  });
});

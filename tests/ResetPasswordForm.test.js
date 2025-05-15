import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ResetPasswordForm from "@/components/reset/ResetPasswordForm";
import Swal from "sweetalert2";

beforeAll(() => {
  delete window.location;
  window.location = { href: jest.fn() };
});


jest.mock('sweetalert2', () => ({
  fire: jest.fn(() => Promise.resolve()),
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

  // * Prueba 1
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

  // * Prueba 2
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

  // * Prueba 3
  test("muestra errores si la contraseña no cumple las validaciones", () => {
    render(<ResetPasswordForm />);

    const usernameInput = screen.getByPlaceholderText(/ingresar el usuario/i);
    const passwordInput = screen.getByPlaceholderText(/nueva contraseña/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(usernameInput, { target: { value: "usuario123" } });
    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/La contraseña debe tener al menos 10 caracteres/i)).toBeInTheDocument();
});

  // * Prueba 4
  test("✅ Renderiza el título del formulario correctamente", () => {
    render(<ResetPasswordForm />);
    expect(screen.getByText("Restablecer contraseña")).toBeInTheDocument();
});

// * Prueba 5
test("✅ Muestra mensaje de éxito al enviar datos válidos", async () => {
  // Mock de la respuesta de fetch
  global.fetch = jest.fn(() =>
  Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ message: "Contraseña restablecida con éxito." }),
  })
  );
  
  render(<ResetPasswordForm />);
  
  const usernameInput = screen.getByPlaceholderText(/ingresar el usuario/i);
  const passwordInput = screen.getByPlaceholderText(/nueva contraseña/i);
  const submitButton = screen.getByRole("button", { name: /enviar/i });
  
  fireEvent.change(usernameInput, { target: { value: "usuario123" } });
  fireEvent.change(passwordInput, { target: { value: "Password123!" } });
  fireEvent.click(submitButton);
  
  // Espera a que Swal.fire sea llamado
  await screen.findByText(/Restablecer contraseña/i); // fuerza render hasta que el form procese
  
  expect(Swal.fire).toHaveBeenCalledWith({
  icon: "success",
  title: "Éxito",
  text: "Contraseña restablecida con éxito.",
  confirmButtonText: "Aceptar",
  });
  });

});

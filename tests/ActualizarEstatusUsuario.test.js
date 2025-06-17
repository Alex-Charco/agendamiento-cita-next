import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ActualizarEstatusUsuario from "@/admin-dashboard/usuario/components/ActualizarEstatusUsuario";
import Swal from "sweetalert2";
import axios from "axios";
import { confirmarRegistro } from "@/utils/confirmacion";

// Mocks
jest.mock("axios");
jest.mock("sweetalert2", () => ({
  fire: jest.fn()
}));

jest.mock('@/utils/confirmacion', () => ({
  confirmarRegistro: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  // Mock de window.location.href para evitar el error de jsdom
  delete window.location;
  window.location = { href: "" };
});

// Mock del formulario
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
    confirmarRegistro.mockResolvedValue(true);
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
    // Configuración: hay nombre_usuario y user, pero NO hay token
    localStorage.setItem("nombre_usuario", "usuarioTest");
    localStorage.setItem("user", JSON.stringify({ id_usuario: 1 }));

    render(<ActualizarEstatusUsuario estatusUsuarioData={{ estado: "activo" }} />);
    fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

    await waitFor(() => {
      expect(screen.getByText(/tu sesión ha expirado/i)).toBeInTheDocument();
    });
  });

  test("muestra error si no hay nombre_usuario", async () => {
    localStorage.setItem("authToken", "fake-token");
    // No se setea nombre_usuario

    render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);
    fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

    await waitFor(() => {
      expect(screen.getByText(/no se encontró el nombre de usuario/i)).toBeInTheDocument();
    });
  });

  test("muestra mensaje de éxito si la API responde correctamente", async () => {
	  localStorage.setItem("authToken", "fake-token");
	  localStorage.setItem("nombre_usuario", "juan");
	  localStorage.setItem("user", JSON.stringify({ id_usuario: 1 }));
	  axios.put.mockResolvedValueOnce({ data: { success: true } });

	  render(<ActualizarEstatusUsuario estatusUsuarioData={{ estatus: "Activo" }} />);
	  fireEvent.click(screen.getByRole("button", { name: /actualizar/i }));

	  await waitFor(() => {
		expect(Swal.fire).toHaveBeenCalledWith({
		  position: "top-end",
		  icon: "success",
		  title: "¡Estatus de usuario actualizado exitosamente!",
		  showConfirmButton: false,
		  timer: 2500,
		  timerProgressBar: true,
		  toast: true
		});
	  });
	});

  test("muestra mensaje de error si la API falla", async () => {
	jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem("authToken", "fake-token");
    localStorage.setItem("nombre_usuario", "juan");
    localStorage.setItem("user", JSON.stringify({ id_usuario: 1 }));
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

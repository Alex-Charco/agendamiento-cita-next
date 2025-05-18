import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConsultaPacientePage from "@/common/consultar-paciente/ConsultaPacientePage";
import * as api from "@/utils/api";

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
});

jest.mock("next/navigation", () => ({
  usePathname: () => "/admin-dashboard",
}));

// Mock del router de Next.js
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock de subcomponentes
jest.mock("@/admin-dashboard/paciente/components/PacienteSearch", () => {
  const PacienteSearchMock = ({ onSelectPaciente }) => {
    return <button onClick={() => onSelectPaciente(mockPaciente)}>Seleccionar Paciente</button>;
  };
  PacienteSearchMock.displayName = "PacienteSearchMock";
  return PacienteSearchMock;
});

jest.mock("@/components/navbars/NavbarComponent", () => {
  const NavbarComponentMock = () => <div>Navbar</div>;
  NavbarComponentMock.displayName = "NavbarComponentMock";
  return NavbarComponentMock;
});

jest.mock("@/components/CustomTabs", () => {
  const CustomTabsMock = ({ tabs }) => (
    <div>
      {tabs.map((tab) => (
        <div key={tab.key}>
          <h2>{tab.title}</h2>
          {tab.content}
        </div>
      ))}
    </div>
  );
  CustomTabsMock.displayName = "CustomTabsMock";
  return CustomTabsMock;
});

// Mock para fetchInfoMilitar
const mockInfoMilitar = {
  cargo: "Sargento",
  grado: "II",
  fuerza: "Fuerza Terrestre",
  unidad: "Unidad A",
};

jest.spyOn(api, "fetchInfoMilitar").mockImplementation((id, setData) => {
  setData(mockInfoMilitar);
  return Promise.resolve();
});

// Mock de paciente
const mockPaciente = {
  primer_nombre: "Juan",
  segundo_nombre: "Carlos",
  primer_apellido: "Pérez",
  segundo_apellido: "Gómez",
  identificacion: "1234567890",
  fecha_nacimiento: "1990-01-01",
  genero: "Masculino",
  celular: "0999999999",
  telefono: "022222222",
  correo: "juan@example.com",
  estatus: "Activo",
  estado_civil: "Soltero",
  grupo_sanguineo: "O+",
  instruccion: "Universitaria",
  ocupacion: "Ingeniero",
  empresa: "Empresa X",
  discapacidad: "Ninguna",
  orientacion: "Heterosexual",
  identidad: "Cisgénero",
  tipo_paciente: "MILITAR",
  Familiars: [],
  residencia: {
    lugar_nacimiento: "Quito",
    pais: "Ecuador",
    nacionalidad: "Ecuatoriana",
    provincia: "Pichincha",
    canton: "Quito",
    parroquia: "Centro",
    direccion: "Av. Siempre Viva",
    fecha_registro: "2024-01-01",
  },
  Seguro: {
    entidad: "IESS",
    tipo: "Público"
  }
};

describe("ConsultaPacientePage", () => {
  it("renderiza sin errores", () => {
    render(<ConsultaPacientePage />);
    expect(screen.getByText("Datos Generales")).toBeInTheDocument();
  });

  it("selecciona paciente y muestra los datos correctamente", async () => {
    render(<ConsultaPacientePage />);
    fireEvent.click(screen.getByText("Seleccionar Paciente"));

    await waitFor(() => {
      expect(screen.getByText("Juan Carlos Pérez Gómez")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
    });
  });

  it("llama a fetchInfoMilitar si el paciente es militar", async () => {
    const fetchSpy = jest.spyOn(api, "fetchInfoMilitar");
    render(<ConsultaPacientePage />);
    fireEvent.click(screen.getByText("Seleccionar Paciente"));

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith("1234567890", expect.any(Function));
      expect(screen.getByText("Sargento")).toBeInTheDocument();
    });
  });
});

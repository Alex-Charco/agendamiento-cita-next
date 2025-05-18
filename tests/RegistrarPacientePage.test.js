import React from "react";
import { render, screen } from "@testing-library/react";
import RegistrarPacientePage from "@/admin-dashboard/paciente/registrar-paciente/page.js"; // ajusta la ruta si es diferente
import '@testing-library/jest-dom';

// Mock de los subcomponentes e hooks personalizados
jest.mock("next/navigation", () => ({
  usePathname: () => "@/admin-dashboard/paciente/registrar-paciente/page.js",
}));

jest.mock("@/components/navbars/NavbarComponent", () => {
  const MockNavbarComponent = () => <div data-testid="navbar" />;
  MockNavbarComponent.displayName = "MockNavbarComponent";
  return MockNavbarComponent;
});

jest.mock("@/components/CustomTabs", () => {
  const MockCustomTabs = ({ tabs }) => (
    <div data-testid="tabs">
      {tabs.map(tab => (
        <div key={tab.key}>{tab.title}</div>
      ))}
    </div>
  );
  MockCustomTabs.displayName = "MockCustomTabs";
  return MockCustomTabs;
});

jest.mock("@/hooks/useSuccessAlert", () => jest.fn());
jest.mock("@/hooks/useClearLocalStorage", () => ({
  useClearLocalStorage: jest.fn(),
}));

describe("RegistrarPacientePage", () => {
  test("se renderiza correctamente el navbar y los tabs", () => {
    render(<RegistrarPacientePage />);
    
    // Aseguramos que los componentes clave están presentes
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("tabs")).toBeInTheDocument();

    // Validamos que algunos títulos de tabs estén en el documento
    expect(screen.getByText("1. Usuario")).toBeInTheDocument();
    expect(screen.getByText("2. Paciente")).toBeInTheDocument();
    expect(screen.getByText("3. Familiar")).toBeInTheDocument();
    expect(screen.getByText("4. Info Militar")).toBeInTheDocument();
    expect(screen.getByText("5. Residencia")).toBeInTheDocument();
    expect(screen.getByText("6. Seguro")).toBeInTheDocument();
  });
});

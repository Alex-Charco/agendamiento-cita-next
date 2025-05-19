import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PacienteSearch from '@/admin-dashboard/paciente/components/PacienteSearch';
import authAxios from '@/utils/api/authAxios';

jest.mock('@/utils/api/authAxios');

describe('PacienteSearch', () => {
  const mockPaciente = {
    identificacion: '123',
    usuario: {
      nombre_usuario: 'juan123'
    }
  };

  const onSelectPacienteMock = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    onSelectPacienteMock.mockReset();
  });

  it('debería renderizar correctamente', () => {
    render(<PacienteSearch onSelectPaciente={onSelectPacienteMock} />);
    expect(screen.getByPlaceholderText(/Ingresar identificación/i)).toBeInTheDocument();
    expect(screen.getByText(/Buscar/i)).toBeInTheDocument();
  });

  it('debería llamar a onSelectPaciente con los datos correctos', async () => {
    authAxios.get.mockResolvedValueOnce({ data: { paciente: mockPaciente } });

    render(<PacienteSearch onSelectPaciente={onSelectPacienteMock} />);

    fireEvent.change(screen.getByPlaceholderText(/Ingresar identificación/i), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByText(/Buscar/i));

    await waitFor(() => {
      expect(onSelectPacienteMock).toHaveBeenCalledWith({
        ...mockPaciente,
        nombre_usuario: 'juan123',
      });
    });

    expect(localStorage.getItem('identificacion')).toBe('123');
    expect(localStorage.getItem('nombre_usuario')).toBe('juan123');
  });

  it('debería mostrar mensaje de error si no se encuentra paciente', async () => {
    authAxios.get.mockResolvedValueOnce({ data: {} });

    render(<PacienteSearch onSelectPaciente={onSelectPacienteMock} />);

    fireEvent.change(screen.getByPlaceholderText(/Ingresar identificación/i), {
      target: { value: '999' },
    });

    fireEvent.click(screen.getByText(/Buscar/i));

    await waitFor(() => {
      expect(screen.getByText(/No se encontró el paciente/i)).toBeInTheDocument();
    });

    expect(onSelectPacienteMock).not.toHaveBeenCalled();
  });
});

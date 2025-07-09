"use client";

import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip
} from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function TablaMedicamentos({ medicamentos, onEditar, onEliminar, onAgregar }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Medicamentos Registrados</h2>
        <Button color="primary" onPress={onAgregar}>
          Nuevo Medicamento
        </Button>
      </div>

      <Table aria-label="Medicamentos agregados">
        <TableHeader>
          <TableColumn>Opción</TableColumn>
          <TableColumn>Medicamento</TableColumn>
          <TableColumn>Forma Farmacéutica</TableColumn>
          <TableColumn>Concentración</TableColumn>
          <TableColumn>Presentación</TableColumn>
          <TableColumn>Cantidad</TableColumn>
          <TableColumn>Posología</TableColumn>
          <TableColumn>Desde</TableColumn>
        </TableHeader>
        <TableBody>
          {medicamentos.length > 0 ? (
            medicamentos.map((med, index) => (
              <TableRow key={index}>
                <TableCell className="flex gap-2 justify-center">
                  <Tooltip content="Editar" className="text-blue-600 mr-1">
                    <Button isIconOnly variant="light" onPress={() => onEditar(index)}>
                      <FaEdit className="text-blue-600 mr-1" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Eliminar" className="text-red-600 mr-1">
                    <Button isIconOnly variant="light" onPress={() => onEliminar(index)}>
                      <FaTrash className="text-red-600 mr-1" />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-gray-700">{med.nombreMedicamento || "-"}</TableCell>
                <TableCell className="text-gray-700">{med.formaFarmaceutica || "-"}</TableCell>
                <TableCell className="text-gray-700">{med.concentracion || "-"}</TableCell>
                <TableCell className="text-gray-700">{med.presentacion || "-"}</TableCell>
                <TableCell className="text-gray-700">{med.cantidad || "-"}</TableCell>
                <TableCell className="text-gray-700">{med.calcular || "-"}</TableCell>
                <TableCell className="text-gray-700">
				  {med.fecha_inicio && med.hora_inicio
					? `${med.fecha_inicio} ${med.hora_inicio}`
					: " - "}
				</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-500">
                No se han agregado medicamentos aún.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

TablaMedicamentos.propTypes = {
  medicamentos: PropTypes.arrayOf(
    PropTypes.shape({
      nombreMedicamento: PropTypes.string,
      formaFarmaceutica: PropTypes.string,
      concentracion: PropTypes.string,
      presentacion: PropTypes.string,
      cantidad: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      calcular: PropTypes.string, // posología visible
      fechaInicio: PropTypes.string,
      horaInicio: PropTypes.string,
      // ...otros campos que se guardarán al backend (aunque no se muestren)
    })
  ).isRequired,
  onAgregar: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired,
  onEliminar: PropTypes.func.isRequired,
};

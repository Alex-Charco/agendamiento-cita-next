"use client";

import React from "react";
import PropTypes from "prop-types";

export default function DetalleDatosReceta({ fechaPrescripcion, fechaVigencia, paciente }) {
  return (
    <div className="bg-white relative flex flex-col w-full border rounded shadow-lg p-2 bg-gray-50 text-center">
      <div className="absolute -top-2 left-4 bg-white px-2 text-[10px] text-blue-800">
        Datos generales
      </div>

      {/* Mostrar fechas alineadas a la izquierda */}
      <div className="text-sm text-gray-700 space-y-1 mb-4 text-left">
        <p>
          <strong>Fecha de Prescripción:</strong> {fechaPrescripcion || "-"}
        </p>
        <p>
          <strong>Fecha de Vigencia:</strong> {fechaVigencia || "-"}
        </p>
      </div>
    </div>
  );
}

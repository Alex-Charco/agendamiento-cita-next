import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function BuscadorAutorizado({ autorizados }) {
  const [seleccionadoIndex, setSeleccionadoIndex] = useState(0);

  useEffect(() => {
    if (seleccionadoIndex >= autorizados.length) {
      setSeleccionadoIndex(0);
    }
  }, [autorizados, seleccionadoIndex]);

  const handleSeleccion = (index) => {
    setSeleccionadoIndex(Number(index));
  };

  if (!autorizados || autorizados.length === 0) {
    return <p>No hay personas autorizadas.</p>;
  }

  const persona = autorizados[seleccionadoIndex];

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h2 className="text-blue-800 text-sm font-semibold mb-2">Persona Autorizada</h2>

      {autorizados.length > 1 && (
        <div className="mb-4">
          <label className="text-sm text-gray-600">Seleccionar entre paciente y familiar:</label>
          <select
            value={seleccionadoIndex}
            onChange={(e) => handleSeleccion(e.target.value)}
            className="mt-1 p-2 border rounded-lg w-full text-gray-600"
          >
            {autorizados.map((op, idx) => (
              <option key={idx} value={idx}>
                {op.nombres} {op.apellidos} ({op.tipo_autorizado})
              </option>
            ))}
          </select>
        </div>
      )}

      {persona && (
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p><strong>Tipo:</strong> {persona.tipo_autorizado}</p>
          <p><strong>Identificación:</strong> {persona.identificacion}</p>
          <p><strong>Nombre:</strong> {persona.nombres} {persona.apellidos}</p>
          <p><strong>Teléfono:</strong> {persona.telefono || "-"}</p>
          <p><strong>Celular:</strong> {persona.celular || "-"}</p>
          <p><strong>Dirección:</strong> {persona.direccion || "-"}</p>
          <p><strong>Correo:</strong> {persona.correo || "-"}</p>
        </div>
      )}
    </div>
  );
}

BuscadorAutorizado.propTypes = {
  autorizados: PropTypes.array.isRequired,
};

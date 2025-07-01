import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function BuscadorAutorizado({ autorizados, setAutorizados }) {
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [yaInicializado, setYaInicializado] = useState(false); // ✅ evita el loop

  useEffect(() => {
	  if (!yaInicializado && autorizados.length > 0) {
		seleccionarPorIndice(0); // marca como seleccionado el primero
		setYaInicializado(true);
	  }
	}, [autorizados, yaInicializado]);

	const seleccionarPorIndice = (indice) => {
	  const actualizado = autorizados.map((aut, idx) => ({
		...aut,
		seleccionado: idx === Number(indice),
	  }));
	  setAutorizados(actualizado);
	  setSeleccionadoId(Number(indice));
	};

	const handleSeleccion = (e) => {
	  const indiceSeleccionado = Number(e.target.value);
	  seleccionarPorIndice(indiceSeleccionado);
	};


  const seleccionado = autorizados.find((a) => a.seleccionado);

  if (!autorizados || autorizados.length === 0) {
    return <p>No hay personas autorizadas.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h2 className="text-blue-800 text-sm font-semibold mb-2">Persona Autorizada</h2>

      {autorizados.length > 1 && (
        <div className="mb-4">
          <label className="text-sm text-gray-600">Seleccionar entre paciente y familiar:</label>
          <select
            value={seleccionadoId ?? 0}
            onChange={handleSeleccion}
            className="mt-1 p-2 border rounded-lg w-full text-gray-600"
          >
            {autorizados.map((op, idx) => (
              <option key={`${op.tipo_autorizado}-${idx}`} value={idx}>
                {op.nombres} {op.apellidos} ({op.tipo_autorizado})
              </option>
            ))}
          </select>
        </div>
      )}

      {seleccionado && (
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p><strong>Tipo:</strong> {seleccionado.tipo_autorizado}</p>
          <p><strong>Identificación:</strong> {seleccionado.identificacion}</p>
          <p><strong>Nombre:</strong> {seleccionado.nombres} {seleccionado.apellidos}</p>
          <p><strong>Teléfono:</strong> {seleccionado.telefono || "-"}</p>
          <p><strong>Celular:</strong> {seleccionado.celular || "-"}</p>
          <p><strong>Dirección:</strong> {seleccionado.direccion || "-"}</p>
          <p><strong>Correo:</strong> {seleccionado.correo || "-"}</p>
        </div>
      )}
    </div>
  );
}

BuscadorAutorizado.propTypes = {
  autorizados: PropTypes.array.isRequired,
  setAutorizados: PropTypes.func.isRequired,
};


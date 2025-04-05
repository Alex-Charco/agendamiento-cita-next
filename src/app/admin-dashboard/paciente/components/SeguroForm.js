"use client";

import { useReducer, useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const initialState = {
  identificacion_paciente: "",
  tipo: "",
  beneficiario: "",
  codigo: "",
  cobertura: "",
  porcentaje: "",
  fecha_inicio: "",
  fecha_fin: "",
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

export default function SeguroForm({ onSubmit, SeguroData = {} }) {
  const [seguro, dispatch] = useReducer(reducer, {
    ...initialState,
    ...SeguroData,
  });
  
  useEffect(() => {
	  const pacienteId = localStorage.getItem("identificacion");
	  if (pacienteId) {
		dispatch({ name: "identificacion_paciente", value: pacienteId });
	  }
	}, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({ name, value: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(seguro);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" /> Datos de la Seguro
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
		<Input
          isRequired
          className="w-full"
          label="Identificación paciente"
          name="identificacion_paciente"
          type="text"
          value={seguro.identificacion_paciente}
          onChange={handleChange}
        />
		<Select
          isRequired
          className="w-full"
          label="Tipo de seguro"
          placeholder="Seleccionar tipo de seguro"
          selectedKeys={seguro.tipo ? [seguro.tipo] : []}
          onSelectionChange={(keys) =>
            dispatch({ name: "tipo", value: Array.from(keys)[0] })
          }
          items={[
            { key: "SEGURO ISSFA", label: "SEGURO ISSFA" },
          ]}
        >
          {(item) => (
            <SelectItem key={item.key} className="text-gray-600">
              {item.label}
            </SelectItem>
          )}
        </Select>
		<Select
          isRequired
          className="w-full"
          label="Beneficiario"
          placeholder="Seleccionar tipo de beneficiario"
          selectedKeys={seguro.beneficiario ? [seguro.beneficiario] : []}
          onSelectionChange={(keys) =>
            dispatch({ name: "beneficiario", value: Array.from(keys)[0] })
          }
          items={[
            { key: "MILITAR ACTIVO", label: "Militar Activo" },
            { key: "MILITAR PASIVO", label: "Militar Pasivo" },
          ]}
        >
          {(item) => (
            <SelectItem key={item.key} className="text-gray-600">
              {item.label}
            </SelectItem>
          )}
        </Select>
        <Input
          isRequired
          className="w-full"
          label="Código"
		  type="text"
          name="codigo"
          placeholder="Escribir el código"
          value={seguro.codigo}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Cobertura"
          type="number"
          name="cobertura"
          placeholder="Escribir la cobertura"
          value={seguro.cobertura}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Porcentaje"
          type="number"
		  step="0.01"
          name="porcentaje"
          placeholder="Escribir el porcentaje"
          value={seguro.porcentaje}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Fecha inicio"
          name="fecha_inicio"
          //placeholder="Escribir la provincia"
          type="date"
          value={seguro.fecha_inicio}
          onChange={handleChange}
        />
        <Input
          className="w-full"
          label="Fecha fin"
          type="date"
          name="fecha_fin"
          //placeholder="Escribir el cantón"
          value={seguro.fecha_fin}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {SeguroData?.id_paciente ? "Actualizar residencia" : "Registrar residencia"}
      </Button>
    </form>
  );
}

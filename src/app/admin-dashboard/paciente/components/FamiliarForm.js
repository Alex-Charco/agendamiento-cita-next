"use client";

import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const initialState = {
  identificacion_paciente: "",
  identificacion: "",
  fecha_nacimiento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  genero: "",
  celular: "",
  telefono: "",
  correo: "",
  estatus: 1,
  relacion: "",
  direccion: "",
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function FamiliarForm({ onSubmit, familiarData = {} }) {
  const [familiar, dispatch] = useReducer(reducer, {
    ...initialState,
    ...familiarData,
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
    onSubmit(familiar);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" /> Datos del Familiar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          isRequired
          className="w-full"
          label="Identificación paciente"
          name="identificacion_paciente"
          type="text"
          value={familiar.identificacion_paciente}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Identificación"
          name="identificacion"
          placeholder="Escribir la identificación"
          type="text"
          value={familiar.identificacion}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Primer Nombre"
          type="text"
          name="primer_nombre"
          placeholder="Escribir el primer nombre"
          value={familiar.primer_nombre}
          onChange={handleChange}
        />
        <Input
          className="w-full"
          label="Segundo Nombre"
          type="text"
          name="segundo_nombre"
          placeholder="Escribir el segundo nombre"
          value={familiar.segundo_nombre}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Primer Apellido"
          name="primer_apellido"
          placeholder="Escribir el primer apellido"
          type="text"
          value={familiar.primer_apellido}
          onChange={handleChange}
        />
        <Input
          className="w-full"
          label="Segundo Apellido"
          type="text"
          name="segundo_apellido"
          placeholder="Escribir el segundo apellido"
          value={familiar.segundo_apellido}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full"
          label="Fecha de nacimiento"
          type="date"
          name="fecha_nacimiento"
          value={familiar.fecha_nacimiento}
          onChange={handleChange}
        />
        <Select
          isRequired
          className="w-full"
          label="Género"
          placeholder="Seleccionar un género"
          selectedKeys={familiar.genero ? [familiar.genero] : []}
          onSelectionChange={(keys) =>
            dispatch({ name: "genero", value: Array.from(keys)[0] })
          }
          items={[
            { key: "NINGUNO", label: "Ninguno" },
            { key: "MASCULINO", label: "Masculino" },
            { key: "FEMENINO", label: "Femenino" },
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
          label="Celular"
          type="tel"
          name="celular"
          placeholder="Escribir número de celular"
          value={familiar.celular}
          onChange={handleChange}
        />
        <Input
          className="w-full"
          label="Teléfono"
          type="tel"
          name="telefono"
          placeholder="Escribir número de teléfono"
          value={familiar.telefono}
          onChange={handleChange}
        />
        <Input
          isRequired
          className="w-full md:col-span-2"
          label="Correo"
          type="email"
          name="correo"
          placeholder="Escribir el correo electrónico"
          value={familiar.correo}
          onChange={handleChange}
        />
        <Select
          isRequired
          className="w-full"
          label="Estatus"
          placeholder="Seleccionar el estatus"
          selectedKeys={
            familiar.estatus !== null && familiar.estatus !== undefined
              ? [String(familiar.estatus)]
              : []
          }
          onSelectionChange={(keys) =>
            dispatch({ name: "estatus", value: parseInt(Array.from(keys)[0]) })
          }
          items={[
            { key: "1", label: "Activo" },
            { key: "0", label: "Inactivo" },
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
          label="Relación"
          placeholder="Seleccionar tipo de relación"
          selectedKeys={familiar.relacion ? [familiar.relacion] : []}
          onSelectionChange={(keys) =>
            dispatch({ name: "relacion", value: Array.from(keys)[0] })
          }
          items={[
            { key: "ABUELO/A", label: "Abuelo/a" },
            { key: "PADRE", label: "Padre" },
            { key: "MADRE", label: "Madre" },
            { key: "ESPOSO/A", label: "Esposo/a" },
            { key: "HERMANO/A", label: "Hermano/a" },
            { key: "PRIMO/A", label: "Primo/a" },
            { key: "TÍO/A", label: "Tío/a" },
          ]}
        >
          {(item) => (
            <SelectItem key={item.key} className="text-gray-600">
              {item.label}
            </SelectItem>
          )}
        </Select>
        <Input
          className="w-full md:col-span-2"
          label="Dirección"
          type="text"
          name="direccion"
          placeholder="Escribir la dirección"
          value={familiar.direccion}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {familiarData?.id_paciente ? "Actualizar familiar" : "Registrar familiar"}
      </Button>
    </form>
  );
}

// Validación de props
FamiliarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validación para 'onSubmit'
  familiarData: PropTypes.object, // Prop 'familiarData' es opcional
};

export default FamiliarForm;
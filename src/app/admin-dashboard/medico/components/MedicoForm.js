"use client";

import PropTypes from "prop-types";
import React, { useReducer, useEffect } from "react";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import { FaHospitalUser } from "react-icons/fa";

// Estado inicial para el formulario
const initialState = {
  id_especialidad: "",
  nombre_usuario: "",
  identificacion: "",
  fecha_nacimiento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  genero: "",
  reg_msp: "",
  celular: "",
  telefono: "",
  correo: "",
  estatus: 1,
};

// Opciones para los selects
const generoOptions = [
  { key: "NINGUNO", label: "Ninguno" },
  { key: "MASCULINO", label: "Masculino" },
  { key: "FEMENINO", label: "Femenino" },
];

const especialidadOptions = [
  { key: "1", label: "Medicina General" },
  { key: "2", label: "Odontología" },
  { key: "3", label: "Psicología" },
  { key: "4", label: "Rehabilitación" },
  { key: "5", label: "Laboratorio" },
];

const estatusOptions = [
  { key: "1", label: "Activo" },
  { key: "0", label: "Inactivo" },
];

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function MedicoForm({ onSubmit, medicoData = {} }) {
  const [medico, dispatch] = useReducer(reducer, {
    ...initialState,
    ...medicoData,
  });

  useEffect(() => {
    const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
    if (nombreUsuarioGuardado) {
      dispatch({ name: "nombre_usuario", value: nombreUsuarioGuardado });
    }
  }, [medicoData.nombre_usuario]);

  const handleChange = (name, value) => {
    dispatch({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(medico);
  };

  const inputFields = [
    { name: "nombre_usuario", label: "Nombre de usuario", readOnly: true },
    { name: "identificacion", label: "Identificación" },
    { name: "primer_nombre", label: "Primer nombre" },
    { name: "segundo_nombre", label: "Segundo nombre", isRequired: false },
    { name: "primer_apellido", label: "Primer apellido" },
    { name: "segundo_apellido", label: "Segundo apellido", isRequired: false },
    {
      name: "fecha_nacimiento",
      label: "Fecha de nacimiento",
      type: "date",
    },
    { name: "reg_msp", label: "Reg. MSP" },
    { name: "celular", label: "Celular", type: "tel" },
    { name: "telefono", label: "Teléfono", type: "tel", isRequired: false },
    { name: "correo", label: "Correo", type: "email" },
  ];

  const selectFields = [
    {
      name: "genero",
      label: "Género",
      items: generoOptions,
      isRequired: true,
    },
    {
      name: "id_especialidad",
      label: "Especialidad",
      items: especialidadOptions,
      parseValue: (val) => parseInt(val),
      transformValue: (val) => String(val),
    },
    {
      name: "estatus",
      label: "Estatus",
      items: estatusOptions,
      parseValue: (val) => parseInt(val),
      transformValue: (val) => String(val),
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" />
        Datos del Médico
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {inputFields.map((field) => (
          <CustomInput
            key={field.name}
            name={field.name}
            label={field.label}
            value={medico[field.name]}
            onChange={handleChange}
            placeholder={`Ingrese ${field.label.toLowerCase()}`}
            type={field.type || "text"}
            isReadOnly={field.readOnly || false}
            isRequired={field.isRequired !== false}
          />
        ))}

        {selectFields.map((select) => (
          <CustomSelect
            key={select.name}
            name={select.name}
            label={select.label}
            value={medico[select.name]}
            onChange={handleChange}
            items={select.items}
            placeholder={`Seleccione ${select.label.toLowerCase()}`}
            parseValue={select.parseValue}
            transformValue={select.transformValue}
            isRequired={select.isRequired !== false}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

MedicoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  medicoData: PropTypes.object,
};

export default MedicoForm;

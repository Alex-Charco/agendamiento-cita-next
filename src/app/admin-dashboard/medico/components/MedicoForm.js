"use client";

import PropTypes from "prop-types";
import React, { useReducer, useEffect } from "react";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import SectionTitle from "@/components/ui/SectionTitle";
import SubmitButton from "@/components/ui/SubmitButton";

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

// Opciones para los selects (basadas en los enums de la base de datos)
const generoOptions = [
  { key: "NINGUNO", label: "Ninguno" },
  { key: "MASCULINO", label: "Masculino" },
  { key: "FEMENINO", label: "Femenino" },
];

const especialidadOptions = [
  { key: "1", label: "Medecina General" },
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <SectionTitle text="Datos del Medico" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <CustomInput
          isReadOnly={true}
          name="nombre_usuario"
          label="Nombre de usuario"
          value={medico.nombre_usuario}
          onChange={handleChange}
          placeholder="Ingrese el nombre de usuario"
        />
        <CustomInput
          name="identificacion"
          label="Identificación"
          value={medico.identificacion}
          onChange={handleChange}
          placeholder="Ingrese la identificación"
          type="text"
        />
        <CustomInput
          name="primer_nombre"
          label="Primer nombre"
          value={medico.primer_nombre}
          onChange={handleChange}
          placeholder="Ingrese el primer nombre"
        />
        <CustomInput
          name="segundo_nombre"
          label="Segundo nombre"
          value={medico.segundo_nombre}
          onChange={handleChange}
          placeholder="Ingrese el segundo nombre"
          isRequired={false}
        />
        <CustomInput
          name="primer_apellido"
          label="Primer apellido"
          value={medico.primer_apellido}
          onChange={handleChange}
          placeholder="Ingrese el primer apellido"
          isRequired
        />
        <CustomInput
          name="segundo_apellido"
          label="Segundo apellido"
          value={medico.segundo_apellido}
          onChange={handleChange}
          placeholder="Ingrese el segundo apellido"
          isRequired={false}
        />
        <CustomInput
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
          value={medico.fecha_nacimiento}
          onChange={handleChange}
          placeholder="Ingrese la fecha de nacimiento"
          type="date"
          isRequired
        />
        <CustomSelect
          name="genero"
          label="Género"
          value={medico.genero}
          onChange={handleChange}
          items={generoOptions}
          placeholder="Seleccione un género"
          isRequired
        />
        <CustomInput
          name="reg_msp"
          label="Reg. MSP"
          value={medico.reg_msp}
          onChange={handleChange}
          placeholder="Ingrese el Reg. MSP"
          type="text"
        />
        <CustomInput
          name="celular"
          label="Celular"
          value={medico.celular}
          onChange={handleChange}
          placeholder="Ingrese el celular"
          type="tel"
        />
        <CustomInput
          name="telefono"
          label="Teléfono"
          value={medico.telefono}
          onChange={handleChange}
          placeholder="Ingrese el teléfono"
          type="tel"
          isRequired={false}
        />
        <CustomInput
          name="correo"
          label="Correo"
          value={medico.correo}
          onChange={handleChange}
          placeholder="Ingrese el correo"
          type="email"
        />
        <CustomSelect
          name="id_especialidad"
          label="Especialidad"
          value={medico.id_especialidad}
          onChange={handleChange}
          items={especialidadOptions}
          placeholder="Seleccione la especialidad"
          parseValue={(val) => parseInt(val)}
          transformValue={(val) => String(val)}
        />
        <CustomSelect
          name="estatus"
          label="Estatus"
          value={medico.estatus}
          onChange={handleChange}
          items={estatusOptions}
          transformValue={(val) => String(val)}
          parseValue={(val) => parseInt(val)}
        />
      </div>

      <SubmitButton text="Enviar" />

    </form>

  );
};

MedicoForm.propTypes = {
  onSubmit: PropTypes.object,
  medicoData: PropTypes.object,
}

export default MedicoForm; 
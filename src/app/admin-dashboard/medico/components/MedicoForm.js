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
	  console.log(medico);
      onSubmit(medico);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" /> Datos del Medico
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Nombre de usuario */}
        <CustomInput
          //isReadOnly
          name="nombre_usuario"
          label="Nombre de usuario"
          value={medico.nombre_usuario}
          onChange={handleChange}
          placeholder="Ingrese el nombre de usuario"
        />

        {/* Identificación */}
        <CustomInput
          name="identificacion"
          label="Identificación"
          value={medico.identificacion}
          onChange={handleChange}
          placeholder="Ingrese la identificación"
          type="text"
        />

        {/* Primer nombre */}
        <CustomInput
          name="primer_nombre"
          label="Primer nombre"
          value={medico.primer_nombre}
          onChange={handleChange}
          placeholder="Ingrese el primer nombre"
        />


        {/* Segundo nombre */}
        <CustomInput
          name="segundo_nombre"
          label="Segundo nombre"
          value={medico.segundo_nombre}
          onChange={handleChange}
          placeholder="Ingrese el segundo nombre"
          isRequired={false}
        />

        {/* Primer apellido */}
        <CustomInput
          name="primer_apellido"
          label="Primer apellido"
          value={medico.primer_apellido}
          onChange={handleChange}
          placeholder="Ingrese el primer apellido"
          isRequired
        />

        {/* Segundo apellido */}
        <CustomInput
          name="segundo_apellido"
          label="Segundo apellido"
          value={medico.segundo_apellido}
          onChange={handleChange}
          placeholder="Ingrese el segundo apellido"
          isRequired={false}
        />

        {/* Fecha de nacimiento */}
        <CustomInput
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
          value={medico.fecha_nacimiento}
          onChange={handleChange}
          placeholder="Ingrese la fecha de nacimiento"
          type="date"
          isRequired
        />

        {/* Género */}
        <CustomSelect
          name="genero"
          label="Género"
          value={medico.genero}
          onChange={handleChange}
          items={generoOptions}
          placeholder="Seleccione un género"
          isRequired
        />
		
		{/* reg_msp */}
          <CustomInput
            name="reg_msp"
            label="Reg. MSP"
            value={medico.reg_msp}
            onChange={handleChange}
            placeholder="Ingrese el Reg. MSP"
            type="text"
          />

          {/* Celular */}
          <CustomInput
            name="celular"
            label="Celular"
            value={medico.celular}
            onChange={handleChange}
            placeholder="Ingrese el celular"
            type="tel"
          />

          {/* Teléfono */}
          <CustomInput
            name="telefono"
            label="Teléfono"
            value={medico.telefono}
            onChange={handleChange}
            placeholder="Ingrese el teléfono"
            type="tel"
            isRequired={false}
          />

          {/* Correo */}
          <CustomInput
            name="correo"
            label="Correo"
            value={medico.correo}
            onChange={handleChange}
            placeholder="Ingrese el correo"
            type="email"
          />
		  
		  {/* Especialidad */}
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

        {/* Estatus (activo/inactivo, número) */}
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
      {/* Botón de envío */}
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
};

MedicoForm.propTypes = {
  onSubmit: PropTypes.object,
  medicoData: PropTypes.object,
}

export default MedicoForm; 
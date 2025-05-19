"use client";

import PropTypes from "prop-types";
import React, { useReducer, useEffect } from "react";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import SectionTitle from "@/components/ui/SectionTitle";
import SubmitButton from "@/components/ui/SubmitButton";

  // Estado inicial para el formulario
  const initialState = {
    nombre_usuario: "",
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
    estado_civil: "",
    grupo_sanguineo: "",
    instruccion: "",
    ocupacion: "",
    empresa: "",
    discapacidad: false,
    orientacion: "",
    identidad: "",
    tipo_paciente: "",
    estatus: 1,
  };

  // Opciones para los selects (basadas en los enums de la base de datos)
  const generoOptions = [
    { key: "NINGUNO", label: "Ninguno" },
    { key: "MASCULINO", label: "Masculino" },
    { key: "FEMENINO", label: "Femenino" },
  ];

  const estadoCivilOptions = [
    { key: "SOLTERO/A", label: "Soltero/a" },
    { key: "CASADO/A", label: "Casado/a" },
    { key: "DIVORCIADO/A", label: "Divorciado/a" },
    { key: "VIUDO/A", label: "Viudo/a" },
    { key: "OTRO", label: "Otro" },
  ];

  const grupoSanguineoOptions = [
    { key: "NINGUNO", label: "Ninguno" },
    { key: "A RH+", label: "A RH+" },
    { key: "A RH-", label: "A RH-" },
    { key: "B RH+", label: "B RH+" },
    { key: "B RH-", label: "B RH-" },
    { key: "AB RH+", label: "AB RH+" },
    { key: "AB RH-", label: "AB RH-" },
    { key: "O RH+", label: "O RH+" },
    { key: "O RH-", label: "O RH-" },
  ];

  const instruccionOptions = [
    { key: "BÁSICA", label: "Básica" },
    { key: "BACHILLERATO", label: "Bachillerato" },
    { key: "SUPERIOR", label: "Superior" },
  ];

  const ocupacionOptions = [
    { key: "ABOGADO", label: "Abogado" },
    { key: "AGRICULTOR", label: "Agricultor" },
    { key: "AMA DE CASA", label: "Ama de casa" },
    { key: "BOMBERO", label: "Bombero" },
    { key: "COMERCIANTE", label: "Comerciante" },
    { key: "CONTADOR", label: "Contador" },
    { key: "DESEMPLEADO", label: "Desempleado" },
    { key: "DOCENTE", label: "Docente" },
    { key: "EMPLEADO PRIVADO", label: "Empleado privado" },
    { key: "EMPLEADO PÚBLICO", label: "Empleado público" },
    { key: "EMPRESARIO", label: "Empresario" },
    { key: "ESTUDIANTE", label: "Estudiante" },
    { key: "INGENIERO", label: "Ingeniero" },
    { key: "JUBILADO", label: "Jubilado" },
    { key: "MÉDICO", label: "Médico" },
    { key: "MILITAR", label: "Militar" },
    { key: "OBRERO", label: "Obrero" },
    { key: "POLICÍA", label: "Policía" },
    { key: "INDEPENDIENTE", label: "Independiente" },
    { key: "TÉCNICO", label: "Técnico" },
  ];

  const discapacidadOptions = [
    { key: "1", label: "Sí" },
    { key: "0", label: "No" },
  ];

  const orientacionOptions = [
    { key: "NINGUNO", label: "Ninguno" },
    { key: "HETEROSEXUAL", label: "Heterosexual" },
    { key: "HOMOSEXUAL", label: "Homosexual" },
    { key: "OTRO", label: "Otro" },
  ];

  const identidadOptions = [
    { key: "NINGUNO", label: "Ninguno" },
    { key: "CISGÉNERO", label: "Cisgénero" },
    { key: "BINARIO", label: "Binario" },
    { key: "NO BINARIO", label: "No binario" },
    { key: "INTERSEXUAL", label: "Intersexual" },
    { key: "TRANSEXUAL", label: "Transexual" },
    { key: "TRANSGÉNERO", label: "Transgénero" },
  ];

  const tipoPacienteOptions = [
    { key: "CIVIL", label: "Civil" },
    { key: "MILITAR", label: "Militar" },
  ];

  const estatusOptions = [
    { key: "1", label: "Activo" },
    { key: "0", label: "Inactivo" },
  ];

  function reducer(state, action) {
    return { ...state, [action.name]: action.value };
  }
  
  function PacienteForm({ onSubmit, pacienteData = {} }) {
    const [paciente, dispatch] = useReducer(reducer, {
      ...initialState,
      ...pacienteData,
    });
  
    useEffect(() => {
      const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
      if (nombreUsuarioGuardado) {
        dispatch({ name: "nombre_usuario", value: nombreUsuarioGuardado });
      }
    }, [pacienteData.nombre_usuario]);
  
    const handleChange = (name, value) => {
      dispatch({ name, value });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(paciente);
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
      role="form"
    >

      <SectionTitle text="Datos del Paciente" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

        <CustomInput
          //isReadOnly
          name="nombre_usuario"
          label="Nombre de usuario"
          value={paciente.nombre_usuario}
          onChange={handleChange}
          placeholder="Ingrese el nombre de usuario"
        />
        <CustomInput
          name="identificacion"
          label="Identificación"
          value={paciente.identificacion}
          onChange={handleChange}
          placeholder="Ingrese la identificación"
          type="text"
        />
        <CustomInput
          name="primer_nombre"
          label="Primer nombre"
          value={paciente.primer_nombre}
          onChange={handleChange}
          placeholder="Ingrese el primer nombre"
        />
        <CustomInput
          name="segundo_nombre"
          label="Segundo nombre"
          value={paciente.segundo_nombre}
          onChange={handleChange}
          placeholder="Ingrese el segundo nombre"
          isRequired={false}
        />
        <CustomInput
          name="primer_apellido"
          label="Primer apellido"
          value={paciente.primer_apellido}
          onChange={handleChange}
          placeholder="Ingrese el primer apellido"
          isRequired
        />
        <CustomInput
          name="segundo_apellido"
          label="Segundo apellido"
          value={paciente.segundo_apellido}
          onChange={handleChange}
          placeholder="Ingrese el segundo apellido"
          isRequired={false}
        />
        <CustomInput
          name="fecha_nacimiento"
          label="Fecha de nacimiento"
          value={paciente.fecha_nacimiento}
          onChange={handleChange}
          placeholder="Ingrese la fecha de nacimiento"
          type="date"
          isRequired
        />
        <CustomSelect
          name="genero"
          label="Género"
          value={paciente.genero}
          onChange={handleChange}
          items={generoOptions}
          placeholder="Seleccione un género"
          isRequired
        />
          <CustomInput
            name="celular"
            label="Celular"
            value={paciente.celular}
            onChange={handleChange}
            placeholder="Ingrese el celular"
            type="tel"
          />
          <CustomInput
            name="telefono"
            label="Teléfono"
            value={paciente.telefono}
            onChange={handleChange}
            placeholder="Ingrese el teléfono"
            type="tel"
            isRequired={false}
          />
          <CustomInput
            name="correo"
            label="Correo"
            value={paciente.correo}
            onChange={handleChange}
            placeholder="Ingrese el correo"
            type="email"
          />
          <CustomSelect
            name="estado_civil"
            label="Estado Civil"
            value={paciente.estado_civil}
            onChange={handleChange}
            items={estadoCivilOptions}
            placeholder="Seleccione un estado civil"
          />
          <CustomSelect
            name="grupo_sanguineo"
            label="Grupo Sanguíneo"
            value={paciente.grupo_sanguineo}
            onChange={handleChange}
            items={grupoSanguineoOptions}
            placeholder="Seleccione un grupo sanguíneo"
          />
          <CustomSelect
            name="instruccion"
            label="Instrucción"
            value={paciente.instruccion}
            onChange={handleChange}
            items={instruccionOptions}
            placeholder="Seleccione nivel de instrucción"
          />
        <CustomSelect
          name="ocupacion"
          label="Ocupación"
          value={paciente.ocupacion}
          onChange={handleChange}
          items={ocupacionOptions}
          placeholder="Seleccione la ocupación"
        />
        <CustomInput
          name="empresa"
          label="Empresa"
          value={paciente.empresa}
          onChange={handleChange}
          placeholder="Ingrese la empresa"
          isRequired={false}
        />
        <CustomSelect
            name="discapacidad"
            label="¿Tiene discapacidad?"
            value={paciente.discapacidad}
            onChange={handleChange}
            items={discapacidadOptions}
            transformValue={(val) => (val ? "1" : "0")}
            parseValue={(val) => val === "1"}
          />
        <CustomSelect
          name="orientacion"
          label="Orientación"
          value={paciente.orientacion}
          onChange={handleChange}
          items={orientacionOptions}
          placeholder="Seleccione la orientación"
        />
        <CustomSelect
          name="identidad"
          label="Identidad de Género"
          value={paciente.identidad}
          onChange={handleChange}
          items={identidadOptions}
          placeholder="Seleccione la identidad"
        />
        <CustomSelect
          name="tipo_paciente"
          label="Tipo de paciente"
          value={paciente.tipo_paciente}
          onChange={handleChange}
          items={tipoPacienteOptions}
          placeholder="Ingrese el tipo de paciente"
        />
        <CustomSelect
            name="estatus"
            label="Estatus"
            value={paciente.estatus}
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

PacienteForm.propTypes = {
  onSubmit: PropTypes.object,
  pacienteData: PropTypes.object,
}

export default PacienteForm; 
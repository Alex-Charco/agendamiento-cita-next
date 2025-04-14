"use client";

import PropTypes from "prop-types";
import React from "react";
import { CustomInput, CustomSelect } from "@/components/form";
import { SectionTitle, SubmitButton } from "@/components/ui";
import { useMedicoForm } from "@/hooks/useMedicoForm"; // cambia la ruta según tu estructura

function MedicoForm({ onSubmit, medicoData = {} }) {
  const {
    medico,
    handleChange,
    generoOptions,
    especialidadOptions,
    estatusOptions,
  } = useMedicoForm(medicoData);

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
        />
        <CustomSelect
          name="genero"
          label="Género"
          value={medico.genero}
          onChange={handleChange}
          items={generoOptions}
          placeholder="Seleccione un género"
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
}

MedicoForm.propTypes = {
  onSubmit: PropTypes.func,
  medicoData: PropTypes.object,
};

export default MedicoForm;

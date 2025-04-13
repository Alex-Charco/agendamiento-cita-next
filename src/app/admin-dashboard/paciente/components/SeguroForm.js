"use client";

import PropTypes from "prop-types";
import React, { useReducer, useEffect } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import SubmitButton from "@/components/ui/SubmitButton";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";

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

const tipoSeguroOptions = [
  { key: "SEGURO ISSFA", label: "SEGURO ISSFA" },
];

const beneficiarioOptions = [
  { key: "MILITAR ACTIVO", label: "Militar Activo" },
  { key: "MILITAR PASIVO", label: "Militar Pasivo" },
];

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function SeguroForm({ onSubmit, SeguroData = {} }) {
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

  const handleChange = (name, value) => {
    dispatch({ name, value });
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

      <SectionTitle text="Datos del Seguro" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInput
          label="Identificación paciente"
          name="identificacion_paciente"
          type="text"
          value={seguro.identificacion_paciente}
          onChange={handleChange}
        />
        <CustomSelect
          label="Tipo de seguro"
          placeholder="Seleccionar tipo de seguro"
          value={seguro.tipo}
          onChange={handleChange}
          items={tipoSeguroOptions}
        />
        <CustomSelect
          label="Beneficiario"
          placeholder="Seleccionar tipo de beneficiario"
          value={seguro.beneficiario}
          onChange={handleChange}
          items={beneficiarioOptions}
        />
        <CustomInput
          label="Código"
          type="text"
          name="codigo"
          placeholder="Escribir el código"
          value={seguro.codigo}
          onChange={handleChange}
        />
        <CustomInput
          isRequired
          className="w-full"
          label="Cobertura"
          type="number"
          name="cobertura"
          placeholder="Escribir la cobertura"
          value={seguro.cobertura}
          onChange={handleChange}
        />
        <CustomInput
          label="Porcentaje"
          type="number"
          step="0.01"
          name="porcentaje"
          placeholder="Escribir el porcentaje"
          value={seguro.porcentaje}
          onChange={handleChange}
        />
        <CustomInput
          label="Fecha inicio"
          name="fecha_inicio"
          //placeholder="Escribir la provincia"
          type="date"
          value={seguro.fecha_inicio}
          onChange={handleChange}
        />
        <CustomInput
          label="Fecha fin"
          type="date"
          name="fecha_fin"
          //placeholder="Escribir el cantón"
          value={seguro.fecha_fin}
          onChange={handleChange}
        />
      </div>

      <SubmitButton
        text={SeguroData?.id_paciente ? "Actualizar Seguro" : "Registrar Seguro"}
      />

    </form>
  );
}

SeguroForm.propTypes = {
  onSubmit: PropTypes.object,
  SeguroData: PropTypes.object,
}

export default SeguroForm;
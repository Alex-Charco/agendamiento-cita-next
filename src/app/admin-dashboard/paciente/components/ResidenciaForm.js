"use client";

import PropTypes from "prop-types";
import React, { useReducer, useEffect } from "react";
import CustomInput from "@/components/form/CustomInput";
import { FaHospitalUser } from "react-icons/fa";

const initialState = {
  identificacion_paciente: "",
  lugar_nacimiento: "",
  pais: "",
  nacionalidad: "",
  provincia: "",
  canton: "",
  parroquia: "",
  direccion: ""
  ,
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function ResidenciaForm({ onSubmit, residenciaData = {} }) {
  const [residencia, dispatch] = useReducer(reducer, {
    ...initialState,
    ...residenciaData,
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
    onSubmit(residencia);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" /> Datos de la Residencia
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInput
          name="identificacion_paciente"
          label="Identificación paciente"
          type="text"
          value={residencia.identificacion_paciente}
          onChange={handleChange}
        />
        <CustomInput
          label="Lugar de nacimiento"
          name="lugar_nacimiento"
          placeholder="Escribir lugar de nacimiento"
          type="text"
          value={residencia.lugar_nacimiento}
          onChange={handleChange}
        />
        <CustomInput
          label="País"
          type="text"
          name="pais"
          placeholder="Escribir el país"
          value={residencia.pais}
          onChange={handleChange}
        />
        <CustomInput
          label="Nacionalidad"
          type="text"
          name="nacionalidad"
          placeholder="Escribir la nacionalidad"
          value={residencia.nacionalidad}
          onChange={handleChange}
        />
        <CustomInput
          label="Provincia"
          name="provincia"
          placeholder="Escribir la provincia"
          type="text"
          value={residencia.provincia}
          onChange={handleChange}
        />
        <CustomInput
          label="Cantón"
          type="text"
          name="canton"
          placeholder="Escribir el cantón"
          value={residencia.canton}
          onChange={handleChange}
        />
        <CustomInput
          label="Parroquia"
          type="text"
          name="parroquia"
          placeholder="Escribir la parroquia"
          value={residencia.parroquia}
          onChange={handleChange}
        />
        <CustomInput
          label="Dirección"
          type="text"
          name="direccion"
          placeholder="Escribir la dirección"
          value={residencia.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
        {residenciaData?.id_paciente ? "Actualizar residencia" : "Registrar residencia"}
      </button>
      </div>
    </form>
  );
}

ResidenciaForm.propTypes = {
  onSubmit: PropTypes.object,
  residenciaData: PropTypes.object,
}

export default ResidenciaForm;
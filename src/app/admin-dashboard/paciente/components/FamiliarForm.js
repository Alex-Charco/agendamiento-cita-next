"use client";

import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { FaHospitalUser } from "react-icons/fa";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";

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

// Opciones para los selects (basadas en los enums de la base de datos)
const generoOptions = [
  { key: "NINGUNO", label: "Ninguno" },
  { key: "MASCULINO", label: "Masculino" },
  { key: "FEMENINO", label: "Femenino" },
];

const estatusOptions = [
  { key: "1", label: "Activo" },
  { key: "0", label: "Inactivo" },
];

const relacionOptions = [
  { key: "ABUELO/A", label: "Abuelo/a" },
  { key: "PADRE", label: "Padre" },
  { key: "MADRE", label: "Madre" },
  { key: "ESPOSO/A", label: "Esposo/a" },
  { key: "HERMANO/A", label: "Hermano/a" },
  { key: "PRIMO/A", label: "Primo/a" },
  { key: "TÍO/A", label: "Tío/a" },
];

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

  const handleChange = (name, value) => {
    dispatch({ name, value });
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
      
      <SectionTitle text="Datos del Familiar" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInput
          isRequired
          label="Identificación paciente"
          name="identificacion_paciente"
          type="text"
          value={familiar.identificacion_paciente}
          onChange={handleChange}
        />
        <CustomInput
          isRequired
          label="Identificación"
          name="identificacion"
          placeholder="Escribir la identificación"
          type="text"
          value={familiar.identificacion}
          onChange={handleChange}
        />
        <CustomInput
          isRequired
          label="Primer Nombre"
          name="primer_nombre"
          placeholder="Escribir el primer nombre"
          type="text"
          value={familiar.primer_nombre}
          onChange={handleChange}
        />
        <CustomInput
          label="Segundo Nombre"
          name="segundo_nombre"
          placeholder="Escribir el segundo nombre"
          type="text"
          value={familiar.segundo_nombre}
          onChange={handleChange}
          isRequired={false}
        />
        <CustomInput
          isRequired
          label="Primer Apellido"
          name="primer_apellido"
          placeholder="Escribir el primer apellido"
          type="text"
          value={familiar.primer_apellido}
          onChange={handleChange}
        />
        <CustomInput
          label="Segundo Apellido"
          name="segundo_apellido"
          placeholder="Escribir el segundo apellido"
          type="text"
          value={familiar.segundo_apellido}
          onChange={handleChange}
          isRequired={false}
        />
        <CustomInput
          isRequired
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={familiar.fecha_nacimiento}
          onChange={handleChange}
        />
        {/* Género */}
        <CustomSelect
          name="genero"
          label="Género"
          value={familiar.genero}
          onChange={handleChange}
          items={generoOptions}
          placeholder="Seleccione un género"
          isRequired
        />
        <CustomInput
          isRequired
          label="Celular"
          name="celular"
          type="tel"
          placeholder="Escribir número de celular"
          value={familiar.celular}
          onChange={handleChange}
        />
        <CustomInput
          label="Teléfono"
          name="telefono"
          type="tel"
          placeholder="Escribir número de teléfono"
          value={familiar.telefono}
          onChange={handleChange}
        />
        <CustomInput
          isRequired
          label="Correo"
          name="correo"
          type="email"
          placeholder="Escribir el correo electrónico"
          value={familiar.correo}
          onChange={handleChange}
          className="md:col-span-2"
        />
        <CustomSelect
          isRequired
          label="Estatus"
          placeholder="Seleccionar el estatus"
          value={familiar.estatus}
          onChange={handleChange}
          items={estatusOptions}
          transformValue={(val) => String(val)}
          parseValue={(val) => parseInt(val)}
        /> 
        <CustomSelect
          name="relacion"
          label="Relación"
          value={familiar.relacion}
          onChange={handleChange}
          items={relacionOptions}
          placeholder="Seleccione nivel de instrucción"
        />
        <CustomInput
          label="Dirección"
          name="direccion"
          type="text"
          placeholder="Escribir la dirección"
          value={familiar.direccion}
          onChange={handleChange}
          className="md:col-span-2"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {familiarData?.id_paciente ? "Actualizar familiar" : "Registrar familiar"}
        </button>
      </div>
    </form>
  );
}

// Validación de props
FamiliarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validación para 'onSubmit'
  familiarData: PropTypes.object, // Prop 'familiarData' es opcional
};

export default FamiliarForm;
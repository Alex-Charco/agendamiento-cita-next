"use client";

import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const initialState = {
  nombre_usuario: "",
  nombre_rol: "",
  estatus: false,
};

function reducer(state, action) {
  return { ...state, [action.name]: action.value };
}

function EstatusUsuarioForm({ onSubmit, estatusUsuarioData = {} }) {
  const [usuario, dispatch] = useReducer(reducer, {
    ...initialState,
    ...estatusUsuarioData,
  });

  useEffect(() => {
    const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
    if (nombreUsuarioGuardado) {
      dispatch({ name: "nombre_usuario", value: nombreUsuarioGuardado });
    }
  }, [estatusUsuarioData.nombre_usuario]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({ name, value: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
        <FaHospitalUser className="text-blue-600" /> Datos del Usuario
      </h2>
        {/* Campo de Nombre de Usuario y nombre_rol - No Editable */}
        <Input
          isRequired
		  isReadOnly
          className="w-full"
          label="Nombre usuario"
          name="nombre_usuario"
          type="text"
          value={usuario.nombre_usuario}
          onChange={handleChange}
        />
        <Input
          isRequired
		  isReadOnly
          className="w-full"
          label="Nombre del rol"
          name="nombre_rol"
          type="text"
          value={usuario.nombre_rol}
          onChange={handleChange}
        />
		<Select
          isRequired
          className="w-full"
          label="Actualizar Estatus"
          placeholder="Seleccionar el estatus"
          selectedKeys={
            usuario.estatus !== null &&
            usuario.estatus !== undefined
              ? [String(usuario.estatus)]
              : []
          }
          onSelectionChange={(keys) =>
            dispatch({
              name: "estatus",
              value: parseInt(Array.from(keys)[0]),
            })
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

      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        {usuario.id_usuario ? "Actualizar Paciente" : "Registrar Paciente"}
      </Button>
    </form>
  );
}

EstatusUsuarioForm.propTypes = {
  onSubmit: PropTypes.object,
  estatusUsuarioData: PropTypes.object,
};

export default EstatusUsuarioForm;
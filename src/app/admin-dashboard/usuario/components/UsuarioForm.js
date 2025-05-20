import PropTypes from "prop-types";
import React, { useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaHospitalUser } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const roles = [
    { key: "3", label: "Administrador" },
    { key: "2", label: "Médico" },
    { key: "1", label: "Paciente" },
];

function UsuarioForm({ onSubmit, usuarioData = {} }) {
    const [usuario, setUsuario] = useState({
        nombre_usuario: usuarioData.nombre_usuario || "",
        password: usuarioData.password || "",
        estatus: usuarioData.estatus ?? 1,
        id_rol: usuarioData.id_rol || "",
    });

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(usuario);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaHospitalUser className="text-blue-600" /> Registrar usuario
            </h2>

            <Input
                isRequired
                className="w-full"
                label="Nombre usuario"
                name="nombre_usuario"
                type="text"
                value={usuario.nombre_usuario}
                onChange={handleInputChange}
            />

            <Input
                isRequired
                className="w-full"
                label="Contraseña"
                name="password"
                type={isVisible ? "text" : "password"}
                value={usuario.password}
                onChange={handleInputChange}
                endContent={
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="h-full flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
                        aria-label="Mostrar u ocultar contraseña"
                    >
                        {isVisible ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                    </button>
                }
            />

            <Select
                isRequired
                className="w-full"
                label="Rol"
                placeholder="Seleccionar rol"
                selectedKeys={usuario.id_rol ? [usuario.id_rol] : []}
                onSelectionChange={(keys) =>
                    setUsuario({ ...usuario, id_rol: Array.from(keys)[0] })
                }
                items={roles}
                aria-label="Seleccionar rol de usuario"
            >
                {(role) => (
                    <SelectItem className="text-gray-600" key={role.key}>
                        {role.label}
                    </SelectItem>
                )}
            </Select>

            <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Enviar
            </Button>
        </form>
    );
}

UsuarioForm.propTypes = {
    onSubmit: PropTypes.object,
    usuarioData: PropTypes.object,
};

export default UsuarioForm;

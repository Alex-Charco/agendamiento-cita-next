import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaHospitalUser, FaChevronDown } from "react-icons/fa6";

const roles = [
    { key: "3", label: "Administrador" },
    { key: "2", label: "Doctor" },
    { key: "1", label: "Paciente" },
];

export default function UsuarioForm({ onSubmit, usuarioData = {} }) {
    const [usuario, setUsuario] = useState({
        nombre_usuario: usuarioData.nombre_usuario || "",
        password: usuarioData.password || "",
        estatus: usuarioData.estatus ?? 1,
        id_rol: usuarioData.id_rol || "",
    });

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
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
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
                type="password"
                value={usuario.password}
                onChange={handleInputChange}
            />

            {/* Select con icono alineado más a la derecha */}
            <Select
				isRequired
                className="w-full relative"
                label="Rol"
                placeholder="Seleccionar rol"
                selectedKeys={usuario.id_rol ? [usuario.id_rol] : []}
                onSelectionChange={(keys) => setUsuario({ ...usuario, id_rol: Array.from(keys)[0] })}
                items={roles}
                aria-label="Seleccionar rol de usuario"
            >
                {(role) => <SelectItem className="text-gray-600" key={role.key}>{role.label}</SelectItem>}
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

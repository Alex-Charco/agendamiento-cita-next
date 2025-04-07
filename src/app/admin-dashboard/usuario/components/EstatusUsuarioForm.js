import { useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { FaHospitalUser, FaChevronDown } from "react-icons/fa6";

export default function EstatusUsuarioForm({ onSubmit, estatusUsuarioData = {} }) {
    const [usuario, setUsuario] = useState({
        nombre_usuario: estatusUsuarioData.nombre_usuario || "",
        estatus: estatusUsuarioData.estatus || "",
        nombre_rol: estatusUsuarioData.nombre_rol || "",
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
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaHospitalUser className="text-blue-600" /> Registrar usuario 1
            </h2>

            <Input
                isRequired
				isReadOnly
                className="w-full"
                label="Nombre usuario"
                name="nombre_usuario"
                type="text"
                value={usuario.nombre_usuario}
                onChange={handleInputChange}
            />

            <Input
                isRequired
				isReadOnly
                className="w-full"
                label="Nombre rol"
                name="nombre_rol"
                type="text"
                value={usuario.nombre_rol}
                onChange={handleInputChange}
            />

            <Select
			  isRequired
			  className="w-full"
			  label="Estatus"
			  placeholder="Seleccionar el estatus"
			  selectedKeys={
				usuario.estatus !== null && usuario.estatus !== undefined
				  ? [String(usuario.estatus)]
				  : []
			  }
			  onSelectionChange={(keys) => {
				  const selected = Array.from(keys)[0];
				  setUsuario((prev) => ({
					...prev,
					estatus: parseInt(selected),
				  }));
				}}
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
                Enviar
            </Button>
        </form>
    );
}

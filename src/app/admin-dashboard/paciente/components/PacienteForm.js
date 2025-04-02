"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaHospitalUser } from "react-icons/fa";
import { Button, Input, Textarea, Checkbox, Select, SelectItem } from "@heroui/react";

export default function PacienteForm({ onSubmit, pacienteData = {} }) {
    const [paciente, setPaciente] = useState({
		nombre_usuario: pacienteData.nombre_usuario || "",
		identificacion: pacienteData.identificacion || "",
		fecha_nacimiento: pacienteData.fecha_nacimiento || "",
        primer_nombre: pacienteData.primer_nombre || "",
        segundo_nombre: pacienteData.segundo_nombre || "",
        primer_apellido: pacienteData.primer_apellido || "",
        segundo_apellido: pacienteData.segundo_apellido || "",
        genero: pacienteData.genero || "",
        celular: pacienteData.celular || "",
        telefono: pacienteData.telefono || "",
        correo: pacienteData.correo || "",
        estado_civil: pacienteData.estado_civil || "",
        grupo_sanguineo: pacienteData.grupo_sanguineo || "",
        instruccion: pacienteData.instruccion || "",
        ocupacion: pacienteData.ocupacion || "",
        empresa: pacienteData.empresa || "",
        discapacidad: pacienteData.discapacidad || false,
        orientacion: pacienteData.orientacion || "",
        identidad: pacienteData.identidad || "",
        tipo_paciente: pacienteData.tipo_paciente || "",
        estatus: pacienteData.estatus ?? 1, // Evita undefined
    });

    useEffect(() => {
        if (pacienteData && Object.keys(pacienteData).length > 0) {
            setPaciente(prev => ({
                ...prev,
                ...pacienteData
            }));
        }
    }, [pacienteData]); // Se ejecuta solo cuando `pacienteData` cambia

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPaciente((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value || "", // Evita undefined
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");
            const apiUrl = paciente.id_paciente
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/update/${paciente.id_paciente}`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/create`;

            const method = paciente.id_paciente ? "put" : "post";

            const response = await axios({
                method,
                url: apiUrl,
                data: paciente,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            onSubmit(response.data);
        } catch (error) {
            console.error("Error al enviar los datos", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaHospitalUser className="text-blue-600" /> Datos del Paciente
            </h2>

            {/* Campos de nombre de usuario */}
                    <Input
						isRequired
					    className="w-full"
					    defaultValue="Ingresar el nombre de usuario"
					    label="Nombre usuario"
						name= "nombre_usuario"
					    type="text"
						value={paciente.nombre_usuario}
                        onChange={handleInputChange}
                    />
				{/* Campo de identificación */}
                <Input
					isRequired
					    className="w-full"
					    defaultValue="Ingresar la identificacion"
					    label="Identificación"
						name= "identificacion"
					    type="text"
						value={paciente.identificacion}
                        onChange={handleInputChange}
                />
                    <Input
						isRequired
					    className="w-full"
					    defaultValue="Ingresar el primer nombre"
					    label="Primer Nombre"
					    type="text"
						value={paciente.primer_nombre}
                        onChange={handleInputChange}
                    />
                    <Input
						isRequired
					    className="mw-full"
					    defaultValue="Ingresar el segundo nombre"
						label="Segundo Nombre"
                        type="text"
                        name="segundo_nombre"
                        value={paciente.segundo_nombre}
                        onChange={handleInputChange}
                    />

					{/* Campos de apellidos */}
                    <Input
						isRequired
					    className="w-full"
					    defaultValue="Ingresar el primer apellido"
						label="Primer Apellido"
                        type="text"
                        name="primer_apellido"
                        value={paciente.primer_apellido}
                        onChange={handleInputChange}
                    />
                    <Input
						isRequired
					    className="w-full"
					    defaultValue="Ingresar el segundo apellido"
						label="Segundo Apellido"
                        type="text"
                        name="segundo_apellido"
                        value={paciente.segundo_apellido}
                        onChange={handleInputChange}
                    />
			{/* Campos de fecha de nacimiento y género */}
            <div className="grid grid-cols-2 gap-6">
                    <Input
						isRequired
					    className="max-w-xs"
						label="Fecha de nacimiento"
                        type="date"
                        name="fecha_nacimiento"
                        value={paciente.fecha_nacimiento}
                        onChange={handleInputChange}
                    />
                    <Select
					className="max-w-xs"
                    name="genero"
					label="Genero"
                    value={paciente.genero}
                    onChange={handleInputChange}
                    placeholder="Seleccione Género"
                >
                    <SelectItem value="NINGUNO">Seleccione Género</SelectItem>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="FEMENINO">Femenino</SelectItem>
                </Select>
            </div>

            {/* Campos de celular y teléfono */}
            <div className="grid grid-cols-2 gap-6">
                    <Input
						isRequired
					    className="max-w-xs"
						label="Celular"
                        type="tel"
                        name="celular"
                        value={paciente.celular}
                        onChange={handleInputChange}
                    />
                    <Input
						isRequired
					    className="max-w-xs"
						label="Teléfono"
                        type="tel"
                        name="telefono"
                        value={paciente.telefono}
                        onChange={handleInputChange}
                    />
            </div>

				{/* Campo de correo */}
                <Input
					isRequired
					className="w-full"
					label="Correo"
                    type="email"
                    name="correo"
                    value={paciente.correo}
                    onChange={handleInputChange}
                />

            {/* Campos de estado civil, grupo sanguíneo, instrucción, ocupación */}
            <div className="grid grid-cols-2 gap-6">
					<Select
						className="max-w-xs"
						label="Estado Civil"
						name="estado_civil"
                        value={paciente.estado_civil}
                        onChange={handleInputChange}
						placeholder="Seleccione Género"
					>
						<SelectItem value="SOLTERO/A">Soltero</SelectItem>
						<SelectItem value="CASADO/A">Casado/a</SelectItem>
						<SelectItem value="DIVORCIADO/A">Divorciado/a</SelectItem>
						<SelectItem value="VIUDO/A">Viudo/a</SelectItem>
						<SelectItem value="OTRO">Otro</SelectItem>
					</Select>
					<Select
						className="max-w-xs"
						label="Grupo Sanguíneo"
						name="grupo_sanguineo"
                        value={paciente.grupo_sanguineo}
                        onChange={handleInputChange}
						placeholder="Seleccione grupo sanguineo"
					>
						<SelectItem value="NINGUNO">Ninguno</SelectItem>
						<SelectItem value="A RH+">A RH+</SelectItem>
						<SelectItem value="A RH-">A RH-</SelectItem>
						<SelectItem value="B RH+">B RH+</SelectItem>
						<SelectItem value="B RH-">B RH-</SelectItem>
						<SelectItem value="AB RH+">AB RH+</SelectItem>
						<SelectItem value="AB RH-">AB RH-</SelectItem>
						<SelectItem value="O RH+">O RH+</SelectItem>
						<SelectItem value="O RH-">O RH-</SelectItem>
					</Select>

            </div>

            {/* Campos adicionales */}
            <div className="grid grid-cols-2 gap-6">
                    <Input
						isRequired
					    className="max-w-xs"
					    defaultValue="Ingresar la ocupación"
						label="Ocupación"
                        type="text"
                        name="ocupacion"
                        value={paciente.ocupacion}
                        onChange={handleInputChange}
                    />
                    <Input
						isRequired
					    className="max-w-xs"
					    defaultValue="Ingresar nombre de la empresa"
						label="Empresa"
                        type="text"
                        name="empresa"
                        value={paciente.empresa}
                        onChange={handleInputChange}
                    />
            </div>

            {/* Información sobre discapacidad */}
            <div className="flex items-center gap-3">
                <Checkbox
                    name="discapacidad"
                    checked={paciente.discapacidad}
                    onChange={handleInputChange}
                >
				¿Padece alguna discapacidad?
				</Checkbox>
            </div>

            {/* Enviar botón */}
            <Button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                {paciente.id_paciente ? "Actualizar Paciente" : "Registrar Paciente"}
            </Button>
        </form>
    );
}

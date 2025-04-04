"use client";

import { useReducer,  useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@heroui/react";

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

function reducer(state, action) {
	return { ...state, [action.name]: action.value };
}

export default function PacienteForm({ onSubmit, pacienteData = {} }) {
	const [paciente, dispatch] = useReducer(reducer, { ...initialState, ...pacienteData });

	useEffect(() => {
		const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
		if (nombreUsuarioGuardado) {
			dispatch({ name: "nombre_usuario", value: nombreUsuarioGuardado });
		}
	}, [pacienteData.nombre_usuario]);
	
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		dispatch({ name, value: type === "checkbox" ? checked : value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(paciente);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
				<FaHospitalUser className="text-blue-600" /> Datos del Paciente
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Campo de Nombre de Usuario - No Editable */}
				<Input
					isRequired
					className="w-full"
					label="Nombre usuario"
					name="nombre_usuario"
					type="text"
					value={paciente.nombre_usuario}
					readOnly // Hace que el input no sea editable
				/>
				<Input
					isRequired
					className="w-full"
					label="Identificación"
					name="identificacion"
					placeholder="Escribir la identificación"
					type="text"
					value={paciente.identificacion}
					onChange={handleChange}
				/>
				<Input
					isRequired
					className="w-full"
					label="Primer Nombre"
					type="text"
					name="primer_nombre"
					placeholder="Escribir el primer nombre"
					value={paciente.primer_nombre}
					onChange={handleChange}
				/>
				<Input
					className="w-full"
					label="Segundo Nombre"
					type="text"
					name="segundo_nombre"
					placeholder="Escribir el segundo nombre"
					value={paciente.segundo_nombre}
					onChange={handleChange}
				/>
				<Input
					isRequired
					className="w-full"
					label="Primer Apellido"
					name="primer_apellido"
					placeholder="Escribir el primer apellido"
					type="text" value={paciente.primer_apellido}
					onChange={handleChange}
				/>
				<Input
					className="w-full"
					label="Segundo Apellido"
					type="text"
					name="segundo_apellido"
					placeholder="Escribir el segundo apellido"
					value={paciente.segundo_apellido}
					onChange={handleChange}
				/>
				<Input
					isRequired
					className="w-full"
					label="Fecha de nacimiento"
					type="date"
					name="fecha_nacimiento"
					value={paciente.fecha_nacimiento}
					onChange={handleChange}
				/>
				<Select
					isRequired
					className="w-full"
					label="Género"
					placeholder="Seleccionar un género"
					selectedKeys={paciente.genero ? [paciente.genero] : []}
					onSelectionChange={(keys) => dispatch({ name: "genero", value: Array.from(keys)[0] })}
					items={[
						{ key: "NINGUNO", label: "Ninguno" },
						{ key: "MASCULINO", label: "Masculino" },
						{ key: "FEMENINO", label: "Femenino" },
					]}
				>
					{(item) => <SelectItem key={item.key} className="text-gray-600">
						{item.label}
					</SelectItem>}
				</Select>
				<Input
					isRequired
					className="w-full"
					label="Celular"
					type="tel"
					name="celular"
					placeholder="Escribir número de celular"
					value={paciente.celular}
					onChange={handleChange}
				/>
				<Input
					className="w-full"
					label="Teléfono"
					type="tel"
					name="telefono"
					placeholder="Escribir número de teléfono"
					value={paciente.telefono}
					onChange={handleChange}
				/>
				<Input
					isRequired
					className="w-full md:col-span-2"
					label="Correo"
					type="email"
					name="correo"
					placeholder="Escribir el correo electrónico"
					value={paciente.correo}
					onChange={handleChange}
				/>
				<Select
					isRequired
					className="w-full"
					label="Estado Civil"
					placeholder="Seleccionar estado civil"
					selectedKeys={paciente.estado_civil ? [paciente.estado_civil] : []}
					onSelectionChange={(keys) => dispatch({ name: "estado_civil", value: Array.from(keys)[0] })}
					items={[
						{ key: "SOLTERO/A", label: "Soltero/a" },
						{ key: "CASADO/A", label: "Casado/a" },
						{ key: "DIVORCIADO/A", label: "Divorciado/a" },
						{ key: "VIUDO/A", label: "Viudo/a" },
						{ key: "OTRO", label: "Otro" },
					]}
				>
					{(item) => <SelectItem key={item.key} className="text-gray-600">
						{item.label}
					</SelectItem>}
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Grupo Sanguíneo"
					placeholder="Seleccionar grupo sanguíneo"
					selectedKeys={paciente.grupo_sanguineo ? [paciente.grupo_sanguineo] : []}
					onSelectionChange={(keys) => dispatch({ name: "grupo_sanguineo", value: Array.from(keys)[0] })}
					items={[
						{ key: "NINGUNO", label: "Ninguno" },
						{ key: "A RH+", label: "A RH+" },
						{ key: "A RH-", label: "A RH-" },
						{ key: "B RH+", label: "B RH+" },
						{ key: "B RH-", label: "B RH-" },
						{ key: "AB RH+", label: "AB RH+" },
						{ key: "AB RH-", label: "AB RH-" },
						{ key: "O RH+", label: "O RH+" },
						{ key: "O RH-", label: "O RH-" },
					]}
				>
					{(item) => <SelectItem key={item.key} className="text-gray-600">
						{item.label}
					</SelectItem>}
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Nivel de Instrucción"
					placeholder="Seleccionar nivel instrucción"
					selectedKeys={paciente.instruccion ? [paciente.instruccion] : []}
					onSelectionChange={(keys) => dispatch({ name: "instruccion", value: Array.from(keys)[0] })}
					items={[
						{ key: "BÁSICA", label: "Básica" },
						{ key: "BACHILLERATO", label: "Bachillerato" },
						{ key: "SUPERIOR", label: "Superior" },
					]}
				>
					{(item) => <SelectItem key={item.key} className="text-gray-600">
						{item.label}
					</SelectItem>}
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Ocupación"
					placeholder="Seleccionar ocupación"
					selectedKeys={paciente.ocupacion ? [paciente.ocupacion] : []}
					onSelectionChange={(keys) => dispatch({ name: "ocupacion", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "ABOGADO", label: "Abogado" },
						{ key: "AGRICULTOR", label: "Agricultor" },
						{ key: "AMA DE CASA", label: "Ama de Casa" },
						{ key: "BOMBERO", label: "Bombero" },
						{ key: "COMERCIANTE", label: "Comerciante" },
						{ key: "CONTADOR", label: "Contador" },
						{ key: "DESEMPLEADO", label: "Desempleado" },
						{ key: "DOCENTE", label: "Docente" },
						{ key: "EMPLEADO PRIVADO", label: "Empleado Privado" },
						{ key: "EMPLEADO PÚBLICO", label: "Empleado Público" },
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
					]}
				>
					{(item) => <SelectItem key={item.key} className="text-gray-600">
						{item.label}
					</SelectItem>}
				</Select>
				<Input className="w-full" label="Empresa" type="text" name="empresa" placeholder="Escribir nombre de la empresa" value={paciente.empresa} onChange={handleChange} />
				<Select
					isRequired
					className="w-full"
					label="Discapacidad"
					placeholder="¿Padece discapacidad?"
					selectedKeys={paciente.discapacidad !== null && paciente.discapacidad !== undefined ? [String(paciente.discapacidad)] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "discapacidad", value: parseInt(Array.from(keys)[0]) })
					}
					items={[
						{ key: "1", label: "Sí" },
						{ key: "0", label: "No" },
					]}
				>
					{(item) => (
						<SelectItem key={item.key} className="text-gray-600">
							{item.label}
						</SelectItem>
					)}
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Orientación"
					placeholder="Seleccionar la orientación"
					selectedKeys={paciente.orientacion ? [paciente.orientacion] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "orientacion", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "NINGUNO", label: "Ninguno" },
						{ key: "HETEROSEXUAL", label: "Heterosexual" },
						{ key: "HOMOSEXUAL", label: "Homosexual" },
						{ key: "OTRO", label: "Otro" },
					]}
				>
					{(item) => (
						<SelectItem key={item.key} className="text-gray-600">
							{item.label}
						</SelectItem>
					)}
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Identidad de Género"
					placeholder="Seleccionar identidad de género"
					selectedKeys={paciente.identidad ? [paciente.identidad] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "identidad", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "NINGUNO", label: "Ninguno" },
						{ key: "CISGÉNERO", label: "Cisgénero" },
						{ key: "BINARIO", label: "Binario" },
						{ key: "NO BINARIO", label: "No Binario" },
						{ key: "INTERSEXUAL", label: "Intersexual" },
						{ key: "TRANSEXUAL", label: "Transexual" },
						{ key: "TRANSGÉNERO", label: "Transgénero" },
					]}
				>
					{(item) => (
						<SelectItem key={item.key} className="text-gray-600">
							{item.label}
						</SelectItem>
					)}
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Tipo de Paciente"
					placeholder="Seleccionar tipo de paciente"
					selectedKeys={paciente.tipo_paciente ? [paciente.tipo_paciente] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "tipo_paciente", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "CIVIL", label: "Civil" },
						{ key: "MILITAR", label: "Militar" },
					]}
				>
					{(item) => (
						<SelectItem key={item.key} className="text-gray-600">
							{item.label}
						</SelectItem>
					)}
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Estatus"
					placeholder="Seleccionar el estatus"
					selectedKeys={
						paciente.estatus !== null && paciente.estatus !== undefined
							? [String(paciente.estatus)]
							: []
					}
					onSelectionChange={(keys) =>
						dispatch({ name: "estatus", value: parseInt(Array.from(keys)[0]) })
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

			</div>

			<Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
				{paciente.id_paciente ? "Actualizar Paciente" : "Registrar Paciente"}
			</Button>
		</form>
	);
}

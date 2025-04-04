"use client";

import { useReducer } from "react";
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
					className="w-full relative"
					name="genero"
					label="Género"
					placeholder="Seleccionar un género"
					value={paciente.genero}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="NINGUNO">Seleccione Género</SelectItem>
					<SelectItem className="text-gray-600" value="MASCULINO">Masculino</SelectItem>
					<SelectItem className="text-gray-600" value="FEMENINO">Femenino</SelectItem>
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
					name="estado_civil"
					placeholder="Seleccionar estado civil"
					value={paciente.estado_civil}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="SOLTERO/A">Soltero</SelectItem>
					<SelectItem className="text-gray-600" value="CASADO/A">Casado/a</SelectItem>
					<SelectItem className="text-gray-600" value="DIVORCIADO/A">Divorciado/a</SelectItem>
					<SelectItem className="text-gray-600" value="VIUDO/A">Viudo/a</SelectItem>
					<SelectItem className="text-gray-600" value="OTRO">Otro</SelectItem>
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Grupo Sanguíneo"
					name="grupo_sanguineo"
					placeholder="Seleccionar grupo sanguineo"
					value={paciente.grupo_sanguineo}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="NINGUNO">Ninguno</SelectItem>
					<SelectItem className="text-gray-600" value="A RH+">A RH+</SelectItem>
					<SelectItem className="text-gray-600" value="A RH-">A RH-</SelectItem>
					<SelectItem className="text-gray-600" value="B RH+">B RH+</SelectItem>
					<SelectItem className="text-gray-600" value="B RH-">B RH-</SelectItem>
					<SelectItem className="text-gray-600" value="AB RH+">AB RH+</SelectItem>
					<SelectItem className="text-gray-600" value="AB RH-">AB RH-</SelectItem>
					<SelectItem className="text-gray-600" value="O RH+">O RH+</SelectItem>
					<SelectItem className="text-gray-600" value="O RH-">O RH-</SelectItem>
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Nivel de Instrucción"
					name="instruccion"
					placeholder="Seleccionar nivel instrucción"
					value={paciente.instruccion}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="BÁSICA">Básica</SelectItem>
					<SelectItem className="text-gray-600" value="BACHILLERATO">Bachillerato</SelectItem>
					<SelectItem className="text-gray-600" value="SUPERIOR">Superior</SelectItem>
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Ocupación"
					name="ocupacion"
					placeholder="Seleccionar ocupación"
					value={paciente.ocupacion}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="ABOGADO">Abogado</SelectItem>
					<SelectItem className="text-gray-600" value="AGRICULTOR">Agricultor</SelectItem>
					<SelectItem className="text-gray-600" value="AMA DE CASA">Ama de Casa</SelectItem>
					<SelectItem className="text-gray-600" value="BOMBERO">Bombero</SelectItem>
					<SelectItem className="text-gray-600" value="COMERCIANTE">Comerciante</SelectItem>
					<SelectItem className="text-gray-600" value="CONTADOR">Contador</SelectItem>
					<SelectItem className="text-gray-600" value="DESEMPLEADO">Desempleado</SelectItem>
					<SelectItem className="text-gray-600" value="DOCENTE">Docente</SelectItem>
					<SelectItem className="text-gray-600" value="EMPLEADO PRIVADO">Empleado Privado</SelectItem>
					<SelectItem className="text-gray-600" value="EMPLEADO PÚBLICO">Empleado Público</SelectItem>
					<SelectItem className="text-gray-600" value="EMPRESARIO">Empresario</SelectItem>
					<SelectItem className="text-gray-600" value="ESTUDIANTE">Estudiante</SelectItem>
					<SelectItem className="text-gray-600" value="INGENIERO">Ingeniero</SelectItem>
					<SelectItem className="text-gray-600" value="JUBILADO">Jubilado</SelectItem>
					<SelectItem className="text-gray-600" value="MÉDICO">Médico</SelectItem>
					<SelectItem className="text-gray-600" value="MILITAR">Militar</SelectItem>
					<SelectItem className="text-gray-600" value="OBRERO">Obrero</SelectItem>
					<SelectItem className="text-gray-600" value="POLICÍA">Policía</SelectItem>
					<SelectItem className="text-gray-600" value="INDEPENDIENTE">Independiente</SelectItem>
					<SelectItem className="text-gray-600" value="TÉCNICO">Técnico</SelectItem>
				</Select>
				<Input className="w-full" label="Empresa" type="text" name="empresa" placeholder="Escribir nombre de la empresa" value={paciente.empresa} onChange={handleChange} />
				<Select
					isRequired
					className="w-full"
					label="Discapacidad"
					name="discapacidad"
					placeholder="¿Padece discapacidad?"
					value={paciente.discapacidad}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="1">Sí</SelectItem>
					<SelectItem className="text-gray-600" value="0">No</SelectItem>
				</Select>
				<Select
					isRequired
					className="w-full"
					label="Orientación"
					name="orientacion"
					placeholder="Seleccionar la orientación"
					value={paciente.orientacion}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="NINGUNO">Ninguno</SelectItem>
					<SelectItem className="text-gray-600" value="HETEROSEXUAL">Heterosexual</SelectItem>
					<SelectItem className="text-gray-600" value="HOMOSEXUAL">Homosexual</SelectItem>
					<SelectItem className="text-gray-600" value="OTRO">Otro</SelectItem>
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Identidad de Género"
					name="identidad"
					placeholder="Seleccionar identidad de género"
					value={paciente.identidad}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="NINGUNO">Ninguno</SelectItem>
					<SelectItem className="text-gray-600" value="CISGÉNERO">Cisgénero</SelectItem>
					<SelectItem className="text-gray-600" value="BINARIO">Binario</SelectItem>
					<SelectItem className="text-gray-600" value="NO BINARIO">No Binario</SelectItem>
					<SelectItem className="text-gray-600" value="INTERSEXUAL">Intersexual</SelectItem>
					<SelectItem className="text-gray-600" value="TRANSEXUAL">Transexual</SelectItem>
					<SelectItem className="text-gray-600" value="TRANSGÉNERO">Transgénero</SelectItem>
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Tipo de Paciente"
					name="tipo_paciente"
					placeholder="Seleccionar tipo de paciente"
					value={paciente.tipo_paciente}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="CIVIL">Civil</SelectItem>
					<SelectItem className="text-gray-600" value="MILITAR">Militar</SelectItem>
				</Select>

				<Select
					isRequired
					className="w-full"
					label="Estatus"
					name="estatus"
					placeholder="Selecconar el estatus"
					value={paciente.estatus}
					onChange={handleChange}
				>
					<SelectItem className="text-gray-600" value="1">Activo</SelectItem>
					<SelectItem className="text-gray-600" value="0">Inactivo</SelectItem>
				</Select>

			</div>

			<Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
				{paciente.id_paciente ? "Actualizar Paciente" : "Registrar Paciente"}
			</Button>
		</form>
	);
}

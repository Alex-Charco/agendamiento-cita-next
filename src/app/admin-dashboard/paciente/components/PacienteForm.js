"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaHospitalUser } from "react-icons/fa";
import { Button, Input, Textarea, Checkbox, Select, SelectItem } from "@heroui/react";
import { FaChevronDown } from "react-icons/fa6";
import SelectEndContent from "@/components/ui/SelectEndContent";

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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					isRequired
					className="w-full"
					label="Nombre usuario"
					name="nombre_usuario"
					type="text"
					value={paciente.nombre_usuario}
					onChange={handleInputChange}
				/>
				<Input 
					isRequired 
					className="w-full" 
					label="Identificación" 
					name="identificacion"
					placeholder="Escribir la identificación"
					type="text" 
					value={paciente.identificacion} 
					onChange={handleInputChange} 
				/>
				<Input 
					isRequired 
					className="w-full" 
					label="Primer Nombre"
					placeholder="Escribir el primer nombre"
					type="text" 
					value={paciente.primer_nombre} 
					onChange={handleInputChange} 
				/>
				<Input 
					className="w-full" 
					label="Segundo Nombre" 
					type="text" 
					name="segundo_nombre"
					placeholder="Escribir el segundo nombre"
					value={paciente.segundo_nombre} 
					onChange={handleInputChange} 
				/>
				<Input 
					isRequired 
					className="w-full" 
					label="Primer Apellido" 
					name="primer_apellido"
					placeholder="Escribir el primer apellido"
					type="text" value={paciente.primer_apellido} 
					onChange={handleInputChange} 
				/>
				<Input 
					className="w-full" 
					label="Segundo Apellido" 
					type="text" 
					name="segundo_apellido" 
					placeholder="Escribir el segundo apellido"
					value={paciente.segundo_apellido} 
					onChange={handleInputChange} 
				/>
				<Input 
					isRequired 
					className="w-full" 
					label="Fecha de nacimiento" 
					type="date" 
					name="fecha_nacimiento" 
					value={paciente.fecha_nacimiento} 
					onChange={handleInputChange} 
				/>
				<Select
					isRequired
					className="w-full relative"
					name="genero"
					label="Género"
					placeholder="Seleccionar un género"
					value={paciente.genero}
					onChange={handleInputChange}
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
					onChange={handleInputChange} 
				/>
				<Input 
					className="w-full" 
					label="Teléfono" 
					type="tel" 
					name="telefono"
					placeholder="Escribir número de teléfono"
					value={paciente.telefono} 
					onChange={handleInputChange} 
					/>
				<Input 
					isRequired 
					className="w-full md:col-span-2" 
					label="Correo" 
					type="email" 
					name="correo"
					placeholder="Escribir el correo electrónico"
					value={paciente.correo} 
					onChange={handleInputChange} 
				/>
				<Select
					isRequired
					className="w-full"
					label="Estado Civil"
					name="estado_civil"
					placeholder="Seleccionar estado civil"
					value={paciente.estado_civil}
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
				<Input className="w-full" label="Empresa" type="text" name="empresa" placeholder="Escribir nombre de la empresa" value={paciente.empresa} onChange={handleInputChange} />
				<Select
					isRequired
					className="w-full"
					label="Discapacidad"
					name="discapacidad"
					placeholder="¿Padece discapacidad?"
					value={paciente.discapacidad}
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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

"use client";

import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import { FaHospitalUser } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@heroui/react";

const initialState = {
	identificacion: "",
	cargo: "",
	grado: "",
	fuerza: "",
	unidad: "",
};

function reducer(state, action) {
	return { ...state, [action.name]: action.value };
}

function InfoMilitarForm({ onSubmit, infoMilitarData = {} }) {
	const [infoMilitar, dispatch] = useReducer(reducer, {
		...initialState,
		...infoMilitarData,
	});

	useEffect(() => {
		const infoMilitarGuardado = localStorage.getItem("identificacion");
		if (infoMilitarGuardado) {
			dispatch({ name: "identificacion", value: infoMilitarGuardado });
		}
	}, [infoMilitarData.identificacion]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		dispatch({ name, value: type === "checkbox" ? checked : value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(infoMilitar);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
		>
			<h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
				<FaHospitalUser className="text-blue-600" /> Información Militar
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					isRequired
					className="w-full"
					label="Identificación"
					name="identificacion"
					placeholder="Escribir la identificación"
					type="text"
					value={infoMilitar.identificacion}
					onChange={handleChange}
				/>
				<Select
					isRequired
					className="w-full"
					label="Cargo"
					placeholder="Seleccionar un cargo"
					selectedKeys={infoMilitar.cargo ? [infoMilitar.cargo] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "cargo", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "NINGUNO", label: "Ninguno" },
						{ key: "COMANDANTE", label: "Comandante" },
						{ key: "JEFE DE SECCIÓN", label: "Jefe de Sección" },
						{ key: "ENCARGADO DE LOGÍSTICA", label: "Encargado de Logística" },
						{ key: "DIRECTOR DE OPERACIONES", label: "Director de Operaciones" },
						{ key: "MÉDICO", label: "Médico" },
						{ key: "SOLDADO DE PRIMERA", label: "Soldado de Primera" },
						{ key: "OFICIAL DE ENLACE", label: "Oficial de Enlace" },
						{ key: "SUBOFICIAL", label: "Suboficial" },
						{ key: "TÉCNICO", label: "Técnico" },
						{ key: "COORDINADOR DE COMUNICACIONES", label: "Coordinador de Comunicaciones" },
						{ key: "ENCARGADO DE INTELIGENCIA", label: "Encargado de Inteligencia" },
						{ key: "CAPITÁN DE FRAGATA", label: "Capitán de Fragata" },
						{ key: "TENIENTE CORONEL", label: "Teniente Coronel" },
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
					label="Grado"
					placeholder="Seleccionar un grado"
					selectedKeys={infoMilitar.grado ? [infoMilitar.grado] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "grado", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "GENERAL", label: "General" },
						{ key: "CORONEL", label: "Coronel" },
						{ key: "MAYOR", label: "Mayor" },
						{ key: "CAPITÁN", label: "Capitán" },
						{ key: "TENIENTE", label: "Teniente" },
						{ key: "SUBTENIENTE", label: "Subteniente" },
						{ key: "SARGENTO", label: "Sargento" },
						{ key: "CABO", label: "Cabo" },
						{ key: "SOLDADO", label: "Soldado" },
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
					label="Fuerza"
					placeholder="Seleccionar una fuerza"
					selectedKeys={infoMilitar.fuerza ? [infoMilitar.fuerza] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "fuerza", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "TERRESTRE", label: "Terrestre" },
						{ key: "AÉREA", label: "Aérea" },
						{ key: "NAVAL", label: "Naval" },
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
					label="Unidad"
					placeholder="Seleccionar una unidad"
					selectedKeys={infoMilitar.unidad ? [infoMilitar.unidad] : []}
					onSelectionChange={(keys) =>
						dispatch({ name: "unidad", value: Array.from(keys)[0] })
					}
					items={[
						{ key: "15-BAE", label: "15-BAE" },
					]}
				>
					{(item) => (
						<SelectItem key={item.key} className="text-gray-600">
							{item.label}
						</SelectItem>
					)}
				</Select>
			</div>

			<Button
				type="submit"
				className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
			>
				{infoMilitarData.id_paciente ? "Actualizar Info Militar" : "Registrar Info Militar"}
			</Button>
		</form>
	);
}

InfoMilitarForm.propTypes = {
	onSubmit: PropTypes.object,
	infoMilitarData: PropTypes.object,
};

export default InfoMilitarForm; 
"use client";

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { useFormReducer } from "@/hooks/useFormReducer";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import SubmitButton from "@/components/ui/SubmitButton";

const initialState = {
	identificacion: "",
	cargo: "",
	grado: "",
	fuerza: "",
	unidad: "",
};

const cargoOptions = [
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
];

const gradoOptions = [
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
];

const fuerzaOptions = [
	{ key: "TERRESTRE", label: "Terrestre" },
	{ key: "AÉREA", label: "Aérea" },
	{ key: "NAVAL", label: "Naval" },
];

const unidadOptions = [{ key: "15-BAE", label: "15-BAE" }];

function InfoMilitarForm({ onSubmit, infoMilitarData = {} }) {
	const { state: infoMilitar, dispatch, handleChange } = useFormReducer(initialState, infoMilitarData);

	useEffect(() => {
		const infoMilitarGuardado = localStorage.getItem("identificacion");
		if (infoMilitarGuardado) {
			dispatch({ name: "identificacion", value: infoMilitarGuardado });
		}
	}, [infoMilitarData.identificacion, dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(infoMilitar);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
		>

			<SectionTitle text="Información Militar" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<CustomInput
					name="identificacion"
					label="Identificación"
					placeholder="Escribir la identificación"
					value={infoMilitar.identificacion ?? ""}
					onChange={handleChange} // Aquí se usa el handleChange del useFormReducer
				/>
				<CustomSelect
					name="cargo"
					label="Cargo"
					value={infoMilitar.cargo}
					onChange={handleChange} // Se usa handleChange en lugar de dispatch
					items={cargoOptions}
				/>
				<CustomSelect
					name="grado"
					label="Grado"
					value={infoMilitar.grado}
					onChange={handleChange} // Se usa handleChange aquí también
					items={gradoOptions}
				/>
				<CustomSelect
					name="fuerza"
					label="Fuerza"
					value={infoMilitar.fuerza}
					onChange={handleChange}
					items={fuerzaOptions}
				/>
				<CustomSelect
					name="unidad"
					label="Unidad"
					value={infoMilitar.unidad}
					onChange={handleChange}
					items={unidadOptions}
				/>
			</div>

			<SubmitButton
				text={infoMilitarData.id_paciente ? "Actualizar Info Militar" : "Registrar Info Militar"}
			/>

		</form>
	);
}

InfoMilitarForm.propTypes = {
	onSubmit: PropTypes.func,
	infoMilitarData: PropTypes.object,
};

export default InfoMilitarForm;

"use client";

import React, { useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { Button, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { validarNotaEvolutiva, validarCampoSimple } from "@/utils/validarNotaEvolutiva";
import { limitsNotaEvolutiva as limits } from "@/utils/notaEvolutivaLimits";

export default function FormularioNotaEvolutiva({ formNota, setFormNota, onGuardar }) {
	const [errores, setErrores] = useState({});
	const [mostrarSignosVitales, setMostrarSignosVitales] = useState(false);

	const handleInputChange = (field, value) => {
		setFormNota(prev => ({ ...prev, [field]: value }));

		const error = validarCampoSimple(field, value, field === "motivo_consulta");
		setErrores(prev => ({
			...prev,
			[field]: error || undefined
		}));
	};

	const handleGuardar = () => {
		const validacion = validarNotaEvolutiva(formNota);
		if (Object.keys(validacion).length > 0) {
			setErrores(validacion);
		} else {
			setErrores({});
			onGuardar();
		}
	};

	const handleSignosVitalesChange = (field, value) => {
		setFormNota(prev => ({
			...prev,
			signos_vitales: {
				...prev.signos_vitales,
				[field]: value
			}
		}));

		const error = validarCampoSimple(field, value, false);  // Puedes poner true si quieres que sea obligatorio
		setErrores(prev => ({
			...prev,
			[`signos_vitales.${field}`]: error || undefined
		}));
	};

	const handleDiagnosticoChange = (i, field, value) => {
		const nuevosDiagnosticos = [...formNota.diagnosticos];
		nuevosDiagnosticos[i][field] = value;
		setFormNota(prev => ({ ...prev, diagnosticos: nuevosDiagnosticos }));

		const fieldMap = { descripcion: "descripcion_diag" };
		const limitKey = fieldMap[field] || field;
		const error = validarCampoSimple(limitKey, value, true);

		setErrores(prev => ({
			...prev,
			[`diagnosticos.${i}.${field}`]: error || undefined
		}));
	};

	const handleProcedimientoChange = (i, j, field, value) => {
		const nuevosDiagnosticos = [...formNota.diagnosticos];
		nuevosDiagnosticos[i].procedimientos[j][field] = value;
		setFormNota(prev => ({ ...prev, diagnosticos: nuevosDiagnosticos }));

		const error = validarCampoSimple(field, value, true);

		setErrores(prev => ({
			...prev,
			[`diagnosticos.${i}.procedimientos.${j}.${field}`]: error || undefined
		}));
	};

	const handleLinkChange = (i, field, value) => {
		const nuevosLinks = [...formNota.links];
		nuevosLinks[i][field] = value;
		setFormNota(prev => ({ ...prev, links: nuevosLinks }));

		let error = null;

		if (field === "url") {
			error = validarCampoSimple("url", value, false);
		}
		if (field === "nombre_documento") {
			error = validarCampoSimple("nombre_documento", value, true);
		}
		if (field === "descripcion") {
			error = validarCampoSimple("descripcion_link", value, false);
		}

		setErrores(prev => ({
			...prev,
			[`links.${i}.${field}`]: error || undefined
		}));
	};

	const agregarDiagnostico = () => {
		setFormNota(prev => ({
			...prev,
			diagnosticos: [...prev.diagnosticos, { condicion: "", tipo: "", cie_10: "", descripcion: "", procedimientos: [] }]
		}));
	};

	const agregarProcedimiento = (i) => {
		const nuevosDiagnosticos = [...formNota.diagnosticos];
		nuevosDiagnosticos[i].procedimientos.push({ codigo: "", descripcion_proc: "" });
		setFormNota(prev => ({ ...prev, diagnosticos: nuevosDiagnosticos }));
	};

	const agregarLink = () => {
		setFormNota(prev => ({
			...prev,
			links: [...prev.links, { categoria: "EXAMEN", url: "", nombre_documento: "", descripcion: "" }]
		}));
	};

	const eliminarDiagnostico = (index) => {
		const nuevosDiagnosticos = [...formNota.diagnosticos];
		nuevosDiagnosticos.splice(index, 1);
		setFormNota({ ...formNota, diagnosticos: nuevosDiagnosticos });
	};

	const eliminarProcedimiento = (indexDiagnostico, indexProcedimiento) => {
		setFormNota(prev => {
			const nuevosDiagnosticos = [...prev.diagnosticos];
			nuevosDiagnosticos[indexDiagnostico].procedimientos.splice(indexProcedimiento, 1);
			return { ...prev, diagnosticos: nuevosDiagnosticos };
		});
	};

	const eliminarLink = (index) => {
		setFormNota(prev => ({
			...prev,
			links: prev.links.filter((_, i) => i !== index),
		}));
	};

	return (
		<div className="relative w-full border rounded-lg p-4 bg-white shadow">
			<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">
				Nueva nota de Evolución
			</div>

			{/* Campos principales */}
			<div className="flex flex-col gap-2 mb-4">
				{[
					{ field: "motivo_consulta", label: "Motivo de la Consulta", type: "input" },
					{ field: "enfermedad", label: "Enfermedad", type: "input" },
					{ field: "tratamiento", label: "Tratamiento", type: "input" },
					{ field: "resultado_examen", label: "Resultado de Examen", type: "input" },
					{ field: "decision_consulta", label: "Decisión de la Consulta", type: "textarea" },
					{ field: "reporte_decision", label: "Reporte de la Decisión", type: "textarea" }
				].map(({ field, label, type }) => {
					const isMotivoConsulta = field === "motivo_consulta";
					const labelWithAsterisk = isMotivoConsulta ? `${label} ` : label;

					return type === "input" ? (
						<Input
							key={field}
							label={labelWithAsterisk}
							value={formNota[field]}
							onChange={e => handleInputChange(field, e.target.value)}
							description={`${formNota[field].length}/${limits[field]} caracteres`}
							isInvalid={!!errores[field]}
							errorMessage={errores[field]}
							isRequired={isMotivoConsulta}
						/>
					) : (
						<Textarea
							key={field}
							label={labelWithAsterisk}
							value={formNota[field]}
							onChange={e => handleInputChange(field, e.target.value)}
							description={`${formNota[field].length}/${limits[field]} caracteres`}
							isInvalid={!!errores[field]}
							errorMessage={errores[field]}
							isRequired={isMotivoConsulta}
						/>
					);
				})}
			</div>

			{/* Signos Vitales */}
			<div className="mb-4 relative border rounded-lg p-4 mt-5">
				<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">Signos Vitales</div>
				<div className="flex justify-center mb-4 w-full bg-gradient-to-b from-celeste-plomado-oscuro to-[#F5F7FC] p-2 shadow-lg">
					<Button
						onClick={() => setMostrarSignosVitales(prev => !prev)}
						className="mb-3 bg-gray-100 text-gray-800 shadow hover:bg-gray-200"
					>
						<FaPlus className="mr-2" />
						{mostrarSignosVitales ? "Ocultar Signos Vitales" : "Agregar Signos Vitales"}
					</Button>
				</div>

				{mostrarSignosVitales && (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="Presión Sistólica (mmHg)"
								value={formNota.signos_vitales.presion_arterial_sistolica}
								onChange={e => handleSignosVitalesChange('presion_arterial_sistolica', e.target.value)}
								isInvalid={!!errores['signos_vitales.presion_arterial_sistolica']}
								errorMessage={errores['signos_vitales.presion_arterial_sistolica']}
							/>
							<Input
								label="Presión Diastólica (mmHg)"
								value={formNota.signos_vitales.presion_arterial_diastolica}
								onChange={e => handleSignosVitalesChange('presion_arterial_diastolica', e.target.value)}
								isInvalid={!!errores['signos_vitales.presion_arterial_diastolica']}
								errorMessage={errores['signos_vitales.presion_arterial_diastolica']}
							/>
							<Input
								label="Frecuencia Cardíaca (lpm)"
								value={formNota.signos_vitales.frecuencia_cardiaca}
								onChange={e => handleSignosVitalesChange('frecuencia_cardiaca', e.target.value)}
								isInvalid={!!errores['signos_vitales.frecuencia_cardiaca']}
								errorMessage={errores['signos_vitales.frecuencia_cardiaca']}
							/>
							<Input
								label="Frecuencia Respiratoria (rpm)"
								value={formNota.signos_vitales.frecuencia_respiratoria}
								onChange={e => handleSignosVitalesChange('frecuencia_respiratoria', e.target.value)}
								isInvalid={!!errores['signos_vitales.frecuencia_respiratoria']}
								errorMessage={errores['signos_vitales.frecuencia_respiratoria']}
							/>
							<Input
								label="Temperatura (°C)"
								value={formNota.signos_vitales.temperatura}
								onChange={e => handleSignosVitalesChange('temperatura', e.target.value)}
								isInvalid={!!errores['signos_vitales.temperatura']}
								errorMessage={errores['signos_vitales.temperatura']}
							/>
							<Input
								label="Saturación de Oxígeno (%)"
								value={formNota.signos_vitales.saturacion_oxigeno}
								onChange={e => handleSignosVitalesChange('saturacion_oxigeno', e.target.value)}
								isInvalid={!!errores['signos_vitales.saturacion_oxigeno']}
								errorMessage={errores['signos_vitales.saturacion_oxigeno']}
							/>
							<Input
								label="Peso (Kg)"
								value={formNota.signos_vitales.peso}
								onChange={e => handleSignosVitalesChange('peso', e.target.value)}
								isInvalid={!!errores['signos_vitales.peso']}
								errorMessage={errores['signos_vitales.peso']}
							/>
							<Input
								label="Talla (cm)"
								value={formNota.signos_vitales.talla}
								onChange={e => handleSignosVitalesChange('talla', e.target.value)}
								isInvalid={!!errores['signos_vitales.talla']}
								errorMessage={errores['signos_vitales.talla']}
							/>
						</div>

						{/* Observaciones */}
						<div className="mt-4">
							<Textarea
								label="Observaciones"
								value={formNota.signos_vitales.observaciones}
								onChange={e => handleSignosVitalesChange('observaciones', e.target.value)}
								isInvalid={!!errores['signos_vitales.observaciones']}
								errorMessage={errores['signos_vitales.observaciones']}
							/>
						</div>
					</>
				)}
			</div>


			{/* Diagnósticos */}
			<div className="mb-4 relative border rounded-lg p-4 mt-5">
				<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">Diagnósticos</div>
				<div className="flex justify-center mb-4 w-full bg-gradient-to-b from-celeste-plomado-oscuro to-[#F5F7FC] p-2 shadow-lg">
					<Button onClick={agregarDiagnostico} className="bg-gray-100 text-gray-800 shadow hover:bg-gray-200">
						<FaPlus className="mr-2" /> Agregar Diagnóstico
					</Button>
				</div>

				{formNota.diagnosticos.map((diag, i) => (
					<div key={i} className="relative border p-4 mb-4 mt-2 rounded bg-white grid grid-cols-1 md:grid-cols-2 gap-4 pt-12">
						<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">Diagnóstico</div>

						{/* Botón Eliminar Diagnóstico */}
						<div className="absolute top-2 right-2 z-10">
							<button
								type="button"
								onClick={() => eliminarDiagnostico(i)}
								className="w-9 h-9 flex items-center justify-center bg-gray-200 border border-gray-300 text-gray-500 font-bold rounded-full hover:text-red-600 hover:border-red-500"
								title="Eliminar diagnóstico"
							>
								X
							</button>
						</div>

						{/* Campos de Diagnóstico */}
						<Input
							isRequired
							label="Condición"
							value={diag.condicion}
							onChange={e => handleDiagnosticoChange(i, "condicion", e.target.value)}
							description={`${diag.condicion.length}/${limits.condicion} caracteres`}
							isInvalid={!!errores[`diagnosticos.${i}.condicion`]}
							errorMessage={errores[`diagnosticos.${i}.condicion`]}
						/>
						<Input
							isRequired
							label="Tipo"
							value={diag.tipo}
							onChange={e => handleDiagnosticoChange(i, "tipo", e.target.value)}
							description={`${diag.tipo.length}/${limits.tipo} caracteres`}
							isInvalid={!!errores[`diagnosticos.${i}.tipo`]}
							errorMessage={errores[`diagnosticos.${i}.tipo`]}
						/>
						<Input
							isRequired
							label="CIE-10"
							value={diag.cie_10}
							onChange={e => handleDiagnosticoChange(i, "cie_10", e.target.value)}
							description={`${diag.cie_10.length}/${limits.cie_10} caracteres`}
							isInvalid={!!errores[`diagnosticos.${i}.cie_10`]}
							errorMessage={errores[`diagnosticos.${i}.cie_10`]}
						/>
						<Input
							isRequired
							label="Descripción Diagnóstico"
							value={diag.descripcion}
							onChange={e => handleDiagnosticoChange(i, "descripcion", e.target.value)}
							description={`${diag.descripcion.length}/${limits.descripcion_diag} caracteres`}
							isInvalid={!!errores[`diagnosticos.${i}.descripcion`]}
							errorMessage={errores[`diagnosticos.${i}.descripcion`]}
						/>

						{/* Procedimientos */}
						<div className="w-full mb-4 relative border rounded-lg pt-4 px-4 md:col-span-2">
							<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">
								Procedimientos
							</div>

							<div className="flex items-center justify-center mb-4 w-full bg-gradient-to-b from-celeste-plomado-oscuro to-[#F5F7FC] p-2 shadow-lg">
								<Button
									size="sm"
									onClick={() => agregarProcedimiento(i)}
									className="bg-gray-100 text-gray-800 shadow hover:bg-gray-200"
								>
									<FaPlus className="mr-1" /> Agregar Procedimiento
								</Button>
							</div>

							{diag.procedimientos.map((proc, j) => (
								<div key={j} className="relative w-full mb-2 border p-4 rounded-md flex flex-col md:flex-row gap-4 pt-12 bg-white">

									{/* Botón Eliminar Procedimiento (estilo igual al de Diagnóstico) */}
									<div className="absolute top-2 right-2 z-10">
										<button
											type="button"
											onClick={() => eliminarProcedimiento(i, j)}
											className="w-9 h-9 flex items-center justify-center bg-gray-200 border border-gray-300 text-gray-500 font-bold rounded-full hover:text-red-600 hover:border-red-500"
											title="Eliminar procedimiento"
										>
											X
										</button>
									</div>

									{/* Input Código */}
									<div className="w-full md:w-[250px]">
										<Input
											isRequired
											label="Código"
											value={proc.codigo}
											onChange={e => handleProcedimientoChange(i, j, "codigo", e.target.value)}
											description={`${proc.codigo.length}/${limits.codigo_proc} caracteres`}
											isInvalid={!!errores[`diagnosticos.${i}.procedimientos.${j}.codigo`]}
											errorMessage={errores[`diagnosticos.${i}.procedimientos.${j}.codigo`]}
										/>
									</div>

									{/* Input Descripción Procedimiento */}
									<div className="flex-1">
										<Input
											isRequired
											label="Descripción Procedimiento"
											value={proc.descripcion_proc}
											onChange={e => handleProcedimientoChange(i, j, "descripcion_proc", e.target.value)}
											description={`${proc.descripcion_proc.length}/${limits.descripcion_proc} caracteres`}
											isInvalid={!!errores[`diagnosticos.${i}.procedimientos.${j}.descripcion_proc`]}
											errorMessage={errores[`diagnosticos.${i}.procedimientos.${j}.descripcion_proc`]}
										/>
									</div>
								</div>
							))}

						</div>
					</div>
				))}
			</div>

			{/* Links */}
			<div className="mb-4 relative border rounded-lg p-4">
				<div className="absolute bg-white -top-3 left-2 px-2 text-[11px] text-blue-800 font-semibold">
					Links / Adjuntos (opcional)
				</div>

				<div className="flex justify-center mb-4 w-full bg-gradient-to-b from-celeste-plomado-oscuro to-[#F5F7FC] p-2 shadow-lg">
					<Button
						onClick={agregarLink}
						className="bg-gray-100 text-gray-800 shadow hover:bg-gray-200"
					>
						<FaPlus className="mr-2" /> Agregar Link
					</Button>
				</div>

				{formNota.links.map((link, i) => (
					<div key={i} className="flex flex-col gap-4 mb-4 relative border p-4 rounded-md pt-12 bg-white">

						{/* Botón eliminar */}
						<div className="absolute top-2 right-2 z-10">
							<button
								type="button"
								onClick={() => eliminarLink(i)}
								className="w-9 h-9 flex items-center justify-center bg-gray-200 border border-gray-300 text-gray-500 font-bold rounded-full hover:text-red-600 hover:border-red-500"
								title="Eliminar link"
							>
								X
							</button>
						</div>

						{/* Fila: Nombre y URL */}
						<div className="flex flex-col md:flex-row gap-4">
							<div className="w-full md:w-1/2">
								<Input
									isRequired
									label="Nombre del Documento"
									value={link.nombre_documento}
									onChange={e => handleLinkChange(i, "nombre_documento", e.target.value)}
									description={`${link.nombre_documento.length}/${limits.nombre_documento} caracteres`}
									isInvalid={!!errores[`links.${i}.nombre_documento`]}
									errorMessage={errores[`links.${i}.nombre_documento`]}
								/>
							</div>

							<div className="w-full md:w-1/2">
								<Input
									isRequired
									label="URL"
									value={link.url}
									onChange={e => handleLinkChange(i, "url", e.target.value)}
									description={`${link.url.length}/${limits.url} caracteres`}
									isInvalid={!!errores[`links.${i}.url`]}
									errorMessage={errores[`links.${i}.url`]}
								/>
							</div>
						</div>

						{/* Fila: Categoría y Descripción */}
						<div className="flex flex-col md:flex-row gap-4">
							<div className="w-full md:w-[250px]">
								<Select
									isRequired
									label="Categoría"
									selectedKeys={[link.categoria]}
									onSelectionChange={keys => handleLinkChange(i, "categoria", [...keys][0])}
									classNames={{
										trigger: "text-gray-700",
										popoverContent: "text-blue-700",
									}}
								>
									{["EXAMEN", "PEDIDO", "CERTIFICADO", "OTRO", "TRANSFERIR"].map(cat => (
										<SelectItem key={cat} value={cat}>{cat}</SelectItem>
									))}
								</Select>
							</div>

							<div className="flex-1">
								<Textarea
									label="Descripción (opcional)"
									value={link.descripcion}
									onChange={e => handleLinkChange(i, "descripcion", e.target.value)}
									description={`${link.descripcion.length}/${limits.descripcion_link} caracteres`}
									isInvalid={!!errores[`links.${i}.descripcion`]}
									errorMessage={errores[`links.${i}.descripcion`]}
									minRows={3}
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-center">
				<Button color="primary" size="lg" className="w-full sm:w-auto" onClick={handleGuardar}>
					<FaSave className="mr-2" /> Guardar Nota Evolutiva
				</Button>
			</div>
		</div>
	);
}

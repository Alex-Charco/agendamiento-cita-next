"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import DetalleDatosReceta from "@/medico-dashboard/receta/components/DetalleDatosReceta";
import BuscadorAutorizado from "@/medico-dashboard/receta/components/BuscadorAutorizado";
import TablaMedicamentos from "@/medico-dashboard/receta/components/TablaMedicamentos";
import ModalAgregarMedicamento from "@/medico-dashboard/receta/components/ModalAgregarMedicamento";
import { mostrarToastError, mostrarToastExito } from "@/utils/toast";
import { confirmarRegistro } from "@/utils/confirmacion";
import authAxios from "@/utils/api/authAxios";
import { FaArrowLeft } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { getCommonButtonsByPath } from "@/utils/commonButtons";
import { generarPDFReceta } from "@/utils/pdf/generarPDFReceta";

const obtenerFechaActual = () => {
	const hoy = new Date();
	return hoy.toISOString().split("T")[0];
};

const sumarDias = (fecha, dias) => {
	const nuevaFecha = new Date(fecha);
	nuevaFecha.setDate(nuevaFecha.getDate() + dias);
	return nuevaFecha.toISOString().split("T")[0];
};

export default function RecetaPage() {
	const [fechaPrescripcion, setFechaPrescripcion] = useState(obtenerFechaActual());
	const [fechaVigencia, setFechaVigencia] = useState(sumarDias(obtenerFechaActual(), 2));
	const [paciente, setPaciente] = useState(null);
	const [autorizados, setAutorizados] = useState([]);
	const [medicamentosAgregados, setMedicamentosAgregados] = useState([]);
	const [mostrarModal, setMostrarModal] = useState(false);
	const [idNotaEvolutiva, setIdNotaEvolutiva] = useState(null);
	const [diagnosticos, setDiagnosticos] = useState([]);
	const [modoEdicion, setModoEdicion] = useState(false);
	const [indiceEditar, setIndiceEditar] = useState(null);
	const [datosEditar, setDatosEditar] = useState(null);
	const [recetaGuardada, setRecetaGuardada] = useState(false);

	const pathname = usePathname();
	const router = useRouter();

	const [recetaPdf, setRecetaPdf] = useState(null);
	const [idCita, setIdCita] = useState(null);

	useEffect(() => {
		const storedIdCita = sessionStorage.getItem("notaEvolutiva_id_cita");

		if (storedIdCita) {
			const idCitaParsed = Number(storedIdCita);
			setIdCita(idCitaParsed);

		} else {
			console.warn("❗ No se encontró 'notaEvolutiva_id_cita' en sessionStorage");
		}
	}, []);

	// Recuperar medicamentos almacenados
	useEffect(() => {
		const almacenados = sessionStorage.getItem("medicamentosAgregados");
		if (almacenados) {
			setMedicamentosAgregados(JSON.parse(almacenados));
		}
	}, []);

	// Guardar en sessionStorage si cambian
	useEffect(() => {
		sessionStorage.setItem("medicamentosAgregados", JSON.stringify(medicamentosAgregados));
	}, [medicamentosAgregados]);

	useEffect(() => {
		const storedNotaParams = sessionStorage.getItem("notaDetalleParams");

		if (storedNotaParams) {
			const parsedParams = JSON.parse(storedNotaParams);
			const idNota = parsedParams.idNota;
			const idPaciente = parsedParams.idPaciente;

			if (!idNota || !idPaciente) {
				mostrarToastError("Faltan datos necesarios para cargar la receta.");
				return;
			}

			setIdNotaEvolutiva(idNota);

			// Diagnósticos
			authAxios.get(`/api/receta/get/diagnostico-por-nota/${idNota}`)
				.then(res => setDiagnosticos(res.data || []))
				.catch(err => mostrarToastError(err, "Error al cargar diagnósticos"));

			// Autorizados
			authAxios.get(`/api/receta/get/autorizacion/opciones?id_paciente=${idPaciente}`)
				.then(res => {
					const opciones = [];
					if (res.data.paciente) opciones.push({ ...res.data.paciente, tipo_autorizado: "PACIENTE" });
					if (res.data.familiar) opciones.push({ ...res.data.familiar, tipo_autorizado: "FAMILIAR" });
					setAutorizados(opciones);
					setPaciente(res.data.paciente);
				})
				.catch(err => mostrarToastError(err, "Error al obtener autorizados"));
		}
	}, []);


	useEffect(() => {
		if (idNotaEvolutiva) {
			authAxios.get(`/api/receta/get?id_nota_evolutiva=${idNotaEvolutiva}`)
				.then(res => {
					if (res.data?.fecha_prescripcion) {
						setFechaPrescripcion(res.data.fecha_prescripcion);
						setFechaVigencia(res.data.fecha_vigencia);
					}
				})
				.catch(err => mostrarToastError(err, "No se encontraron recetas para esta nota"));
		}
	}, [idNotaEvolutiva]);

	const agregarMedicamento = (nuevo) => {
		if (modoEdicion && indiceEditar !== null) {
			const copia = [...medicamentosAgregados];
			copia[indiceEditar] = nuevo;
			setMedicamentosAgregados(copia);
		} else {
			setMedicamentosAgregados(prev => [...prev, nuevo]);
		}

		setModoEdicion(false);
		setIndiceEditar(null);
		setDatosEditar(null);
		setMostrarModal(false);
	};

	const handleEditarMedicamento = (index) => {
		const med = medicamentosAgregados[index];
		setModoEdicion(true);
		setIndiceEditar(index);
		setDatosEditar(med);
		setMostrarModal(true);
	};

	const handleEliminarMedicamento = (index) => {
		const nuevoListado = medicamentosAgregados.filter((_, i) => i !== index);
		setMedicamentosAgregados(nuevoListado);
	};

	const guardarReceta = async () => {
		// Mostrar confirmación antes de continuar
		const confirmado = await confirmarRegistro("¿Desea guardar esta receta médica?");
		if (!confirmado) return; // Si usuario cancela, no hace nada

		if (medicamentosAgregados.length === 0) {
			mostrarToastError("Debe agregar al menos un medicamento antes de guardar la receta.");
			return;
		}
		// Validar que haya al menos un autorizado
		const autorizadoSeleccionado = autorizados.find(a => a.seleccionado);
		if (!autorizadoSeleccionado) {
			mostrarToastError("Debe seleccionar quién retirará la receta.");
			return;
		}

		try {
			// Construir receta_autorizacion
			const receta_autorizacion = {
				id_paciente: autorizadoSeleccionado.tipo_autorizado === "PACIENTE" ? autorizadoSeleccionado.id : null,
				id_familiar: autorizadoSeleccionado.tipo_autorizado === "FAMILIAR" ? autorizadoSeleccionado.id : null,
				tipo_autorizado: autorizadoSeleccionado.tipo_autorizado,
			};
			console.log("📦 Estructura receta_autorizacion:", receta_autorizacion);

			// Adaptar estructura de cada medicamento
			const medicaciones = medicamentosAgregados.map((med) => {
				const medicacion = {
					id_medicamento: med.idMedicamento, // obligatorio
					...(med.externo !== undefined && { externo: med.externo }),
					...(med.indicacion && { indicacion: med.indicacion }),
					...(med.signoAlarma && { signo_alarma: med.signoAlarma }),
					...(med.indicacionNoFarmaco && { indicacion_no_farmacologica: med.indicacionNoFarmaco }),
					...(med.recomendacionNoFarmaco && { recomendacion_no_farmacologica: med.recomendacionNoFarmaco }),
				};

				const medicamento = med.medicamento
					? {
						...(med.medicamento.cum && { cum: med.medicamento.cum }),
						nombre_medicamento: med.medicamento.nombreMedicamento,
						forma_farmaceutica: med.medicamento.formaFarmaceutica,
						via_administracion: med.medicamento.viaAdministracion,
						concentracion: med.medicamento.concentracion,
						presentacion: med.medicamento.presentacion,
						tipo: med.medicamento.tipoMedicamento,
						cantidad: med.medicamento.cantidad,
					}
					: null;

				const posologias = med.posologias || [];

				return {
					...medicacion,
					...(medicamento && { medicamento }),
					...(posologias.length > 0 && { posologias })
				};
			});


			const payload = {
				id_nota_evolutiva: idNotaEvolutiva,
				fecha_prescripcion: fechaPrescripcion,
				medicaciones: medicamentosAgregados.map((m) => ({
					externo: m.externo || false,
					indicacion: m.indicacion || null,
					signo_alarma: m.signoAlarma || null,
					indicacion_no_farmacologica: m.indicacionNoFarmaco || null,
					recomendacion_no_farmacologica: m.recomendacionNoFarmaco || null,
					medicamento: {
						cum: m.cum || null,
						nombre_medicamento: m.nombreMedicamento,
						forma_farmaceutica: m.formaFarmaceutica,
						via_administracion: m.viaAdministracion,
						concentracion: m.concentracion,
						presentacion: m.presentacion,
						tipo: m.tipoMedicamento,
						cantidad: m.cantidad,
					},
					posologias: [
						{
							dosis_numero: Number(m.dosisNumero),
							dosis_tipo: m.dosisTipo,
							frecuencia_numero: Number(m.frecuenciaNumero),
							frecuencia_tipo: m.frecuenciaTipo,
							duracion_numero: Number(m.duracionNumero),
							duracion_tipo: m.duracionTipo,
							fecha_inicio: m.fecha_inicio || null,
							hora_inicio: m.hora_inicio || null,
							via: m.via,
						},
					],
				})),
				receta_autorizacion: receta_autorizacion, // ✅ ESTA es la que debes enviar
			};

			if (
				receta_autorizacion.tipo_autorizado === "PACIENTE" && !receta_autorizacion.id_paciente ||
				receta_autorizacion.tipo_autorizado === "FAMILIAR" && !receta_autorizacion.id_familiar ||
				receta_autorizacion.tipo_autorizado === "EXTERNO" && !receta_autorizacion.id_persona_externa
			) {
				mostrarToastError("Error: No se ha definido correctamente el autorizado.");
				return;
			}


			await authAxios.post("/api/receta/registrar", payload);
			mostrarToastExito("Receta guardada correctamente");
			sessionStorage.removeItem("medicamentosAgregados");
			setRecetaGuardada(true);

			setRecetaPdf(null);

		} catch (error) {
			mostrarToastError(error, "Error al guardar la receta");
		}
	};

	const handleIntentoSalir = (href) => {
		if (!recetaGuardada && medicamentosAgregados.length > 0) {
			const confirmar = window.confirm("¿Desea salir? Se perderán los medicamentos agregados no guardados.");
			if (!confirmar) return;
			sessionStorage.removeItem("medicamentosAgregados");
		}
		router.push(href);
	};

	const buttons = [
		{
			label: "Regresar",
			icon: FaArrowLeft,
			onClick: () => handleIntentoSalir("/medico-dashboard/nota-evolutiva"),
		},
		...(getCommonButtonsByPath(pathname) || []).map(btn => ({
			...btn,
			onClick: () => handleIntentoSalir(btn.href),
		})),
	];

	return (
		<div className="bg-gray-100 min-h-screen">
			<NavbarComponent title="Receta Médica" buttons={buttons} />

			<div className="p-4 space-y-6">
				<DetalleDatosReceta
					fechaPrescripcion={fechaPrescripcion}
					fechaVigencia={fechaVigencia}
					paciente={paciente}
				/>

				<BuscadorAutorizado
					idPaciente={paciente?.id_paciente}
					autorizados={autorizados}
					setAutorizados={setAutorizados}
				/>

				<TablaMedicamentos
					medicamentos={medicamentosAgregados}
					onAgregar={() => {
						setModoEdicion(false);
						setDatosEditar(null);
						setMostrarModal(true);
					}}
					onEditar={handleEditarMedicamento}
					onEliminar={handleEliminarMedicamento}
				/>

				<ModalAgregarMedicamento
					isOpen={mostrarModal}
					onClose={() => {
						setMostrarModal(false);
						setModoEdicion(false);
						setDatosEditar(null);
					}}
					onGuardar={agregarMedicamento}
					diagnosticos={diagnosticos}
					modoEdicion={modoEdicion}
					datosEditar={datosEditar}
				/>

				{/* Botón para guardar receta */}
				<div className="flex flex-col items-center space-y-4">
					<button
						onClick={guardarReceta}
						className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow"
					>
						Guardar Receta
					</button>

					<button
						onClick={async () => {
							const storedIdCita = sessionStorage.getItem("notaEvolutiva_id_cita");
							console.log("🔎 ID de la cita desde sessionStorage:", storedIdCita);

							if (!storedIdCita) {
								mostrarToastError("No se encontró la cita para generar el PDF.");
								return;
							}

							try {
								const { data } = await authAxios.get(`/api/receta/get/por-cita?id_cita=${storedIdCita}`);
								if (data?.data) {
									generarPDFReceta(data.data);
								} else {
									mostrarToastError("La receta aún no está disponible. Intente nuevamente.");
								}
							} catch (err) {
								console.error("❌ Error al intentar descargar la receta", err);
								mostrarToastError("Error al generar el PDF. Intente nuevamente.");
							}
						}}
						className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
					>
						Descargar PDF Receta
					</button>

				</div>

			</div>
		</div>
	);
}

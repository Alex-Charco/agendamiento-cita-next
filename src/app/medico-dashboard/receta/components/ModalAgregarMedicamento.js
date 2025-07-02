"use client";

import PropTypes from "prop-types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import DynamicTable from "@/components/table/DynamicTable";
import React, { useState, useEffect } from "react";

export default function ModalAgregarMedicamento({
  isOpen,
  onClose,
  onGuardar,
  diagnosticos = [],
  modoEdicion = false,
  datosEditar = null,
}) {
  const columnasDiagnostico = [
    { uid: "cie_10", name: "CIE10" },
    { uid: "descripcion", name: "Descripción" },
    { uid: "condicion", name: "Condición" },
    { uid: "tipo", name: "Tipo" },
  ];

  // Campos medicamento
  const [nombreMedicamento, setNombreMedicamento] = useState("");
  const [formaFarmaceutica, setFormaFarmaceutica] = useState("");
  const [viaAdministracion, setViaAdministracion] = useState("");
  const [concentracion, setConcentracion] = useState("");
  const [presentacion, setPresentacion] = useState("");
  const [tipoMedicamento, setTipoMedicamento] = useState("");
  const [cantidad, setCantidad] = useState("");

  const maxCaracteresMedicamento = {
    nombre: 100,
    forma: 50,
    via: 50,
    concentracion: 50,
    presentacion: 50,
  };

  // Posología
  const [dosisNumero, setDosisNumero] = useState("");
  const [dosisTipo, setDosisTipo] = useState("");
  const [frecuenciaNumero, setFrecuenciaNumero] = useState("");
  const [frecuenciaTipo, setFrecuenciaTipo] = useState("");
  const [duracionNumero, setDuracionNumero] = useState("");
  const [duracionTipo, setDuracionTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [via, setVia] = useState("");
  const [calcular, setCalcular] = useState("");

  const camposCompletos =
    dosisNumero &&
    dosisTipo &&
    frecuenciaNumero &&
    frecuenciaTipo &&
    duracionNumero &&
    duracionTipo &&
    via;

  const calcularTexto = () => {
    const capitalizar = (texto) =>
      texto ? texto.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : "";

    const texto = `${dosisNumero} ${capitalizar(dosisTipo)} cada ${frecuenciaNumero} ${frecuenciaTipo?.toLowerCase()} por ${duracionNumero} ${duracionTipo?.toLowerCase()} vía ${via?.toLowerCase()}`;

    setCalcular(texto);
  };

  // Medicación
  const [indicacion, setIndicacion] = useState("");
  const [signoAlarma, setSignoAlarma] = useState("");
  const [indicacionNoFarmaco, setIndicacionNoFarmaco] = useState("");
  const [recomendacionNoFarmaco, setRecomendacionNoFarmaco] = useState("");
  const [externo, setExterno] = useState(false);

  const maxCaracteres = {
    indicacion: 150,
    signo_alarma: 100,
    indicacion_no_farmacologica: 100,
    recomendacion_no_farmacologica: 100,
  };

  // Cargar datos al editar
  useEffect(() => {
    if (modoEdicion && datosEditar) {
      setNombreMedicamento(datosEditar.nombreMedicamento || "");
      setFormaFarmaceutica(datosEditar.formaFarmaceutica || "");
      setViaAdministracion(datosEditar.viaAdministracion || "");
      setConcentracion(datosEditar.concentracion || "");
      setPresentacion(datosEditar.presentacion || "");
      setTipoMedicamento(datosEditar.tipoMedicamento || "");
      setCantidad(datosEditar.cantidad || "");

      setDosisNumero(datosEditar.dosisNumero || "");
      setDosisTipo(datosEditar.dosisTipo || "");
      setFrecuenciaNumero(datosEditar.frecuenciaNumero || "");
      setFrecuenciaTipo(datosEditar.frecuenciaTipo || "");
      setDuracionNumero(datosEditar.duracionNumero || "");
      setDuracionTipo(datosEditar.duracionTipo || "");
      setVia(datosEditar.via || "");
      setCalcular(datosEditar.calcular || "");

      setIndicacion(datosEditar.indicacion || "");
      setSignoAlarma(datosEditar.signoAlarma || "");
      setIndicacionNoFarmaco(datosEditar.indicacionNoFarmaco || "");
      setRecomendacionNoFarmaco(datosEditar.recomendacionNoFarmaco || "");
      setExterno(datosEditar.externo || false);
    } else {
      // Limpiar campos al abrir nuevo
      setNombreMedicamento("");
      setFormaFarmaceutica("");
      setViaAdministracion("");
      setConcentracion("");
      setPresentacion("");
      setTipoMedicamento("");
      setCantidad("");

      setDosisNumero("");
      setDosisTipo("");
      setFrecuenciaNumero("");
      setFrecuenciaTipo("");
      setDuracionNumero("");
      setDuracionTipo("");
      setVia("");
      setCalcular("");

      setIndicacion("");
      setSignoAlarma("");
      setIndicacionNoFarmaco("");
      setRecomendacionNoFarmaco("");
      setExterno(false);
    }
  }, [modoEdicion, datosEditar, isOpen]);

 

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      size="5xl"
    >
      <ModalContent className="bg-gray-50 text-gray-700">
        {(onModalClose) => (
          <>
            <ModalHeader className="bg-blue-100 text-blue-800 font-bold text-lg">
				{modoEdicion ? "Editar Medicamento" : "Agregar Medicamento"}
			  </ModalHeader>

            <ModalBody className="space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Medicamento y Posología */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medicamento */}
                <div className="space-y-4 p-4 bg-white shadow rounded-lg">
				  <h3 className="font-semibold text-blue-700 text-md mb-2 border-b pb-1">
					Medicamento
				  </h3>
				  <div>
					<Input
					isRequired
					  label="Nombre del medicamento"
					  value={nombreMedicamento}
					  onChange={(e) => setNombreMedicamento(e.target.value)}
					  maxLength={maxCaracteresMedicamento.nombre}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteresMedicamento.nombre - nombreMedicamento.length} caracteres restantes
					</div>
				  </div>

				  <div>
					<Input
					  isRequired
					  label="Forma farmacéutica"
					  value={formaFarmaceutica}
					  onChange={(e) => setFormaFarmaceutica(e.target.value)}
					  maxLength={maxCaracteresMedicamento.forma}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteresMedicamento.forma - formaFarmaceutica.length} caracteres restantes
					</div>
				  </div>

				  <div>
					<Input
					  isRequired
					  label="Vía de administración"
					  value={viaAdministracion}
					  onChange={(e) => setViaAdministracion(e.target.value)}
					  maxLength={maxCaracteresMedicamento.via}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteresMedicamento.via - viaAdministracion.length} caracteres restantes
					</div>
				  </div>

				  <div>
					<Input
					  isRequired
					  label="Concentración"
					  value={concentracion}
					  onChange={(e) => setConcentracion(e.target.value)}
					  maxLength={maxCaracteresMedicamento.concentracion}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteresMedicamento.concentracion - concentracion.length} caracteres restantes
					</div>
				  </div>

				  <div>
					<Input
					  isRequired
					  label="Presentación"
					  value={presentacion}
					  onChange={(e) => setPresentacion(e.target.value)}
					  maxLength={maxCaracteresMedicamento.presentacion}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteresMedicamento.presentacion - presentacion.length} caracteres restantes
					</div>
				  </div>

				  <Select
					classNames={{
					  trigger: "text-blue-700",
					  listbox: "text-gray-800 bg-white",
					  popoverContent: "bg-white text-gray-800",
					}}
					isRequired
					label="Tipo"
					selectedKeys={[tipoMedicamento]}
					onSelectionChange={(val) => setTipoMedicamento([...val][0])}
				  >
					{["AGUDO", "CRÓNICO", "PREVENTIVO"].map((op) => (
					  <SelectItem key={op} value={op}>
						{op}
					  </SelectItem>
					))}
				  </Select>

				  <Input
				    isRequired
					label="Cantidad"
					type="number"
					value={cantidad}
					onChange={(e) => setCantidad(e.target.value)}
				  />
				</div>


                {/* Posología */}
                <div className="p-4 bg-white shadow rounded-lg">
                  <h3 className="font-semibold text-blue-700 text-md mb-4 border-b pb-1">
                    Posología
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
					  isRequired
                      label="Dosis número"
                      type="number"
                      value={dosisNumero}
                      onChange={(e) => setDosisNumero(e.target.value)}
                    />
                    <Select
					  classNames={{
                        trigger: "text-blue-700",
                        listbox: "text-gray-800 bg-white",
                        popoverContent: "bg-white text-gray-800",
                      }}
					  isRequired
                      label="Dosis tipo"
                      selectedKeys={[dosisTipo]}
                      onSelectionChange={(val) =>
                        setDosisTipo([...val][0])
                      }
                    >
                      {[
                        "AMPOLLA",
                        "CAPSULA",
                        "CUCHARADA",
                        "GOTAS",
                        "GOTERO",
                        "GRAGEA",
                        "INYECCIÓN",
                        "MILILITRO",
                        "PARCHES",
                        "SOBRE",
                        "SUPOSITORIO",
                        "TABLETA",
                        "UNIDAD",
                      ].map((op) => (
                        <SelectItem key={op} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
					  isRequired
                      label="Frecuencia número"
                      type="number"
                      value={frecuenciaNumero}
                      onChange={(e) => setFrecuenciaNumero(e.target.value)}
                    />
                    <Select
					  classNames={{
                        trigger: "text-blue-700",
                        listbox: "text-gray-800 bg-white",
                        popoverContent: "bg-white text-gray-800",
                      }}
					  isRequired
                      label="Frecuencia tipo"
                      selectedKeys={[frecuenciaTipo]}
                      onSelectionChange={(val) =>
                        setFrecuenciaTipo([...val][0])
                      }
                    >
                      {["HORAS", "DÍAS", "SEMANAS"].map((op) => (
                        <SelectItem key={op} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
					  isRequired
                      label="Duración número"
                      type="number"
                      value={duracionNumero}
                      onChange={(e) => setDuracionNumero(e.target.value)}
                    />
                    <Select
					  classNames={{
                        trigger: "text-blue-700",
                        listbox: "text-gray-800 bg-white",
                        popoverContent: "bg-white text-gray-800",
                      }}
					  isRequired
                      label="Duración tipo"
                      selectedKeys={[duracionTipo]}
                      onSelectionChange={(val) =>
                        setDuracionTipo([...val][0])
                      }
                    >
                      {["HORAS", "DÍAS", "SEMANAS", "MES", "AÑO"].map((op) => (
                        <SelectItem key={op} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
					  isRequired
					  label="Fecha de inicio"
					  type="date"
					  value={fechaInicio}
					  onChange={(e) => setFechaInicio(e.target.value)}
					/>

					<Input
					  isRequired
					  label="Hora de inicio"
					  type="time"
					  value={horaInicio}
					  onChange={(e) => setHoraInicio(e.target.value)}
					/>

                    <Select
					  classNames={{
                        trigger: "text-blue-700",
                        listbox: "text-gray-800 bg-white",
                        popoverContent: "bg-white text-gray-800",
                      }}
					  isRequired
                      label="Vía"
                      selectedKeys={[via]}
                      onSelectionChange={(val) => setVia([...val][0])}
                    >
                      {[
                        "ORAL",
                        "INTRAVENOSA",
                        "INTRAMUSCULAR",
                        "SUBCUTÁNEA",
                      ].map((op) => (
                        <SelectItem key={op} value={op}>
                          {op}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Botón calcular y validación */}
                  <div className="mt-4 flex flex-col items-end">
                    <Button
                      color="primary"
                      onClick={calcularTexto}
                      isDisabled={!camposCompletos}
                    >
                      Calcular Posología
                    </Button>
                    {!camposCompletos && (
                      <p className="text-sm text-red-500 mt-2 text-right">
                        Por favor, complete todos los campos para calcular.
                      </p>
                    )}
                  </div>

                  {/* Resultado */}
                  <div className="mt-4">
                    <Textarea label="Calcular" value={calcular} readOnly />
                  </div>
                </div>
              </div>

              {/* Medicación */}				
				<div className="p-4 bg-white shadow rounded-lg space-y-4">
				  <h3 className="font-semibold text-blue-700 text-md mb-2 border-b pb-1">
					Medicación
				  </h3>

				  {/* Indicación */}
				  <div>
					<Input
					  label="Indicación"
					  value={indicacion}
					  onChange={(e) => setIndicacion(e.target.value)}
					  maxLength={maxCaracteres.indicacion}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteres.indicacion - indicacion.length} caracteres restantes
					</div>
					{indicacion.length > maxCaracteres.indicacion && (
					  <p className="text-sm text-red-500">Se excedió el límite de caracteres</p>
					)}
				  </div>

				  {/* Signo de alarma */}
				  <div>
					<Input
					  label="Signo de alarma"
					  value={signoAlarma}
					  onChange={(e) => setSignoAlarma(e.target.value)}
					  maxLength={maxCaracteres.signo_alarma}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteres.signo_alarma - signoAlarma.length} caracteres restantes
					</div>
					{signoAlarma.length > maxCaracteres.signo_alarma && (
					  <p className="text-sm text-red-500">Se excedió el límite de caracteres</p>
					)}
				  </div>

				  {/* Indicación no farmacológica */}
				  <div>
					<Input
					  label="Indicación no farmacológica"
					  value={indicacionNoFarmaco}
					  onChange={(e) => setIndicacionNoFarmaco(e.target.value)}
					  maxLength={maxCaracteres.indicacion_no_farmacologica}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteres.indicacion_no_farmacologica - indicacionNoFarmaco.length} caracteres restantes
					</div>
					{indicacionNoFarmaco.length > maxCaracteres.indicacion_no_farmacologica && (
					  <p className="text-sm text-red-500">Se excedió el límite de caracteres</p>
					)}
				  </div>

				  {/* Recomendación no farmacológica */}
				  <div>
					<Input
					  label="Recomendación no farmacológica"
					  value={recomendacionNoFarmaco}
					  onChange={(e) => setRecomendacionNoFarmaco(e.target.value)}
					  maxLength={maxCaracteres.recomendacion_no_farmacologica}
					/>
					<div className="text-sm text-right text-gray-500">
					  {maxCaracteres.recomendacion_no_farmacologica - recomendacionNoFarmaco.length} caracteres restantes
					</div>
					{recomendacionNoFarmaco.length > maxCaracteres.recomendacion_no_farmacologica && (
					  <p className="text-sm text-red-500">Se excedió el límite de caracteres</p>
					)}
				  </div>
				</div>

              {/* Diagnósticos */}
              <div className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-md font-semibold mb-2 text-blue-700 border-b pb-1">
                  Diagnósticos Asociados
                </h3>
                <DynamicTable
                  columns={columnasDiagnostico}
                  data={diagnosticos}
                  rowsPerPage={5}
                  showActionButton={false}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onModalClose}>
                Cancelar
              </Button>
              <Button
              color="primary"
              onPress={() => {
                if (!nombreMedicamento || !formaFarmaceutica || !viaAdministracion || !concentracion || !presentacion || !tipoMedicamento || !cantidad || !camposCompletos || !calcular) {
                  alert("Por favor, complete todos los campos del medicamento y la posología antes de guardar.");
                  return;
                }

                const datos = {
                  nombreMedicamento,
                  formaFarmaceutica,
                  viaAdministracion,
                  concentracion,
                  presentacion,
                  tipoMedicamento,
                  cantidad,
                  dosisNumero,
                  dosisTipo,
                  frecuenciaNumero,
                  frecuenciaTipo,
                  duracionNumero,
                  duracionTipo,
				  fecha_inicio: fechaInicio,
				  hora_inicio: horaInicio,
                  via,
                  calcular,
                  indicacion,
                  signoAlarma,
                  indicacionNoFarmaco,
                  recomendacionNoFarmaco,
                  externo,
                };

                if (modoEdicion && datosEditar?.index !== undefined) {
                  onGuardar({ ...datos, index: datosEditar.index });
                } else {
                  onGuardar(datos);
                }

                onModalClose(); // cerrar modal
              }}
            >
              {modoEdicion ? "Guardar Cambios" : "Guardar"}
            </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

ModalAgregarMedicamento.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGuardar: PropTypes.func.isRequired,
  diagnosticos: PropTypes.array.isRequired,
  modoEdicion: PropTypes.bool.isRequired,
  datosEditar: PropTypes.shape({
    nombreMedicamento: PropTypes.string,
    formaFarmaceutica: PropTypes.string,
    viaAdministracion: PropTypes.string,
    concentracion: PropTypes.string,
    presentacion: PropTypes.string,
    tipoMedicamento: PropTypes.string,
    cantidad: PropTypes.string,
    dosisNumero: PropTypes.string,
    dosisTipo: PropTypes.string,
    frecuenciaNumero: PropTypes.string,
    frecuenciaTipo: PropTypes.string,
    duracionNumero: PropTypes.string,
    duracionTipo: PropTypes.string,
    via: PropTypes.string,
    calcular: PropTypes.string,
    indicacion: PropTypes.string,
    signoAlarma: PropTypes.string,
    indicacionNoFarmaco: PropTypes.string,
    recomendacionNoFarmaco: PropTypes.string,
    externo: PropTypes.bool,
    index: PropTypes.number,
  }),
};

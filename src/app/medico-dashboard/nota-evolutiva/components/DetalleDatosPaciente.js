"use client";

import React from "react";
import PropTypes from "prop-types";

export default function DetalleDatosPaciente({ paciente, mostrarCampos }) {
    if (!paciente) {
        return <p>No se han encontrado datos del paciente.</p>;
    }

    const debeMostrar = (campo) => !mostrarCampos || mostrarCampos.includes(campo);

    return (
        <div className="flex flex-col justify-center py-2 pt-3 w-full">
            <div className="w-full">
                <div className="grid grid-cols-1 w-full">

                    <div className="relative w-full border rounded-lg p-3 bg-white">
                        <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                            Datos del Paciente
                        </div>

                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">

                            {/* Datos Paciente */}
                            {debeMostrar("nombres") && (
                                <p>
                                    <span className="font-semibold">Nombres:</span> {paciente.nombres}
                                </p>
                            )}
                            {debeMostrar("identificacion") && (
                                <p>
                                    <span className="font-semibold">Identificación:</span> {paciente.identificacion}
                                </p>
                            )}
                            {debeMostrar("fecha_nacimiento") && (
                                <p>
                                    <span className="font-semibold">F. Nacimiento:</span> {paciente.fecha_nacimiento?.split("T")[0]}
                                </p>
                            )}
                            {debeMostrar("genero") && (
                                <p>
                                    <span className="font-semibold">Género:</span> {paciente.genero}
                                </p>
                            )}
                            {debeMostrar("estado_civil") && (
                                <p>
                                    <span className="font-semibold">Estado Civil:</span> {paciente.estado_civil}
                                </p>
                            )}
                            {debeMostrar("edad") && (
                                <p>
                                    <span className="font-semibold">Edad:</span> {paciente.edad}
                                </p>
                            )}
                            {debeMostrar("grupo_etario") && (
                                <p>
                                    <span className="font-semibold">Grupo Etario:</span> {paciente.grupo_etario}
                                </p>
                            )}

                            {/* Datos Seguro */}
                            {paciente.seguro && (
                                <>
                                    <p>
                                        <span className="font-semibold">Tipo Seguro:</span> {paciente.seguro.tipo}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Beneficiario:</span> {paciente.seguro.beneficiario}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Código Seguro:</span> {paciente.seguro.codigo_seguro}
                                    </p>
                                </>
                            )}

                            {/* Datos Médico */}
                            {paciente.medico && (
                                <>
                                    <p>
                                        <span className="font-semibold">Médico:</span> {paciente.medico.nombres_medico}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Especialidad:</span> {paciente.medico.especialidad}
                                    </p>
                                </>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

DetalleDatosPaciente.propTypes = {
    paciente: PropTypes.shape({
        identificacion: PropTypes.string,
        nombres: PropTypes.string,
        fecha_nacimiento: PropTypes.string,
        genero: PropTypes.string,
        estado_civil: PropTypes.string,
        edad: PropTypes.number,
        grupo_etario: PropTypes.string,
        seguro: PropTypes.shape({
            tipo: PropTypes.string,
            beneficiario: PropTypes.string,
            codigo_seguro: PropTypes.string,
        }),
        medico: PropTypes.shape({
            nombres_medico: PropTypes.string,
            especialidad: PropTypes.string,
        }),
    }).isRequired,
    mostrarCampos: PropTypes.arrayOf(PropTypes.string),
};

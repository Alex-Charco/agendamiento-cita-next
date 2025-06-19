"use client";

import React from "react";
import PropTypes from "prop-types";

export default function PacienteDetalle({ paciente, mostrarCampos }) {
    if (!paciente) {
        return <p>No se han encontrado datos del paciente.</p>;
    }

    const debeMostrar = (campo) => !mostrarCampos || mostrarCampos.includes(campo);

    return (
        <div className="flex flex-col justify-center py-2 pt-4 w-full">
            <div className="w-full">
                <div className="grid grid-cols-1 w-full">
                    
                    <div className="relative w-full border rounded-lg p-3 bg-white">
                        <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                            Datos Personales
                        </div>

                        {/* Grid interna: 2 columnas y 2 filas en pantallas medianas en adelante */}
                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                            {debeMostrar("nombre") && (
                                <p>
                                    <span className="font-semibold">Nombre:</span>{" "}
                                    {paciente.nombre}
                                </p>
                            )}
                            {debeMostrar("identificacion") && (
                                <p>
                                    <span className="font-semibold">Identificación:</span>{" "}
                                    {paciente.identificacion}
                                </p>
                            )}
							{debeMostrar("fecha_nacimiento") && (
                                <p>
                                    <span className="font-semibold">F. Nacimiento:</span>{" "}
                                    {paciente.fecha_nacimiento}
                                </p>
                            )}
							{debeMostrar("telefono") && (
                                <p>
                                    <span className="font-semibold">Teléfono:</span>{" "}
                                    {paciente.telefono}
                                </p>
                            )}
							{debeMostrar("celular") && (
                                <p>
                                    <span className="font-semibold">Celular:</span>{" "}
                                    {paciente.celular}
                                </p>
                            )}
							{debeMostrar("genero") && (
                                <p>
                                    <span className="font-semibold">Género:</span>{" "}
                                    {paciente.genero}
                                </p>
                            )}
							{debeMostrar("edad") && (
                                <p>
                                    <span className="font-semibold">Edad:</span>{" "}
                                    {paciente.edad}
                                </p>
                            )}
							{debeMostrar("grupo_etario") && (
                                <p>
                                    <span className="font-semibold">Grupo Etario:</span>{" "}
                                    {paciente.grupo_etario}
                                </p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

PacienteDetalle.propTypes = {
    paciente: PropTypes.shape({
        identificacion: PropTypes.string,
        nombre: PropTypes.string,
        correo: PropTypes.string,
        edad: PropTypes.number,
        grupo_etario: PropTypes.string,
        nombre_usuario: PropTypes.string,
    }).isRequired,
    mostrarCampos: PropTypes.arrayOf(PropTypes.string),
};

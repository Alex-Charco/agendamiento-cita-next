"use client";

import React from "react";
import PropTypes from "prop-types";

export default function MedicoDetalle({ medico, mostrarCampos }) {
    if (!medico) {
        return <p>No se han encontrado datos para el médico.</p>;
    }
	
	// Helper para saber si mostrar cierto campo
    const debeMostrar = (campo) => !mostrarCampos || mostrarCampos.includes(campo);

    return (
        <div className="flex flex-col justify-center py-2">
            <div className="flex flex-col w-full gap-4 border rounded bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4">

                    {/* Datos del Médico */}
                    <div className="relative border rounded-lg p-4 text-left bg-white">
                        <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                            Datos Personales
                        </div>

                        <div className="mt-2 space-y-2 text-xs text-gray-700">
                            {debeMostrar("nombre") && (
                                <p>
                                    <span className="font-semibold">Nombre:</span>{" "}
                                    {[medico.primer_nombre, medico.segundo_nombre, medico.primer_apellido, medico.segundo_apellido]
                                        .filter(Boolean)
                                        .join(" ")}
                                </p>
                            )}
                            {debeMostrar("identificacion") && (
                                <p><span className="font-semibold">Identificación:</span> {medico.identificacion}</p>
                            )}
                            {debeMostrar("correo") && (
                                <p><span className="font-semibold">Correo:</span> {medico.correo}</p>
                            )}
                            {debeMostrar("fecha_nacimiento") && (
                                <p><span className="font-semibold">Fecha de Nacimiento:</span> {medico.fecha_nacimiento}</p>
                            )}
                            {debeMostrar("genero") && (
                                <p><span className="font-semibold">Género:</span> {medico.genero}</p>
                            )}
                            {debeMostrar("celular") && (
                                <p><span className="font-semibold">Celular:</span> {medico.celular}</p>
                            )}
                            {debeMostrar("telefono") && (
                                <p><span className="font-semibold">Teléfono:</span> {medico.telefono}</p>
                            )}
                            {debeMostrar("estatus") && (
                                <p><span className="font-semibold">Estatus:</span> {medico.estatus}</p>
                            )}
                            {debeMostrar("reg_msp") && (
                                <p><span className="font-semibold">Reg. MSP:</span> {medico.reg_msp}</p>
                            )}
                        </div>
                    </div>

                    {/* Especialidad */}
                    {debeMostrar("especialidad") && (
                        <div className="relative bg-white border rounded-lg p-4 text-left">
                            <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                                Especialidad
                            </div>

                            <div className="mt-2 space-y-2 text-xs text-gray-700">
                                <p><span className="font-semibold">Nombre:</span> {medico.especialidad?.nombre}</p>
                                <p><span className="font-semibold">Atención:</span> {medico.especialidad?.atencion}</p>
                                <p><span className="font-semibold">Consultorio:</span> {medico.especialidad?.consultorio}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ✅ Validación completa de props
MedicoDetalle.propTypes = {
    medico: PropTypes.shape({
        identificacion: PropTypes.string,
        fecha_nacimiento: PropTypes.string,
        primer_nombre: PropTypes.string.isRequired,
        segundo_nombre: PropTypes.string,
        primer_apellido: PropTypes.string.isRequired,
        segundo_apellido: PropTypes.string,
        genero: PropTypes.oneOf(["NINGUNO", "MASCULINO", "FEMENINO"]),
        reg_msp: PropTypes.string,
        celular: PropTypes.string,
        telefono: PropTypes.string,
        correo: PropTypes.string,
        estatus: PropTypes.number,
        especialidad: PropTypes.shape({
            nombre: PropTypes.string,
            atencion: PropTypes.string,
            consultorio: PropTypes.string,
        }),
    }).isRequired,
    mostrarCampos: PropTypes.arrayOf(PropTypes.string),
};
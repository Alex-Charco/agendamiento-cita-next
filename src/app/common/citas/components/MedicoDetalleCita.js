"use client";

import React from "react";
import PropTypes from "prop-types";

export default function MedicoDetalleCita({ medico, mostrarCampos }) {
    if (!medico) {
        return <p>No se han encontrado datos para el médico.</p>;
    }
	
	// Helper para saber si mostrar cierto campo
    const debeMostrar = (campo) => !mostrarCampos || mostrarCampos.includes(campo);

    return (
        <div className="flex flex-col justify-center py-2 pt-4 w-full">
            <div className="w-full px-4">
                <div className="grid grid-cols-1 gap-6 w-full">
                    
                    <div className="relative w-full border rounded-lg p-3 bg-white">
                        <div className="absolute bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                            Datos Personales Médico
                        </div>

						<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-2 text-xs text-gray-700">
                            {debeMostrar("nombre") && (
                                <p>
                                    <span className="font-semibold">Nombre:</span>{" "}
                                    {medico.nombre}
                                </p>
                            )}
                            
                            {debeMostrar("especialidad") && (
                                <p><span className="font-semibold">Especialidad:</span> {medico.especialidad}</p>
                            )}
                            {debeMostrar("atencion") && (
                                <p><span className="font-semibold">Atención:</span> {medico.atencion}</p>
                            )}
                            {debeMostrar("consultorio") && (
                                <p><span className="font-semibold">Consultorio:</span> {medico.consultorio}</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// ✅ Validación completa de props
MedicoDetalleCita.propTypes = {
    medico: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        identificacion: PropTypes.string,
        primer_nombre: PropTypes.string.isRequired,
        segundo_nombre: PropTypes.string,
        primer_apellido: PropTypes.string.isRequired,
        segundo_apellido: PropTypes.string,
        estatus: PropTypes.number,
        especialidad: PropTypes.string,
        atencion: PropTypes.string,
        consultorio: PropTypes.string,
    }).isRequired, // ✅ Aquí va el .isRequired directamente sobre el shape
    mostrarCampos: PropTypes.arrayOf(PropTypes.string),
};

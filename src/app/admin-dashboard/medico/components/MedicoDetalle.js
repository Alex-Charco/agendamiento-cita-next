"use client";

export default function MedicoDetalle({ medico }) {
    if (!medico) {
        return <p>No se han encontrado datos para el médico.</p>;
    }

    return (
        <div className="flex flex-col justify-center py-2">
            <div className=" flex flex-col w-full gap-4 border rounded bg-gray-50">
    
                {/* Contenedor de Datos y Especialidad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2 py-4">
    
                    {/* Datos del Médico */}
                    <div className="relative border rounded-lg p-4 text-left bg-white">
                        {/* Título flotante dentro de este bloque */}
                        <div className="absolute  bg-white -top-2 left-4 px-2 text-[10px] text-blue-800">
                            Datos Personales
                        </div>
    
                        <div className="mt-2 space-y-2 text-xs  text-gray-700">
                            <p>
                                <span className="font-semibold">Nombre:</span>{" "}
                                {[medico.primer_nombre, medico.segundo_nombre, medico.primer_apellido, medico.segundo_apellido]
                                    .filter(Boolean)
                                    .join(" ")}
                            </p>
                            <p><span className="font-semibold">Identificación:</span> {medico.identificacion}</p>
                            <p><span className="font-semibold">Fecha de Nacimiento:</span> {medico.fecha_nacimiento}</p>
                            <p><span className="font-semibold">Género:</span> {medico.genero}</p>
                            <p><span className="font-semibold">Celular:</span> {medico.celular}</p>
                            <p><span className="font-semibold">Teléfono:</span> {medico.telefono}</p>
                            <p><span className="font-semibold">Correo:</span> {medico.correo}</p>
                            <p><span className="font-semibold">Estatus:</span> {medico.estatus}</p>
                            <p><span className="font-semibold">Reg. MSP:</span> {medico.reg_msp}</p>
                        </div>
                    </div>
    
                    {/* Especialidad */}
                    <div className="relative bg-white border rounded-lg p-4 text-left">
                        {/* Título flotante dentro de este bloque */}
                        <div className="absolute bg-white -top-2 left-4 bg-gray-50 px-2 text-[10px] text-blue-800">
                            Especialidad
                        </div>
    
                        <div className="mt-2 space-y-2 text-xs text-gray-700">
                            <p><span className="font-semibold">Nombre:</span> {medico.especialidad?.nombre}</p>
                            <p><span className="font-semibold">Atención:</span> {medico.especialidad?.atencion}</p>
                            <p><span className="font-semibold">Consultorio:</span> {medico.especialidad?.consultorio}</p>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    );    
}

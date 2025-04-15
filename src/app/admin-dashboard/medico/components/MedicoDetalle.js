"use client";

export default function MedicoDetalle({ medico }) {
    if (!medico) {
        return <p>No se han encontrado datos para el médico.</p>;
    }

    return (
        <div className="flex justify-center py-8">
            <div className="flex flex-col w-full max-w-4xl gap-4 border rounded-xl shadow-lg p-6 bg-white">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
                    Detalles del Médico
                </h2>

                {/* Datos del Médico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 border rounded-lg p-4">
                    <p>
                        <span className="font-semibold">Nombre:</span>{" "}
                        {[medico.primer_nombre, medico.segundo_nombre, medico.primer_apellido, medico.segundo_apellido]
                            .filter(Boolean)
                            .join(" ")}
                    </p>
                    <p>
                        <span className="font-semibold">Identificación:</span>{" "}
                        {medico.identificacion}
                    </p>
                    <p>
                        <span className="font-semibold">Fecha de Nacimiento:</span>{" "}
                        {medico.fecha_nacimiento}
                    </p>
                    <p>
                        <span className="font-semibold">Género:</span> {medico.genero}
                    </p>
                    <p>
                        <span className="font-semibold">Celular:</span> {medico.celular}
                    </p>
                    <p>
                        <span className="font-semibold">Teléfono:</span> {medico.telefono}
                    </p>
                    <p>
                        <span className="font-semibold">Correo:</span> {medico.correo}
                    </p>
                    <p>
                        <span className="font-semibold">Estatus:</span> {medico.estatus}
                    </p>
                    <p>
                        <span className="font-semibold">Reg. MSP:</span> {medico.reg_msp}
                    </p>
                </div>

                {/* Especialidad */}
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-6">
                    Especialidad
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 bg-gray-50 border rounded-lg p-4">
                    <p>
                        <span className="font-semibold">Nombre:</span>{" "}
                        {medico.especialidad?.nombre}
                    </p>
                    <p>
                        <span className="font-semibold">Atención:</span>{" "}
                        {medico.especialidad?.atencion}
                    </p>
                    <p>
                        <span className="font-semibold">Consultorio:</span>{" "}
                        {medico.especialidad?.consultorio}
                    </p>
                </div>
            </div>
        </div>
    );
}

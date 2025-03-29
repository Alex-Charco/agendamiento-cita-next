"use client";
import { useState } from "react";
import axios from "axios";

export default function PacienteSearch() {
    const [query, setQuery] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPacientes = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setPacientes([]);

        try {
            const token = localStorage.getItem('authToken');
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/get/${query}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Respuesta de la API:", response.data);

            if (response.data && response.data.paciente) {
                setPacientes([response.data.paciente]);
            } else {
                throw new Error("La API no devolvió un paciente válido");
            }
        } catch (err) {
            console.error("Error al obtener pacientes:", err.message);
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Consulta de Pacientes</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Ingresar identificación..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchPacientes}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>
                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {pacientes.map((paciente) => (
                    <div key={paciente.id_paciente} className="border p-4 rounded-lg shadow-sm bg-gray-50 mt-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {`${paciente.primer_nombre} ${paciente.segundo_nombre} ${paciente.primer_apellido} ${paciente.segundo_apellido}`}
                        </h2>
                        <p className="text-gray-600"><strong>ID Paciente:</strong> {paciente.id_paciente}</p>
                        <p className="text-gray-600"><strong>ID Usuario:</strong> {paciente.id_usuario}</p>
                        <p className="text-gray-600"><strong>Identificación:</strong> {paciente.identificacion}</p>
                        <p className="text-gray-600"><strong>Fecha de Nacimiento:</strong> {paciente.fecha_nacimiento}</p>
                        <p className="text-gray-600"><strong>Género:</strong> {paciente.genero}</p>
                        <p className="text-gray-600"><strong>Celular:</strong> {paciente.celular}</p>
                        <p className="text-gray-600"><strong>Teléfono:</strong> {paciente.telefono}</p>
                        <p className="text-gray-600"><strong>Correo:</strong> {paciente.correo}</p>
                        <p className="text-gray-600"><strong>Estado Civil:</strong> {paciente.estado_civil}</p>
                        <p className="text-gray-600"><strong>Grupo Sanguíneo:</strong> {paciente.grupo_sanguineo}</p>
                        <p className="text-gray-600"><strong>Instrucción:</strong> {paciente.instruccion}</p>
                        <p className="text-gray-600"><strong>Ocupación:</strong> {paciente.ocupacion}</p>
                        <p className="text-gray-600"><strong>Empresa:</strong> {paciente.empresa || "N/A"}</p>
                        <p className="text-gray-600"><strong>Discapacidad:</strong> {paciente.discapacidad ? "Sí" : "No"}</p>
                        <p className="text-gray-600"><strong>Orientación:</strong> {paciente.orientacion}</p>
                        <p className="text-gray-600"><strong>Identidad:</strong> {paciente.identidad}</p>
                        <p className="text-gray-600"><strong>Tipo de Paciente:</strong> {paciente.tipo_paciente}</p>
                        <p className="text-gray-600"><strong>Estatus:</strong> {paciente.estatus === 1 ? "Activo" : "Inactivo"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

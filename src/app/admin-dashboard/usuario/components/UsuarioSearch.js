"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UsuarioSearch({ onSelectUsuario }) {
    const [query, setQuery] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsuarios = async () => {
		if (!query.trim()) return;
		setLoading(true);
		setError(null);
		setUsuarios([]);

		try {
			const token = localStorage.getItem('authToken');
			const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/get/${query}`;
			const response = await axios.get(apiUrl, {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.data && response.data.id_usuario) {
				// Creamos un objeto de usuario simplificado (puedes ajustar esto si necesitas más campos)
				const usuario = {
					id_paciente: response.data.id_usuario,
					nombre_usuario: response.data.nombre_usuario,
					rol: response.data.rol,
					estatus: response.data.estatus
				};

				setUsuarios([usuario]);
			} else {
				setUsuarios([]);
				setError("No se encontró el usuario.");
			}
		} catch (err) {
			console.error("Error al obtener usuario:", err);
			setError("Error al obtener los datos. Inténtelo nuevamente.");
			setUsuarios([]);
		} finally {
			setLoading(false);
		}
	};

	
	// Guardar la identificación en localStorage cuando cambie el valor de query
    useEffect(() => {
        if (query.trim()) {
            localStorage.setItem("nombre_usuario", query);
        }
    }, [query]);

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Paciente</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Ingresar identificación..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full border border-gray-300 text-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={fetchUsuarios}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>
                {loading && <p className="text-blue-500 mt-4">Cargando...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {usuarios.map((usuario) => (
                    <div key={usuario.id_paciente} className="border p-4 rounded-lg shadow-sm bg-gray-50 mt-4">
                        <h2 className="text-lg font-semibold text-gray-700">
							{usuario.nombre_usuario}
						</h2>
                        <button
                            onClick={() => {
                                // Pasamos el usuario seleccionado al padre y actualizamos la identificación
                                onSelectUsuario(usuario);
                                localStorage.setItem("nombre_usuario", usuario.nombre_usuario);
                            }}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Seleccionar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

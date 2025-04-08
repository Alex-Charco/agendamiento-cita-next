"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

function UsuarioSearch({ onSelectUsuario }) {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsuarios = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("authToken");
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/get/${query}`;
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("API GET", apiUrl);

            if (response.data?.id_usuario) {
                const usuario = {
                    id_paciente: response.data.id_usuario,
                    nombre_usuario: response.data.nombre_usuario,
                    rol: response.data.rol,
                    estatus: response.data.estatus,
                };

                // Guardar en localStorage y enviar al componente padre
                localStorage.setItem("nombre_usuario", usuario.nombre_usuario);
                onSelectUsuario(usuario);
            } else {
                setError("No se encontró el usuario.");
            }
        } catch (err) {
            console.error("Error al obtener usuario:", err);
            setError("Error al obtener los datos. Inténtelo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-200 px-6 pt-10 flex flex-col items-center h-[52vh] rounded-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Buscar Usuario</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Ingresar nombre de usuario..."
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
            </div>
        </div>
    );
}

UsuarioSearch.propTypes = {
    onSelectUsuario: PropTypes.object,
};


export default UsuarioSearch;
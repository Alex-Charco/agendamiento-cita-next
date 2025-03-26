"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { validarPassword } from "../../../utils/validarPassword.js";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [nombre_usuario, setNombreUsuario] = useState("");
    const [message, setMessage] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage("El token es inválido o ha expirado.");
            return;
        }

        // Validar la contraseña antes de enviarla
        const validation = validarPassword(password);
        if (!validation.isValid) {
            setPasswordErrors(validation.errors);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
                token,
                nombre_usuario,
                newPassword: password,
            });

            setMessage(response.data.message || "Contraseña restablecida con éxito.");
            setPassword("");
            setNombreUsuario("");
            setPasswordErrors([]);
        } catch (error) {
            setMessage("Ocurrió un error, intenta nuevamente.");
            console.error("Error de Axios:", error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/background.svg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-5"></div>
            <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-lg w-96" style={{
                border: '4px solid rgba(0, 56, 255, 0.3)',
                boxShadow: '0 4px 10px rgba(0, 56, 255, 0.5)',
            }}>
                <h2 className="text-lg font-bold mb-4 text-center">Restablecer contraseña</h2>

                {/* Usuario */}
                <div className="flex items-center mb-4">
                    <label className="text-xs font-bold mr-2 w-1/3 text-left" htmlFor="nombre_usuario">
                        Usuario
                    </label>
                    <input
                        type="text"
                        className="border p-2 w-2/3"
                        placeholder="Ingresar el usuario"
                        value={nombre_usuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </div>

                {/* Contraseña */}
                <div className="flex items-center mb-4">
                    <label className="text-xs font-bold mr-2 w-1/3 text-left" htmlFor="password">
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        className="border p-2 w-2/3"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordErrors([]); // Limpiar errores al escribir
                        }}
                        required
                    />
                </div>

                {/* Mostrar errores de contraseña si existen */}
                {passwordErrors.length > 0 && (
                    <ul className="text-red-500 mt-2 text-sm">
                        {passwordErrors.map((error, index) => (
                            <li key={index}>⚠️ {error}</li>
                        ))}
                    </ul>
                )}

                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Restablecer contraseña
                </button>

                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </form>
        </div>
    );
}

// Envolver la página con Suspense
export default function Page() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <ResetPasswordForm />
        </Suspense>
    );
}



/*"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [nombre_usuario, setNombreUsuario] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage("El token es inválido o ha expirado.");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`, {
                token,
                nombre_usuario,
                newPassword: password,
            });

            setMessage(response.data.message || "Contraseña restablecida con éxito.");
        } catch (error) {
            setMessage("Ocurrió un error, intenta nuevamente.");
            console.error("Error de Axios:", error);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Usuario</h2>
                <input
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Ingresar el usuario"
                    value={nombre_usuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    required
                />
                <h2 className="text-lg font-bold mb-4">Nueva contraseña</h2>
                <input
                    type="password"
                    className="border p-2 w-full"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Restablecer contraseña
                </button>
                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </div>
    );
}

// Envolver la página con Suspense
export default function Page() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
*/
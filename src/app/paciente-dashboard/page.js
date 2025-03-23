"use client"; // Necesario para usar hooks en Next.js

import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Bienvenido</h1>
      <p className="text-lg mb-4">Seleccione una opción para continuar</p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/crear-cita")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Crear Cita Médica
        </button>
        <button
          onClick={() => router.push("/ver-citas")}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
        >
          Ver Citas Pendientes
        </button>
      </div>
    </div>
  );
};

export default HomePage;

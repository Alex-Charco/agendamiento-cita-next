"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import CardFeature from "../components/CardFeature";
import Footer from "../components/Footer";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar userType={null} />

      <header className="flex flex-col items-center justify-center text-center p-10 bg-blue-500 text-white">
        <h2 className="text-4xl font-bold mb-4">Bienvenido a Hospital Plus</h2>
        <p className="text-lg">Gestione sus citas médicas fácilmente</p>
      </header>

      <div className="flex flex-col items-center justify-center p-10">
        <h3 className="text-2xl font-bold mb-6">Seleccione una opción</h3>
        <div className="flex gap-6">
          <Button text="Crear Cita Médica" onClick={() => router.push("/crear-cita")} />
          <Button text="Ver Citas Pendientes" onClick={() => router.push("/ver-citas")} />
        </div>
      </div>

      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardFeature icon="📅" title="Agendar Citas" description="Seleccione una fecha y hora para su consulta." />
        <CardFeature icon="🔍" title="Consultar Citas" description="Revise su historial y próximas citas." />
        <CardFeature icon="👤" title="Perfil Personalizado" description="Gestione su información de contacto." />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

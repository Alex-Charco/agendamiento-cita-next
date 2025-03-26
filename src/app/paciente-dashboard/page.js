"use client";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import CardFeature from "../components/CardFeature";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Navbar userType={null} />
      
      <Banner
        title="Bienvenido al Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Gestione sus citas médicas fácilmente"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Crear Cita Médica", link: "/crear-cita", variant: "primary" },
          { text: "Consultar Cita Médica", link: "/ver-citas", variant: "secondary" },
        ]}
      />

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

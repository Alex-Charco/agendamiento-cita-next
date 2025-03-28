"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "@/components/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      
      <NavbarComponent
      // Agregar o quitar elementos editando menuItems.

        //menuItems={["Paciente"]}
        showExtraOptions={true}
      />


      <Banner
        title="Bienvenido al Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Gestione sus citas médicas fácilmente"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Reagendar Cita Médica", link: "/crear-cita", variant: "primary" },
          { text: "Consultar Cita Médica", link: "/ver-citas", variant: "secondary" },
        ]}
      />

      <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardFeature icon="📅" title="Reagendar Citas" description="Seleccione una fecha, hora, especialidadd y médico para reagendar la cita médica." />
        <CardFeature icon="🔍" title="Consultar Citas" description="Revise su historial y próximas citas  médicas." />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
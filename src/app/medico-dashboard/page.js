"use client";

import NavbarComponent from "@/components/navbars/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      
      <NavbarComponent
        menuServices={[  
          { name: "Consultar Cita", path: "/ver-citas" },
          { name: "Consultar Horario", path: "/ver-horarios" },
          { name: "Reagendar Cita", path: "/crear-cita" }
        ]}
        showExtraOptions={true} // Mostrar opciones adicionales, como servicios y salir
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
        <CardFeature icon="🔍" title="Consultar Citas" description="Revise su historial y próximas citas médicas." />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

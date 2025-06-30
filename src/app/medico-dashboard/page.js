"use client";

import NavbarComponent from "@/components/navbars/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">

      <NavbarComponent
	    menuItems={[
			{ name: "Contacto", path: "/medico-dashboard/contacto" },
		]}
        menuServices={[
          {
            name: "Paciente",
            subMenu: [
              { name: "Buscar Cita", path: "/medico-dashboard/cita/consultar-cita-medico" },
			  { name: "Receta", path: "/medico-dashboard/receta" },
            ],
          },
          {
            name: "Médico",
            subMenu: [
              { name: "Buscar Horario", path: "/medico-dashboard/consultar-horario" },
            ],
          },
        ]}
        showExtraOptions={true} // Mostrar opciones adicionales, como servicios y salir
      />

      <Banner
        title="Bienvenido al Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Gestione sus citas médicas fácilmente"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Buscar Cita Médica", link: "/medico-dashboard/cita/consultar-cita-medico" },
          { text: "Buscar Horario", link: "/medico-dashboard/consultar-horario", variant: "secondary" },
        ]}
      />

      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
		<CardFeature icon="🔍" title="Consultar Citas" description="Revise su historial y próximas citas médicas." />
		<CardFeature icon="🔍" title="Consultar Horarios" description="Revise su horario y turnos de disponibilidad de citas médicas." />
        <CardFeature icon="📅" title="Reagendar Citas" description="Seleccione una fecha, hora, especialidadd y médico para reagendar la cita médica." />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

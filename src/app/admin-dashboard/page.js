"use client";

import NavbarComponent from "@/components/navbars/Navbar";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import menuServicesAdmin from "@/utils/menuServices"
import adminCards from "@/data/adminCards";

const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NavbarComponent
	    menuItems={[
			{ name: "Contacto", path: "/admi-dashboard/contacto" },
		  ]}
        menuServices={menuServicesAdmin}
        showExtraOptions={true}
      />

      <Banner
        title="Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Sistema de Gestión Hospitalaria"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Buscar Cita Médica", link: "/admin-dashboard/cita/consultar-cita", variant: "primary" },
          { text: "Buscar Paciente", link: "/admin-dashboard/paciente/consultar-paciente", variant: "secondary" },
        ]}
      />

      <CardGrid cards={adminCards} />

      <Footer />
    </div>
  );
};

export default HomePage;

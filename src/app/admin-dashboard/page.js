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
        menuServices={menuServicesAdmin}
        showExtraOptions={true}
      />

      <Banner
        title="Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Sistema de Gestión Hospitalaria"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Reagendar Cita Médica", link: "/crear-cita", variant: "primary" },
          { text: "Consultar Cita Médica", link: "/admin-dashboard/cita/consultar-cita", variant: "secondary" },
        ]}
      />

      <CardGrid cards={adminCards} />

      <Footer />
    </div>
  );
};

export default HomePage;

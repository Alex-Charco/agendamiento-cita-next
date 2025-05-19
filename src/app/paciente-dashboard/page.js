"use client";

import NavbarComponent from "@/components/navbars/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      
      <NavbarComponent
        menuServices={[
          { name: "Agendar Cita", path: "/crear-cita" },
          { name: "Consultar Cita", path: "/paciente-dashboard/cita/consultar-cita" },
        ]}
        showExtraOptions={true}
      />


      <Banner
        title="Bienvenido al Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Gestione sus citas médicas fácilmente"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Agendar Cita Médica", link: "/crear-cita", variant: "primary" },
          { text: "Consultar Cita Médica", link: "/paciente-dashboard/cita/consultar-cita", variant: "secondary" },
        ]}
      />

      <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardFeature 
			icon={<FaRegCalendarAlt className="text-blue-700" size={24} />} 
			title="Agendar Citas" 
			description="Programa fácilmente tu cita médica eligiendo la fecha, hora, especialidad y médico de tu preferencia." />
        <CardFeature 
			icon={<IoSearchSharp className="text-green-700" size={24} />}  
			title="Consultar Citas" 
			description="Consulta el historial de tus citas médicas y accede a los detalles de cada una en cualquier momento." />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

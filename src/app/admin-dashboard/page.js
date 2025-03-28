"use client";
import { useRouter } from "next/navigation";
import NavbarComponent from "@/components/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { FaUserInjured, FaCalendarCheck, FaRedoAlt, FaCalendarAlt } from "react-icons/fa";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NavbarComponent
        menuServices={[
          { name: "Paciente", path: "/admin-dashboard/paciente/consulta-paciente" },
          { name: "Médico", path: "/common/consulta-medico" },
          { name: "Usuario", path: "/common/consulta-cita" },
          { name: "Cita", path: "/common/crear-cita" },
          { name: "Horario", path: "/common/cancelar-cita" },
        ]}
        showExtraOptions={true}
      />

      <Banner
        title="Hospital de Brigada de Selva No.17 “Pastaza”"
        description="Sistema de Gestión Hospitalaria"
        imageUrl="/images/hospital-banner.jpg"
        buttons={[
          { text: "Agendar Cita Médica", link: "/crear-cita", variant: "primary" },
          { text: "Consultar Cita Médica", link: "/ver-citas", variant: "secondary" },
        ]}
      />

      <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardFeature 
          icon={<FaUserInjured className="text-blue-500 text-3xl" />} // Icono de paciente
          title="Pacientes" 
          description="Podrá consultar, registrar y actualizar a los pacientes" 
        />
        <CardFeature 
          icon={<FaCalendarCheck className="text-green-500 text-3xl" />} // Icono para Agendar Citas
          title="Agendar Citas" 
          description="Seleccione una fecha, hora, especialidad y médico para agendar la cita médica." 
        />
        <CardFeature 
          icon={<FaRedoAlt className="text-yellow-500 text-3xl" />} // Icono para Reagendar Citas
          title="Reagendar Citas" 
          description="Seleccione una fecha, hora, especialidad y médico para reagendar la cita médica." 
        />
        <CardFeature 
          icon={<FaCalendarAlt className="text-purple-500 text-3xl" />} // Icono para Consultar Citas
          title="Consultar Citas" 
          description="Revise su historial y próximas citas médicas." 
        />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

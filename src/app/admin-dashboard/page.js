"use client";

import Link from "next/link";
import NavbarComponent from "@/components/navbars/Navbar";
import CardFeature from "@/components/CardFeature";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { FaUserInjured, FaCalendarCheck, FaRedoAlt, FaCalendarAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const HomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NavbarComponent
        menuServices={[
          { name: "Cita", path: "/common/crear-cita" },
          {
            name: "Horario",
            subMenu: [
              { name: "Consultar Horario", path: "/admin-dashboard/horario/consultar-horario" },
              { name: "Nuevo horario", path: "/admin-dashboard/horario/registrar-horario" },
            ],
          },
          {
            name: "Médico",
            subMenu: [
              { name: "Actualizar Médico", path: "/admin-dashboard/medico/actualizar-medico" },
              { name: "Consultar Médico", path: "/admin-dashboard/medico/consultar-medico" },
              { name: "Nuevo Médico", path: "/admin-dashboard/medico/registrar-medico" },
            ],
          },
          {
            name: "Paciente",
            subMenu: [
              { name: "Actualizar Paciente", path: "/admin-dashboard/paciente/actualizar-paciente" },
              { name: "Consultar Paciente", path: "/admin-dashboard/paciente/consultar-paciente" },
              { name: "Muevo Paciente", path: "/admin-dashboard/paciente/registrar-paciente" },
            ],
          }
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
        <Link href="/admin-dashboard/paciente/consultar-paciente">
          <CardFeature
            icon={<FaUserInjured className="text-azul text-3xl" />}
            title="Pacientes"
            description={
              <>
                <span className="block text-left text-sm mt-2">Podrá consultar, registrar y actualizar a los pacientes</span><br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
              </>
            }

          />
        </Link>
        <Link href="/admin-dashboard/médico/consultar-médico">
          <CardFeature
            icon={<FaUserDoctor className="text-azul text-3xl" />}
            title="Médicos"
            description={
              <>
                <span className="block text-left text-sm mt-2">Podrá consultar, registrar y actualizar a los pacientes</span><br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
              </>
            }

          />
        </Link>
        <CardFeature
          icon={<FaCalendarCheck className="text-green-500 text-3xl" />}
          title="Agendar Citas"
          description="Seleccione una fecha, hora, especialidad y médico para agendar la cita médica."
        />
        <CardFeature
          icon={<FaRedoAlt className="text-yellow-500 text-3xl" />}
          title="Reagendar Citas"
          description="Seleccione una fecha, hora, especialidad y médico para reagendar la cita médica."
        />
        <CardFeature
          icon={<FaCalendarAlt className="text-purple-500 text-3xl" />}
          title="Consultar Citas"
          description="Revise su historial y próximas citas médicas."
        />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

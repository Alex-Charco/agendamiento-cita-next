"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "@/components/navbars/NavbarComponent";
import Footer from "@/components/Footer";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { getCommonButtonsByPath } from "@/utils/commonButtons";

const Contacto = () => {
  const pathname = usePathname();
  
  const buttons = [
        ...getCommonButtonsByPath(pathname),
    ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <NavbarComponent title="Consultar Horario" buttons={buttons} />
      <main className="flex-grow pt-5 px-4 sm:px-10">

        <h1 className="text-center text-3xl font-bold text-indigo-700 mb-10">
          Contáctanos
        </h1>

        <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
            Hospital de Brigada de Selva No.17 “Pastaza”
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MdPhone className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-semibold">Celular</h3>
                <p>099 134 6301</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MdEmail className="h-6 w-6 text-indigo-600" />
              <div>
                <h3 className="font-semibold">Correo electrónico</h3>
                <p>brigadaselva17hostipal@ejercito.mil.ec</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MdLocationOn className="h-6 w-6 text-red-500" />
              <div>
                <h3 className="font-semibold">Dirección: </h3>
                <p>Av. General Eloy Alfaro y Calle Ceslao Marin, cerca de Iglesia Católica Jesús del Gran Poder - Pindo (El Dorado), así como del terreno de juego de CANCHA DE USO MULTIPLE.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;

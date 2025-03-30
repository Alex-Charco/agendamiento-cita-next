"use client";

import Link from "next/link";
import CardFeature from "@/components/CardFeature";
import { FaUserInjured, FaCalendarCheck, FaRedoAlt } from "react-icons/fa";

export default function ConsultaPacientePage() {
    return (
        <section className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/admin-dashboard/paciente/consultar-paciente">
                <CardFeature 
                    icon={<FaUserInjured className="text-blue-500 text-3xl" />} 
                    title="Consultar paciente" 
                    description="Ingresar" 
                />
            </Link>
            <Link href="/admin-dashboard/paciente/registrar-paciente">
                <CardFeature 
                    icon={<FaCalendarCheck className="text-green-500 text-3xl" />} 
                    title="Registrar paciente" 
                    description="Ingresar"  
                />
            </Link>
            <Link href="/admin-dashboard/paciente/actualizar-paciente">
                <CardFeature 
                    icon={<FaRedoAlt className="text-yellow-500 text-3xl" />} 
                    title="Actualizar paciente" 
                    description="Ingresar"         
                />
            </Link>
        </section>
    );
}


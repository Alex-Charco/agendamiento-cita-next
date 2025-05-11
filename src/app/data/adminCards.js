import { FaUserInjured, FaCalendarCheck, FaFileAlt , FaCalendarAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const adminCards = [
    {
        title: "Horarios",
        icon: <FaCalendarCheck className="text-green-500 text-3xl" />,
        description: (
            <>
                <span className="block text-left text-sm mt-2">
                    Podrá consultar, registrar y actualizar los horarios para los turnos.
                </span>
                <br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
            </>
        ),
        href: "/admin-dashboard/horario/consultar-horario",
    },
    {
        title: "Médicos",
        icon: <FaUserDoctor className="text-azul text-3xl" />,
        description: (
            <>
                <span className="block text-left text-sm mt-2">
                    Podrá consultar, registrar y actualizar la información 
                    de los médicos ingresando el número de identificación.
                </span>
                <br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
            </>
        ),
        href: "/admin-dashboard/médico/consultar-medico",
    },
    {
        title: "Pacientes",
        icon: <FaUserInjured className="text-red-500 text-3xl" />,
        description: (
            <>
                <span className="block text-left text-sm mt-2">
                    Podrá consultar, registrar y actualizar la información 
                    de los pacientes ingresando el número de identificación.
                </span>
                <br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
            </>
        ),
        href: "/admin-dashboard/paciente/consultar-paciente",
    },
    {
        title: "Reportes",
        icon: <FaFileAlt className="text-indigo-600 text-3xl" />,
        description: (
            <>
                <span className="block text-left text-sm mt-2">
                    Podrá generar reportes de las citas médicas.
                </span>
                <br />
                <span className="text-blue-500 text-sm block">Ingresar</span>
            </>
        ),
        href: "/admin-dashboard/reporte/generar-reporte",
    },
];

export default adminCards;
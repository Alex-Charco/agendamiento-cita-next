import { FaTimes, FaSignOutAlt } from "react-icons/fa";

/**
 * Devuelve los botones comunes y dinámicos según el dashboard en el pathname.
 * @param {string} pathname - Ruta actual (por ejemplo, "/admin-dashboard/medico/registrar-medico")
 */
export const getCommonButtonsByPath = (pathname = "") => {
    let cancelarHref = "/";

    if (pathname.includes("admin-dashboard")) {
        cancelarHref = "/admin-dashboard";
    } else if (pathname.includes("paciente-dashboard")) {
        cancelarHref = "/paciente-dashboard";
    } else if (pathname.includes("medico-dashboard")) {
        cancelarHref = "/medico-dashboard";
    }

    return [
        { label: "Cancelar", icon: FaTimes, action: "cancelar", href: cancelarHref },
        { label: "Salir", icon: FaSignOutAlt, action: "salir", href: "/auth/login" },
    ];
};

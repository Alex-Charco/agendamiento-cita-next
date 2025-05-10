import { ROUTES } from "@/routes/index.routes";

export function redirectByRole(user, router, setErrorMessage) {
    switch (user.rol.id_rol) {
        case 3: // ADMINISTRADOR
            router.push(ROUTES.ADMIN_DASHBOARD);
            break;
        case 2: // MEDICO
            router.push(ROUTES.MEDICO_DASHBOARD);
            break;
        case 1: // PACIENTE
            router.push(ROUTES.PACIENTE_DASHBOARD);
            break;
        default:
            setErrorMessage("Rol no reconocido.");
    }
}

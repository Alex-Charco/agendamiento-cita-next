import { NextResponse } from "next/server";
import { decodeToken } from "./utils/auth"; // Función para decodificar el token

// Definir las rutas accesibles por cada rol
const rolePermissions = {
    admin: ["/admin-dashboard", "/common/consulta-paciente", "/common/horario", "/common/citas"],
    medico: ["/medico-dashboard", "/common/consulta-paciente", "/common/horario", "/common/citas"],
    paciente: ["/paciente-dashboard", "/common/citas"],
};

// Middleware principal
export function middleware(req) {
    const token = req.cookies.get("token")?.value; // Obtener token de cookies
    const url = req.nextUrl.pathname; // Obtener la ruta actual

    // Si no hay token, redirigir a login
    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Decodificar el token para obtener el rol del usuario
    const { role } = decodeToken(token);

    // Verificar si el rol tiene permiso para acceder a la ruta
    const allowedRoutes = rolePermissions[role] || [];
    const isAuthorized = allowedRoutes.some((route) => url.startsWith(route));

    if (!isAuthorized) {
        return NextResponse.redirect(new URL("/", req.url)); // Redirigir a home si no tiene permiso
    }

    return NextResponse.next(); // Permitir acceso si tiene permisos
}

// Aplicar middleware solo a rutas dentro de "app"
export const config = {
    matcher: ["/admin-dashboard/:path*", "/medico-dashboard/:path*", "/paciente-dashboard/:path*", "/common/:path*"],
};





/*import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { ROUTES } from './routes/index.routes';  // Asegúrate de importar las rutas aquí

export function middleware(req) {
    const token = req.cookies.get('authToken');  // Usar las cookies en lugar de localStorage para Next.js

    // Si no hay token, redirigir al login
    if (!token) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Verificar si el token ha expirado
        if (decodedToken.exp < currentTime) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));  // Redirigir al login si el token expiró
        }

        // Lógica de autorización: verificar permisos según el rol
        const userRole = decodedToken.rol.id_rol;  // Suponiendo que el rol esté en el token

        // Redirigir si el usuario intenta acceder a una ruta que no tiene permisos
        const url = req.url;

        // Verificar roles y acceder a las rutas correspondientes
        if (url.includes(ROUTES.ADMIN_DASHBOARD) && userRole !== 3) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
        }

        if (url.includes(ROUTES.MEDICO_DASHBOARD) && userRole !== 2) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
        }

        if (url.includes(ROUTES.PACIENTE_DASHBOARD) && userRole !== 1) {
            return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));
        }

    } catch (error) {
        console.error("Error en el middleware", error);
        return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url));  // Redirigir al login en caso de error en el decodificado
    }

    return NextResponse.next();  // Permitir que la solicitud continúe si todo está bien
}

// Esto es para especificar qué rutas debe manejar el middleware (solo para rutas protegidas)
export const config = {
    matcher: ['/admin-dashboard', '/medico-dashboard', '/paciente-dashboard'],
};
*/
import { NextResponse } from "next/server";
import { decodeToken } from "./utils/auth";

// Definir las rutas accesibles por cada rol
const rolePermissions = {
    admin: ["/admin-dashboard", "/common/consulta-paciente", "/common/horario", "/common/citas"],
    medico: ["/medico-dashboard", "/common/consulta-paciente", "/common/horario", "/common/citas"],
    paciente: ["/paciente-dashboard", "/common/citas"],
};

// Middleware principal
export function middleware(req) {
    const token = req.cookies.get("authToken")?.value; // Obtener token de cookies
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
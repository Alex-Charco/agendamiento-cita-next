import axios from "axios";

const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor para agregar el token a cada request
authAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores globales como 401
authAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("⚠️ Token expirado o inválido. Redirigiendo al login...");
            localStorage.setItem("expiredSession", "true");
            localStorage.clear();
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default authAxios;

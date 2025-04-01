import axios from "axios";
import Swal from "sweetalert2"; // Importa SweetAlert2

// Crear una instancia de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // URL base de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de respuesta para manejar token expirado (401)
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, la retorna
    return response;
  },
  (error) => {
    // Si el error tiene una respuesta y es un 401 (token expirado)
    if (error.response && error.response.status === 401) {
      // Muestra una notificación antes de redirigir
      Swal.fire({
        title: "Sesión expirada",
        text: "Tu sesión ha expirado. Por favor, inicie sesión nuevamente.",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Cerrar sesión",
		width: '300px',
		height: '200px',
      }).then(() => {
        // Elimina el token del almacenamiento
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login"; // Redirige al login
      });
    }
    return Promise.reject(error); // Rechaza la promesa con el error
  }
);

// Función para realizar solicitudes con el token
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("authToken"); // Obtener el token

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  return api({ ...options, url, headers });
};

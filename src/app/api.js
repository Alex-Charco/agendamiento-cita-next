import axios from "axios";

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
      localStorage.removeItem("authToken"); // Elimina el token del almacenamiento
      window.location.href = "/auth/login"; // Redirige al login
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

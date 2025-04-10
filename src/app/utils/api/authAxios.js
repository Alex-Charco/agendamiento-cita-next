import axios from "axios";

const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

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

export default authAxios;

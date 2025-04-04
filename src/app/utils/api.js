import axios from "axios";

export const fetchFamiliar = async (identificacion, setSelectedFamiliar) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedFamiliar(response.data);
        } else {
            setSelectedFamiliar(null);
        }
    } catch (error) {
        console.error("Error al obtener familiar:", error);
        setSelectedFamiliar(null);
    }
};

export const fetchInfoMilitar = async (identificacion, setSelectedInfoMilitar) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/info-militar/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedInfoMilitar(response.data);
        } else {
            setSelectedInfoMilitar(null);
        }
    } catch (error) {
        console.error("Error al obtener familiar:", error);
        setSelectedInfoMilitar(null);
    }
};

export const fetchResidencia = async (identificacion, setSelectedResidencia) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedResidencia(response.data);
        } else {
            setSelectedResidencia(null);
        }
    } catch (error) {
        console.error("Error al obtener residencia:", error);
        setSelectedResidencia(null);
    }
};

export const fetchSeguro = async (identificacion, setSelectedSeguro) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedSeguro(response.data);
        } else {
            setSelectedSeguro(null);
        }
    } catch (error) {
        console.error("Error al obtener seguro:", error);
        setSelectedSeguro(null);
    }
};
import { useEffect } from "react";

export const useClearLocalStorage = (keys = []) => {
    useEffect(() => {
        // Eliminar al entrar
        keys.forEach((key) => localStorage.removeItem(key));

        // Función para limpiar al salir
        const clearStorage = () => {
            keys.forEach((key) => localStorage.removeItem(key));
        };

        window.addEventListener("beforeunload", clearStorage);
        window.addEventListener("pagehide", clearStorage);

        return () => {
            window.removeEventListener("beforeunload", clearStorage);
            window.removeEventListener("pagehide", clearStorage);
        };
    }, [keys]);
};

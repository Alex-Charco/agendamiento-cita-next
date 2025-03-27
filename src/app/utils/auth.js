import jwtDecode from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
};

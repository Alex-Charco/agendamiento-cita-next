export const capitalize = (text) => {
    if (typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// src/utils/string.js

// Capitaliza cada palabra en una cadena
export const capitalizeCompleto = (s) => {
    return s
        ? s
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "";
};

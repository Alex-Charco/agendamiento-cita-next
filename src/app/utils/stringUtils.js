export const capitalize = (text) => {
    if (typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

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

export const capitalizeNueva = (text) => {
    if (typeof text !== "string") return text;
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};


export const capitalize = (text) => {
    if (typeof text !== "string") return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

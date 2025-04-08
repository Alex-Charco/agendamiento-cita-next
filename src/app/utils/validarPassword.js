export function validarPassword(password) {
    const errors = [];

    if (password.length < 10) {
        errors.push("La contraseña debe tener al menos 10 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Debe incluir al menos una letra mayúscula.");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Debe incluir al menos una letra minúscula.");
    }
    if (!/\d/.test(password)) {
        errors.push("Debe incluir al menos un número.");
    }
    if (!/[@$!%*?&\-+_#^(){}[\]]/.test(password)) {
        errors.push("Debe incluir al menos un carácter especial (@$!%*?&-+_#^(){}[]).");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

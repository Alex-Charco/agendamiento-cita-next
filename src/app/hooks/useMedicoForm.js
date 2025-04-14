import { useEffect, useReducer } from "react";

const initialState = {
    id_especialidad: "",
    nombre_usuario: "",
    identificacion: "",
    fecha_nacimiento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    genero: "",
    reg_msp: "",
    celular: "",
    telefono: "",
    correo: "",
    estatus: 1,
};

const generoOptions = [
    { key: "NINGUNO", label: "Ninguno" },
    { key: "MASCULINO", label: "Masculino" },
    { key: "FEMENINO", label: "Femenino" },
];

const especialidadOptions = [
    { key: "1", label: "Medecina General" },
    { key: "2", label: "Odontología" },
    { key: "3", label: "Psicología" },
    { key: "4", label: "Rehabilitación" },
    { key: "5", label: "Laboratorio" },
];

const estatusOptions = [
    { key: "1", label: "Activo" },
    { key: "0", label: "Inactivo" },
];

function reducer(state, action) {
    return { ...state, [action.name]: action.value };
}

export function useMedicoForm(medicoData = {}) {
    const [medico, dispatch] = useReducer(reducer, {
        ...initialState,
        ...medicoData,
    });

    useEffect(() => {
        const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
        if (nombreUsuarioGuardado) {
            dispatch({ name: "nombre_usuario", value: nombreUsuarioGuardado });
        }
    }, [medicoData.nombre_usuario]);

    const handleChange = (name, value) => {
        dispatch({ name, value });
    };

    return {
        medico,
        handleChange,
        generoOptions,
        especialidadOptions,
        estatusOptions,
    };
}

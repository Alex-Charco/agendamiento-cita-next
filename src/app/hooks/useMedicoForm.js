import { useEffect, useReducer } from "react";
import {
    generoOptions,
    especialidadOptions,
    estatusOptions,
} from "@/components/medicoOptions";

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

function reducer(state, action) {
    return { ...state, [action.name]: action.value };
}

export function useMedicoForm(medicoData = {}) {
    const [medico, dispatch] = useReducer(reducer, {
        ...initialState,
        ...medicoData,
    });

    const handleChange = (name, value) => {
        dispatch({ name, value });
    };

    useEffect(() => {
        const nombreUsuarioGuardado = localStorage.getItem("nombre_usuario");
        if (nombreUsuarioGuardado) {
            handleChange("nombre_usuario", nombreUsuarioGuardado);
        }
    }, [medicoData.nombre_usuario]);

    return {
        medico,
        handleChange,
        generoOptions,
        especialidadOptions,
        estatusOptions,
    };
}

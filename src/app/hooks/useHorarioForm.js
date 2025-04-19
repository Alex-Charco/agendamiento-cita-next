// No se esta usando ahora

import { useEffect, useReducer } from "react";

const initialState = {
    identificacion_paciente_horario: "",
    institucion: "",
    fecha_horario: "",
    hora_inicio: "",
    hora_fin: "",
    consulta_maxima: 0,
    asignado: 0,
    disponible: 0,
    seleccion: null,
    turno_extra: false,
};

function reducer(state, action) {
    return { ...state, [action.name]: action.value };
}

export function useHorarioForm(horarioData = {}) {
    const [horario, dispatch] = useReducer(reducer, {
        ...initialState,
        ...{
            ...horarioData,
            turno_extra: !!horarioData.turno_extra,
        },
    });

    const handleChange = (name, value) => {
        dispatch({ name, value });
    };


    return {
        horario,
        handleChange,
    };
}

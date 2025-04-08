import { useReducer } from "react";

export function useFormReducer(initialState, data = {}) {
    // Reductor para manejar el estado del formulario
    function reducer(state, action) {
        return { ...state, [action.name]: action.value };
    }

    // Estado y dispatch
    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        ...data,
    });

    // Función para manejar cambios de entradas
    const handleChange = (eOrName, maybeValue) => {
        // Si el argumento es un evento de formulario
        if (typeof eOrName === "object" && eOrName.target) {
            const { name, value, type, checked } = eOrName.target;
            dispatch({ name, value: type === "checkbox" ? checked : value });
        } else {
            // Si es un cambio desde un componente personalizado (ej. Select)
            dispatch({ name: eOrName, value: maybeValue });
        }
    };

    return { state, dispatch, handleChange };
}

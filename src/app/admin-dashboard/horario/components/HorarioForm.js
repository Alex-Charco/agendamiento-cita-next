"use client";

import PropTypes from "prop-types";
import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { CustomInput, CustomSelect } from "@/components/form";
import { SectionTitle, SubmitButton } from "@/components/ui";

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

const institucionOptions = [
    { key: "C.S. A FM MAS", label: "C.S. A FM MAS" },
    { key: "HB 17 PASTAZA", label: "HB 17 PASTAZA" },
    { key: "OTRO", label: "OTRO" },
];

const seleccionOptions = [
    { key: null, label: "Sin definir" },
    { key: 1, label: "Seleccionado" },
    { key: 0, label: "No seleccionado" },
];

const turnoExtraOptions = [
    { key: "1", label: "Sí" },
    { key: "0", label: "No" },
];

function reducer(state, action) {
    return { ...state, [action.name]: action.value };
}

const HorarioForm = forwardRef(({ onSubmit, horarioData = {} }, ref) => {
    const [horario, dispatch] = React.useReducer(reducer, {
        ...initialState,
        ...horarioData,
    });

    useImperativeHandle(ref, () => ({
        resetForm: () => {
            dispatch({ name: "identificacion_paciente_horario", value: "" });
            localStorage.removeItem("identificacion");
            for (const key of Object.keys(initialState)) {
                dispatch({ name: key, value: initialState[key] });
            }
        },
    }));

    useEffect(() => {
        const storedId = localStorage.getItem("identificacion");
        if (storedId) {
            dispatch({ name: "identificacion_paciente_horario", value: storedId });
        }
    }, []);

    const handleChange = (name, value) => {
        dispatch({ name, value });
        if (name === "identificacion_paciente_horario") {
            localStorage.setItem("identificacion", value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(horario, horario.identificacion_paciente_horario);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8"
        >
            <SectionTitle text="Datos del Horario" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <CustomInput
                    name="identificacion_paciente_horario"
                    label="Identificación Médico"
                    value={horario.identificacion_paciente_horario}
                    onChange={handleChange}
                    placeholder="Ingrese la identificación"
                    type="text"
                    required
                />
                <CustomSelect
                    name="institucion"
                    label="Institución"
                    value={horario.institucion}
                    onChange={handleChange}
                    items={institucionOptions}
                    placeholder="Seleccione una institución"
                />
                <CustomInput
                    name="fecha_horario"
                    label="Fecha"
                    type="date"
                    value={horario.fecha_horario}
                    onChange={handleChange}
                />
                <CustomInput
                    name="hora_inicio"
                    label="Hora de inicio"
                    type="time"
                    value={horario.hora_inicio}
                    onChange={handleChange}
                />
                <CustomInput
                    name="hora_fin"
                    label="Hora de fin"
                    type="time"
                    value={horario.hora_fin}
                    onChange={handleChange}
                />
                <CustomInput
                    name="consulta_maxima"
                    label="Consultas máximas"
                    type="number"
                    value={horario.consulta_maxima}
                    onChange={handleChange}
                />
                <CustomSelect
                    name="seleccion"
                    label="Seleccionar"
                    value={horario.seleccion}
                    onChange={handleChange}
                    items={seleccionOptions}
                    placeholder="Seleccione una opción"
                    isRequired={false}
                />
                <CustomSelect
                    name="turno_extra"
                    label="¿Turno Extra?"
                    value={horario.turno_extra}
                    onChange={handleChange}
                    items={turnoExtraOptions}
                    transformValue={(val) => (val ? "1" : "0")}
                    parseValue={(val) => val === "1"}
                />
            </div>
            <SubmitButton text="Guardar Horario" />
            </form>
    );
});


// 👇 Esta línea elimina el error
HorarioForm.displayName = "HorarioForm";

// PropTypes
HorarioForm.propTypes = {
    onSubmit: PropTypes.func,
    horarioData: PropTypes.object,
};

export default HorarioForm;

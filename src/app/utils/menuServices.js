const menuServicesAdmin = [
    {
        name: "Cita",
        subMenu: [
            { name: "Consultar Cita", path: "/admin-dashboard/cita/consultar-cita" },
            { name: "Nueva Cita", path: "/admin-dashboard/horario/registrar-horario" },
        ],
    },
    {
        name: "Horario",
        subMenu: [
            { name: "Consultar Horario", path: "/admin-dashboard/horario/consultar-horario" },
            { name: "Nuevo horario", path: "/admin-dashboard/horario/registrar-horario" },
        ],
    },
    {
        name: "Médico",
        subMenu: [
            { name: "Actualizar Médico", path: "/admin-dashboard/medico/actualizar-medico" },
            { name: "Consultar Médico", path: "/admin-dashboard/medico/consultar-medico" },
            { name: "Nuevo Médico", path: "/admin-dashboard/medico/registrar-medico" },
        ],
    },
    {
        name: "Paciente",
        subMenu: [
            { name: "Actualizar Paciente", path: "/admin-dashboard/paciente/actualizar-paciente" },
            { name: "Consultar Paciente", path: "/admin-dashboard/paciente/consultar-paciente" },
            { name: "Nuevo Paciente", path: "/admin-dashboard/paciente/registrar-paciente" },
        ],
    },
];

export default menuServicesAdmin;

const menuServicesAdmin = [
    {
        name: "Cita",
        subMenu: [
            { name: "Buscar Cita", path: "/admin-dashboard/cita/consultar-cita" },
        ],
    },
    {
        name: "Horario",
        subMenu: [
            { name: "Buscar Horario", path: "/admin-dashboard/horario/consultar-horario" },
            { name: "Nuevo horario", path: "/admin-dashboard/horario/registrar-horario" },
        ],
    },
    {
        name: "Médico",
        subMenu: [
            { name: "Actualizar Médico", path: "/admin-dashboard/medico/actualizar-medico" },
            { name: "Buscar Médico", path: "/admin-dashboard/medico/consultar-medico" },
            { name: "Nuevo Médico", path: "/admin-dashboard/medico/registrar-medico" },
			{ name: "Historial Médico", path: "/admin-dashboard/medico/historial-medico" },
        ],
    },
    {
        name: "Paciente",
        subMenu: [
            { name: "Actualizar Paciente", path: "/admin-dashboard/paciente/actualizar-paciente" },
            { name: "Buscar Paciente", path: "/admin-dashboard/paciente/consultar-paciente" },
            { name: "Nuevo Paciente", path: "/admin-dashboard/paciente/registrar-paciente" },
			{ name: "Historial Paciente", path: "/admin-dashboard/paciente/historial-paciente" },
        ],
    },
];

export default menuServicesAdmin;

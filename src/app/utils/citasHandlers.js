export function handleReagendarCita({ cita, data, setCitaSeleccionada, setAccionActual, setModalOpen }) {
  const idPaciente = data?.paciente?.id_paciente || null;

  // Construir nombre considerando ambos escenarios
  const nombrePaciente =
    data?.paciente?.nombre ||
    [
      data?.paciente?.primer_nombre,
      data?.paciente?.segundo_nombre,
      data?.paciente?.primer_apellido,
      data?.paciente?.segundo_apellido
    ].filter(Boolean).join(" ");

  if (idPaciente) {
    sessionStorage.setItem("id_paciente_reagendar", idPaciente);
    sessionStorage.setItem("nombre_paciente_reagendar", nombrePaciente);
  }

  console.log("Reagendar cita", cita);

  setCitaSeleccionada({
    id_cita: cita.id_cita,
    estadoPorDefecto: "REAGENDADA",
  });

  setAccionActual("reagendar");
  setModalOpen(true);
}

/*import { useState, useEffect } from "react";

const AppointmentForm = () => {
    const [fecha, setFecha] = useState("");
    const [medicos, setMedicos] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState("");
    const [turnoSeleccionado, setTurnoSeleccionado] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/turno/get")
            .then((response) => response.json())
            .then((data) => setTurnos(data.filter(turno => turno.estado === "DISPONIBLE")))
            .catch((error) => console.error("Error al obtener turnos:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/medico/get/1723456444")
            .then((response) => response.json())
            .then((data) => setMedicos([data.medicos]))
            .catch((error) => console.error("Error al obtener médicos:", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!turnoSeleccionado) {
            alert("Seleccione un turno disponible");
            return;
        }

        const idPaciente = 10;

        fetch("http://localhost:5000/api/cita/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_turno: turnoSeleccionado,
                id_paciente: idPaciente,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Cita registrada con éxito");
                console.log("Cita registrada:", data);
            })
            .catch((error) => console.error("Error al registrar cita:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

            <label>Medico:</label>
            <select value={medicoSeleccionado} onChange={(e) => setMedicoSeleccionado(e.target.value)} required>
                <option value="">Seleccione un médico</option>
                {medicos.map((medico) => (
                    <option key={medico.id_medico} value={medico.id_medico}>
                        {`${medico.primer_nombre} ${medico.primer_apellido} - ${medico.especialidad.nombre}`}
                    </option>
                ))}
            </select>

            <label>Turno:</label>
            <select value={turnoSeleccionado} onChange={(e) => setTurnoSeleccionado(e.target.value)} required>
                <option value="">Seleccione un turno</option>
                {turnos.map((turno) => (
                    <option key={turno.id_turno} value={turno.id_turno}>
                        {`${turno.fecha} - ${turno.hora} (${turno.medico.medico})`}
                    </option>
                ))}
            </select>

            <button type="submit">Registrar Cita</button>
        </form>
    );
};

export default AppointmentForm;
*/
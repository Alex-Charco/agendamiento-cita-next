"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, Button, Input, Select, SelectItem } from "@heroui/react";

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    id_paciente: "",    // id del paciente
    id_medico: "",      // id del médico seleccionado
    id_turno: "",       // id del turno seleccionado
    estado_cita: "PENDIENTE", // Estado inicial de la cita
    fecha_creacion: new Date(), // Fecha de creación de la cita
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      console.log("Usuario y token encontrados:", storedUser, token);

      // Verifica si 'identificacion' existe en el objeto 'user'
      if (storedUser.identificacion) {
        // Obtener los datos del paciente usando la identificacion
        axios
          .get(`http://localhost:5000/api/paciente/get/${storedUser.identificacion}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Datos del paciente recibidos:", response.data);
            setPatientData(response.data);
            setAppointmentDetails((prev) => ({
              ...prev,
              id_paciente: response.data.id_paciente, // Asignar id del paciente
            }));
          })
          .catch((error) => {
            console.error("Error al obtener los datos del paciente:", error);
            setError("Error al obtener los datos del paciente.");
          });

        // Obtener las especialidades
        axios
          .get("http://localhost:5000/specialty", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Especialidades recibidas:", response.data);
            setSpecialties(response.data);
          })
          .catch((error) => {
            console.error("Error al obtener las especialidades:", error);
            setError("Error al obtener las especialidades.");
          });
      } else {
        setError("No se encontró la identificacion del usuario.");
        console.log("No se encontró la identificacion del usuario.");
      }
    } else {
      setError("No se encontró información del usuario o token.");
      console.log("No se encontró información del usuario o token.");
    }
  }, []);

  const handleSpecialtyChange = (specialtyId) => {
    setAppointmentDetails((prev) => ({
      ...prev,
      id_especialidad: specialtyId, // Asignar id de especialidad
    }));

    // Obtener los médicos para la especialidad seleccionada
    axios
      .get(`http://localhost:5000/doctors?specialtyId=${specialtyId}`)
      .then((response) => {
        console.log("Doctores recibidos:", response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los doctores:", error);
        setError("Error al obtener los doctores.");
      });
  };

  const handleAppointmentSubmission = () => {
    // Lógica para enviar los datos de la cita al servidor
    axios
      .post("http://localhost:5000/cita", appointmentDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      })
      .then((response) => {
        console.log("Cita agendada:", response.data);
        alert("Cita agendada exitosamente.");
      })
      .catch((error) => {
        console.error("Error al agendar la cita:", error);
        setError("Error al agendar la cita.");
      });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!patientData) {
    return <div>Cargando datos del paciente...</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <h1>Dashboard del Paciente</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {/* Mostrar nombre del paciente */}
            {patientData ? (
              <div>
                <h2 className="text-lg font-bold">Paciente:</h2>
                <p>{`${patientData.primer_nombre} ${patientData.primer_apellido}`}</p>
              </div>
            ) : (
              <div>Cargando datos del paciente...</div>
            )}

            {/* Selección de especialidad */}
            <Select
              label="Selecciona una especialidad"
              onChange={(e) => handleSpecialtyChange(e.target.value)}
            >
              {specialties.map((specialty) => (
                <SelectItem key={specialty.id_especialidad} value={specialty.id_especialidad}>
                  {specialty.nombre}
                </SelectItem>
              ))}
            </Select>

            {/* Selección de doctor */}
            <Select
              label="Selecciona un doctor"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  id_medico: e.target.value,
                }))
              }
              isDisabled={!appointmentDetails.id_especialidad}
            >
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id_medico} value={doctor.id_medico}>
                  {`${doctor.primer_nombre} ${doctor.primer_apellido}`}
                </SelectItem>
              ))}
            </Select>

            {/* Fecha y hora del turno */}
            <Input
              label="Fecha"
              type="date"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  id_turno: e.target.value, // Este campo debe referirse a un turno real, se necesita más detalle
                }))
              }
            />
            <Input
              label="Hora"
              type="time"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  hora_turno: e.target.value, // Necesitarás un manejo adecuado de horas disponibles
                }))
              }
            />

            {/* Botón para agendar cita */}
            <Button onClick={handleAppointmentSubmission}>Agendar Cita</Button>

            {/* Mostrar error si lo hay */}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

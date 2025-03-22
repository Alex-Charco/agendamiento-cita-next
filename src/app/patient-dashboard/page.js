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
    specialtyId: "",
    doctorId: "",
    typeAttention: "",
    office: "",
    turnDate: "",
    turnTime: "",
  });

  useEffect(() => {
    // Recuperamos el usuario desde localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    // Verificamos que el usuario y el token existan
    if (storedUser?.ID_CARD && token) {
      console.log("Usuario y token encontrados:", storedUser, token);

      // Hacemos la solicitud GET para obtener los datos del paciente
      axios
        .get(`http://localhost:5000/patients/patient/${storedUser.ID_CARD}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Datos del paciente recibidos:", response.data);
          setPatientData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del paciente:", error);
          setError("Error al obtener los datos del paciente.");
        });

      // Hacemos la solicitud GET para obtener las especialidades
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
      setError("No se encontró información del usuario.");
      console.log("No se encontró información del usuario o token.");
    }
  }, []);

  const handleSpecialtyChange = (specialtyId) => {
    setAppointmentDetails((prev) => ({
      ...prev,
      specialtyId,
    }));

    // Obtener los doctores para la especialidad seleccionada
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
    // Aquí iría la lógica para enviar los datos de la cita al servidor
    console.log("Cita agendada:", appointmentDetails);
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
                <p>{patientData.PATIENT_NAME}</p>
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
                <SelectItem key={specialty.SPECIALTY_ID} value={specialty.SPECIALTY_ID}>
                  {specialty.SPECIALTY_NAME}
                </SelectItem>
              ))}
            </Select>

            {/* Selección de doctor */}
            <Select
              label="Selecciona un doctor"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  doctorId: e.target.value,
                }))
              }
              isDisabled={!appointmentDetails.specialtyId}
            >
              {doctors.map((doctor) => (
                <SelectItem key={doctor.DOCTOR_ID} value={doctor.DOCTOR_ID}>
                  {doctor.DOCTOR_NAME}
                </SelectItem>
              ))}
            </Select>

            {/* Tipo de atención */}
            <Input
              label="Tipo de Atención"
              placeholder="Ejemplo: Urgencia"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  typeAttention: e.target.value,
                }))
              }
            />

            {/* Oficina */}
            <Input
              label="Oficina"
              placeholder="Ejemplo: A1"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  office: e.target.value,
                }))
              }
            />

            {/* Fecha y hora */}
            <Input
              label="Fecha"
              type="date"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  turnDate: e.target.value,
                }))
              }
            />
            <Input
              label="Hora"
              type="time"
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  turnTime: e.target.value,
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

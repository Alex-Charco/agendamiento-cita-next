import axios from "axios";
import { mostrarToastExito, mostrarToastError, manejarSesionExpirada } from "@/utils/toast";

//   ***PACIENTE***
// *Código para buscar*
export const fetchFamiliar = async (identificacion, setSelectedFamiliar) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedFamiliar(response.data);
        } else {
            setSelectedFamiliar(null);
        }
    } catch (error) {
        console.error("Error al obtener familiar:", error);
        setSelectedFamiliar(null);
    }
};

export const fetchInfoMilitar = async (identificacion, setSelectedInfoMilitar) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/info-militar/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedInfoMilitar(response.data);
        } else {
            setSelectedInfoMilitar("");
        }
    } catch (error) {
        console.error("Error al obtener Inoformación militar:", error);
        setSelectedInfoMilitar("");
    }
};

export const fetchResidencia = async (identificacion, setSelectedResidencia) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedResidencia(response.data);
        } else {
            setSelectedResidencia(null);
        }
    } catch (error) {
        console.error("Error al obtener residencia:", error);
        setSelectedResidencia(null);
    }
};

export const fetchSeguro = async (identificacion, setSelectedSeguro) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró un token de autenticación.");

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seguro/get/${identificacion}`;
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
            setSelectedSeguro(response.data);
        } else {
            setSelectedSeguro(null);
        }
    } catch (error) {
        console.error("Error al obtener seguro:", error);
        setSelectedSeguro(null);
    }
};

// *Código para registrar*

export const RegistrarPaciente = async (data, setMensaje, setSuccess) => {
  try {
    const token = localStorage.getItem("authToken");

   if (!token) {
      manejarSesionExpirada(setMensaje);
      return;
    }

    localStorage.setItem("identificacion", data.identificacion);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/registrar`;

    const response = await axios.post(apiUrl, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    mostrarToastExito("¡Paciente registrado exitosamente!");
	setMensaje("");
  } catch (error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) {
      // Token expirado o inválido
      manejarSesionExpirada(setMensaje);
    } else {
      const mensajeError = serverMessage || error.message || "Error desconocido";
      console.error("Error al registrar paciente:", error);
      setMensaje(`Error: ${mensajeError}`);
      mostrarToastError(`Error al registrar paciente: ${mensajeError}`);
    }

    setSuccess(false);
  }
};
// Registrar familiar
export const RegistrarFamiliar = async (data, setMensaje, setSuccess) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = data.identificacion_paciente;

        if (!token) {
		  manejarSesionExpirada(setMensaje);
		  return;
		}

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            mostrarToastError("Identificación del paciente faltante. Redirigiendo...");
            setTimeout(() => {
                window.location.href = "/auth/login";
            }, 2000);
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/registrar/${pacienteId}`;
        const { identificacion_paciente, ...dataSinIdentificacionPaciente } = data;

        await axios.post(apiUrl, JSON.stringify(dataSinIdentificacionPaciente), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        mostrarToastExito("¡Familiar registrado exitosamente!");
		setMensaje("");
    } catch (error) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            console.error("❌ Error al registrar familiar:", mensajeError);
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(`Error al registrar familiar: ${mensajeError}`);
        }

        setSuccess(false);
    }
};

// Registrar información militar
export const RegistrarInfoMilitar = async (data, setMensaje, setSuccess) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
		  manejarSesionExpirada(setMensaje);
		  return;
		}

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/info-militar/registrar`;

        await axios.post(apiUrl, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        mostrarToastExito("¡Información militar registrada exitosamente!");
		setMensaje("");
    } catch (error) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
             manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            console.error("❌ Error al registrar información militar:", mensajeError);
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(`Error al registrar información militar: ${mensajeError}`);
        }

        setSuccess(false);
    }
};

// *Código para actualizar*

export const ActualizarFamiliar = async (data, setMensaje, setSuccess) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← identificación desde el localStorage

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/familiar/put/${pacienteId}`;

        await axios.put(apiUrl, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        setSuccess(true); // Marca éxito para mostrar alerta en componente
    } catch (error) {
        console.error("❌ Error al actualizar familiar:", error.response?.data || error.message);
        
		const status = error.response?.status;
        const serverMessage = error.response?.data?.message;
		
		if (status === 401) {
            manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(error);
        }
	}
};

export const ActualizarInfoMilitar = async (data, setMensaje, setSuccess) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← identificación desde el localStorage

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/info-militar/put/${pacienteId}`;

        await axios.put(apiUrl, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        setSuccess(true); // Marca éxito para mostrar alerta en componente
    } catch (error) {
        console.error("❌ Error al actualizar información militar:", error.response?.data || error.message);
        
		const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(error);
        }
    }
};

export const ActualizarResidencia = async (data, setMensaje, setSuccess) => {
    try {
        const token = localStorage.getItem("authToken");
        const pacienteId = localStorage.getItem("identificacion"); // ← identificación desde el localStorage

        if (!token) {
            setMensaje("No se encontró el token de autenticación.");
            return;
        }

        if (!pacienteId) {
            setMensaje("No se encontró la identificación del paciente. Por favor, vuelve a iniciar sesión.");
            return;
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/residencia/put/${pacienteId}`;

        await axios.put(apiUrl, JSON.stringify(data), {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        setSuccess(true); // Marca éxito para mostrar alerta en componente
    } catch (error) {
        console.error("❌ Error al actualizar residencia:", error.response?.data || error.message);
        
		const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(error);
        }
    }
};

// *Consultar historial de cambios de paciente
export const fetchHistorialPaciente = async (identificacion, setHistorialMedico) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No se encontró un token de autenticación.");

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/paciente/get/historial/${identificacion}`;
	console.log("URL que se está consultando:", apiUrl);
    const response = await axios.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      setHistorialMedico(response.data);
    } else {
      setHistorialMedico([]);
    }
  } catch (error) {
    console.error("Error al obtener historial médico:", error);
    
	const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            manejarSesionExpirada(setMensaje);
        } else {
            const mensajeError = serverMessage || error.message || "Error desconocido";
            setMensaje(`Error: ${mensajeError}`);
            mostrarToastError(error);
        }
  }
};

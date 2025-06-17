import Swal from "sweetalert2";
import "@/globals.css";

export const confirmarRegistro = async (mensaje = "¿Deseas guardar los datos?") => {
  const result = await Swal.fire({
    title: mensaje,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, guardar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });

  return result.isConfirmed;
};

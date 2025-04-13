import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const useSuccessAlert = (success, setSuccess, message = "¡Registro exitoso!") => {
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: message,
        icon: "success",
        draggable: true,
        confirmButtonText: "OK",
      });
      setSuccess(false);
    }
  }, [success, setSuccess, message]);
};

export default useSuccessAlert;

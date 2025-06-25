import { limitsNotaEvolutiva as limits } from "./notaEvolutivaLimits";

export function validarCampoSimple(campo, valor, obligatorio = false) {
  if (obligatorio && !valor?.trim()) {
    return "Campo obligatorio";
  }
  if (valor?.trim()) {
    if (valor.length < 3) {
      return "Debe tener mínimo 3 caracteres";
    }
    if (valor.length > limits[campo]) {
      return `Máximo ${limits[campo]} caracteres permitidos`;
    }
  }
  return null;
}

export function validarNotaEvolutiva(formNota) {
  const errores = {};

  // Campos principales
  const camposObligatorios = ["motivo_consulta"];
  const camposOpcionales = ["enfermedad", "tratamiento", "resultado_examen", "decision_consulta", "reporte_decision"];

  camposObligatorios.forEach(field => {
    const error = validarCampoSimple(field, formNota[field], true);
    if (error) errores[field] = error;
  });

  camposOpcionales.forEach(field => {
    const error = validarCampoSimple(field, formNota[field], false);
    if (error) errores[field] = error;
  });

  // Diagnósticos
  formNota.diagnosticos.forEach((diag, i) => {
    ["condicion", "tipo", "cie_10", "descripcion"].forEach(field => {
      const fieldMap = {
        descripcion: "descripcion_diag"
      };
      const limitKey = fieldMap[field] || field;
      const error = validarCampoSimple(limitKey, diag[field], true);
      if (error) errores[`diagnosticos.${i}.${field}`] = error;
    });

    diag.procedimientos.forEach((proc, j) => {
      ["codigo", "descripcion_proc"].forEach(field => {
        const limitKey = field;
        const error = validarCampoSimple(limitKey, proc[field], true);
        if (error) errores[`diagnosticos.${i}.procedimientos.${j}.${field}`] = error;
      });
    });
  });

  // Links
  formNota.links.forEach((link, i) => {
    const urlError = validarCampoSimple("url", link.url, false);
    if (urlError) errores[`links.${i}.url`] = urlError;

    const nombreError = validarCampoSimple("nombre_documento", link.nombre_documento, true);
    if (nombreError) errores[`links.${i}.nombre_documento`] = nombreError;

    const descError = validarCampoSimple("descripcion_link", link.descripcion, false);
    if (descError) errores[`links.${i}.descripcion`] = descError;
  });

  return errores;
}

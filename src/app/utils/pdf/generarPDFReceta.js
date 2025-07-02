import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarPDFReceta(recetaPdf) {
  if (!recetaPdf) return;

  const doc = new jsPDF();
  const { paciente, medico, autorizado, fecha_prescripcion, fecha_vigencia, medicamentos } = recetaPdf;

  // === ENCABEZADO ===
  doc.setFontSize(16);
  doc.text("Hospital de Brigada de Selva No.17 “Pastaza”", 105, 20, null, null, "center");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 138);
  doc.text(`SERVICIO DE ${medico?.especialidad?.atencion || "-"}`, 105, 30, null, null, "center");

  doc.setTextColor(0, 0, 0); // Restaurar color negro

  const tableMarginLeft = 20;
  const tableWidth = 170;
  const fechaVigenciaX = tableMarginLeft + tableWidth - 75;

  doc.setFontSize(11);
  doc.text(`Fecha de Prescripción: ${fecha_prescripcion}`, tableMarginLeft, 42);
  doc.text(`Vigencia hasta: ${fecha_vigencia}`, tableMarginLeft, 50);
  doc.text("VIGENCIA DE LA RECETA: 3 DÍAS", fechaVigenciaX, 50);

  let y = 52;

  // === DATOS DEL PACIENTE ===
  autoTable(doc, {
    startY: y,
    margin: { left: tableMarginLeft },
    styles: { fontSize: 10, cellPadding: 1, lineWidth: 0.1 },
    theme: "grid",
    head: [[
      { content: "DATOS DEL PACIENTE", colSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: 0 } }
    ]],
    body: [
      [`NOMBRES: ${paciente.nombre}`, `HC No.: ${paciente.identificacion}`],
      [`CÉDULA: ${paciente.identificacion}`, `EDAD: ${paciente.edad} años`],
      [`PERSONA AUTORIZADA: ${autorizado.nombre}`, `CÉDULA: ${autorizado.identificacion}`],
    ],
    columnStyles: {
      0: { cellWidth: 110 },
      1: { cellWidth: 60 }
    }
  });

  y = doc.lastAutoTable.finalY + 1;

  // === DATOS DEL MÉDICO ===
  autoTable(doc, {
    startY: y,
    margin: { left: tableMarginLeft },
    styles: { fontSize: 10, cellPadding: 1, lineWidth: 0.1 },
    theme: "grid",
    head: [[
      { content: "DATOS DEL MÉDICO", colSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: 0 } }
    ]],
    body: [
      [{ content: `NOMBRES: ${medico.nombre}`, colSpan: 2 }],
      [{ content: `ESPECIALIDAD: ${medico.especialidad?.nombre || "-"}`, colSpan: 2 }],
      [`CONTACTO: ${medico.celular}`, `CORREO: ${medico.correo}`],
    ],
    columnStyles: {
      0: { cellWidth: 110 },
      1: { cellWidth: 60 }
    }
  });

  y = doc.lastAutoTable.finalY + 1;

  // === MEDICAMENTOS ===
  autoTable(doc, {
    startY: y,
    margin: { left: tableMarginLeft },
    styles: { fontSize: 10, cellPadding: 1, lineWidth: 0.1 },
    theme: "grid",
    head: [[
      { content: "PRODUCTOS QUE DEBEN SER COMPRADOS", colSpan: 3, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: 0 } }
    ],
    ["ORD", "MEDICAMENTO", "CANTIDAD"]],
    body: medicamentos.flatMap((m, i) => [
      [m.orden || i + 1, m.medicamento, m.cantidad],
      [
        { content: `Vía administración: ${m.via_administracion}`, colSpan: 1 },
        { content: `Vía: ${m.via_administracion}`, colSpan: 1 },
        { content: `Dosis: ${m.calcular || m.indicacion || "-"}`, colSpan: 1 }
      ],
      [{ content: `Indicaciones: ${m.indicacion || "-"}`, colSpan: 3 }],
      [{ content: `Signos de Alarma: ${m.signo_alarma || "-"}`, colSpan: 3 }],
      [{ content: `Indicaciones No Farmacológicas: ${m.indicacion_no_farmacologica || "-"}`, colSpan: 3 }],
      [{ content: `Recomendaciones No Farmacológicas: ${m.recomendacion_no_farmacologica || "-"}`, colSpan: 3 }],
      [{ content: "", colSpan: 3 }]
    ]),
    columnStyles: {
      0: { cellWidth: tableWidth / 3 },
      1: { cellWidth: tableWidth / 3 },
      2: { cellWidth: tableWidth / 3 },
    }
  });

  doc.save(`Receta_${paciente.nombre.replace(/ /g, "_")}.pdf`);
}

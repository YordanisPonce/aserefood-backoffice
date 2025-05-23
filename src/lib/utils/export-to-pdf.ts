import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * @description
 * Crea un PDF en formato A4 a partir de un solo elemento HTML.
 * @param {string} elementId - ID del elemento HTML que se desea incluir en el PDF.
 * @param {string} filename - Nombre del archivo PDF a generar.
 * @throws {Error} Si el elemento no se encuentra en el DOM.
 * @throws {Error} Si la imagen generada es muy pequeña o está corrupta.
 * @returns {Promise<void>}
 */
export async function exportToPdf(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("El elemento HTML no se encuentra en el DOM.");
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    if (!imgData || imgData.length < 1000) {
      throw new Error("La imagen generada es muy pequeña o está corrupta.");
    }

    // Crear el PDF en formato A4
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 290], // A4 size in mm
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    // Renderizar la imagen en el PDF, manejando múltiples páginas si es necesario
    while (position < imgHeight) {
      if (position > 0) pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        -position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      position += pageHeight;
    }

    // Guardar el PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    // Loguea el error para depuración
    console.error("Error al exportar el PDF:", error);
    // Lanza el error para que el llamador pueda enterarse
    throw error;
  }
}

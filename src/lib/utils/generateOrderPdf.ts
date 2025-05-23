import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { OrderDetails } from "../types/order";
import { ContactInfoDetails } from "../types/contactInfo";
pdfMake.vfs = pdfFonts.vfs;

// Utilidad para obtener el nombre del método de pago
function paymentMethodToString(selection: number) {
  switch (selection) {
    case 1:
      return "Pago en Línea";
    case 2:
      return "Transferencia";
    default:
      return "Desconocido";
  }
}

// Utilidad para cargar imágenes y convertirlas a base64 (async)
async function getImageBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Generador de PDF
export async function generateOrderPdf(
  order: OrderDetails,
  contactInfo: ContactInfoDetails
) {
  // Prepara las imágenes en base64 para cada producto
  const images: (string | null)[] = await Promise.all(
    order.orderItems.map(async (item) => {
      let imageUrl = null;
      if (item.product && item.product.image) imageUrl = item.product.image;
      if (item.productCombo && item.productCombo.image)
        imageUrl = item.productCombo.image;
      return imageUrl ? await getImageBase64(imageUrl) : null;
    })
  );

  // Arma la tabla de productos
  const productTable = [
    [
      { text: "Producto", style: "tableHeader" },
      { text: "Imagen", style: "tableHeader" },
      { text: "Precio", style: "tableHeader" },
      { text: "Cant.", style: "tableHeader" },
      { text: "Subtotal", style: "tableHeader" },
    ],
    ...order.orderItems.map((item, idx) => [
      item.product?.name || item.productCombo?.name || "Sin nombre",
      images[idx]
        ? { image: images[idx], width: 50, height: 50 }
        : "Sin imagen",
      `$${item.price.toFixed(2)}`,
      item.amount,
      `$${(item.price * item.amount).toFixed(2)}`,
    ]),
  ];

  // Documento PDFMake
  // Formatea la fecha a dd/MM/yyyy
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const docDefinition: import("pdfmake/interfaces").TDocumentDefinitions = {
    content: [
      { text: `Pedido #${order.code}`, style: "header" },
      { text: `Fecha: ${formatDate(order.createdDate)}`, style: "subheader" },
      { text: "Municipio: " + order.municipalityName, margin: [0, 0, 0, 8] },

      { text: "Datos del Cliente/Contacto", style: "sectionHeader" },

      {
        text: `Nombre: ${contactInfo.name || ""}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Teléfono: ${contactInfo.phoneNumber || ""}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Dirección: ${contactInfo.address || ""}`,
        margin: [0, 0, 0, 10],
      },
      {
        text: `Observaciones: ${
          contactInfo.observations || "No hay observaciones"
        }`,
        margin: [0, 0, 0, 10],
      },

      { text: "Productos", style: "sectionHeader" },
      {
        table: { widths: ["*", 60, 60, 40, 60], body: productTable },
        layout: "lightHorizontalLines",
      },

      { text: "\n" },

      {
        columns: [
          { text: "Método de pago: ", width: "auto" },
          { text: paymentMethodToString(order.paymentSelection), bold: true },
        ],
        margin: [0, 10, 0, 0],
      },
      {
        columns: [
          { text: "Total a pagar: ", width: "auto" },
          { text: `$${order.totalAmount.toFixed(2)}`, bold: true },
        ],
      },
    ],
    styles: {
      header: { fontSize: 20, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 12, margin: [0, 0, 0, 5] },
      sectionHeader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      tableHeader: { bold: true, fillColor: "#eeeeee" },
    },
  };

  pdfMake.createPdf(docDefinition).download(`pedido_${order.code}.pdf`);
}

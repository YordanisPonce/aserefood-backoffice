"use server";


export async function getFile(fileUrl: string, fileName: string) {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`Error al descargar la imagen: ${response.statusText}`);
  }

  const blob = await response.blob();

  const file = new File([blob], fileName, {
    type: blob.type,
  });

  return file;
}



export async function fileToBase64(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type; // Obtiene el tipo MIME del archivo
    const base64Data = buffer.toString('base64');
    return `data:${mimeType};base64,${base64Data}`;
  }
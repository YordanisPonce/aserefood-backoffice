export const fileMaxSizeMB = 2;

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
export function base64ToFile(base64: string, fileName: string): File {
  const mimeTypeMatch = base64.match(/^data:(.*?);base64,/);
  if (!mimeTypeMatch) {
    throw new Error("Formato de base64 inválido");
  }
  const mimeType = mimeTypeMatch[1];
  const extension = mimeType.split("/")[1];
  const base64Data = base64.split(",")[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], `${fileName}.${extension}`, { type: mimeType });
}

export async function createFileFromUrl(
  imageUrl: string,
  fileName: string
): Promise<File> {
  try {
    // Descarga la imagen desde la URL
    const response = await fetch(
      imageUrl
    );

    if (!response.ok) {
      throw new Error(`Error al descargar la imagen: ${response.statusText}`);
    }

    // Convierte la respuesta a un Blob
    const blob = await response.blob();

    // Crea un objeto File a partir del Blob
    const file = new File([blob], fileName, {
      type: blob.type,
    });

    return file;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export interface SerializableFile {
  name: string;
  type: string;
  buffer: number[];
}

export async function createSerializeFile(
  file: File
): Promise<SerializableFile> {
  const arrayBuffer = await file.arrayBuffer();
  return {
    name: file.name,
    type: file.type,
    buffer: Array.from(new Uint8Array(arrayBuffer)), // Convertir a array JSON serializable,
  };
}

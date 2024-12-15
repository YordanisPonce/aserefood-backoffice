import imageCompression from "browser-image-compression";

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

export async function compressImage(
  file: File,
  maxSizeMB: number,
  maxWidthOrHeight: number,
  useWebWorker: boolean = true
): Promise<File> {
  const options = {
    maxSizeMB: maxSizeMB,
    maxWidthOrHeight: maxWidthOrHeight,
    useWebWorker: useWebWorker,
  };

  try {
    const compressedBlob = await imageCompression(file, options);

    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type,
    });

    return compressedFile;
  } catch (error) {
    console.error("Error al comprimir la imagen:", error);
    throw error;
  }
}

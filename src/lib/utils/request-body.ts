"use server";
export async function createFormDataBody(data: object): Promise<FormData> {
  const formData = new FormData();

  Object.entries(data || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" || key === "qr") {
        const arrayBuffer = new Uint8Array(value.buffer).buffer;
        const blob = new Blob([arrayBuffer], { type: value.type });
        formData.append(key, blob, value.name);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          if (typeof value[0] === "object")
            value.forEach((element) => {
              formData.append(key, JSON.stringify(element));
            });
          else formData.append(key, value.join(","));
        }
      } else formData.append(key, value);
    }
  });
  return formData;
}

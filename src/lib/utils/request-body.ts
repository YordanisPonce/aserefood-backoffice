"use server";

import { base64ToFile } from "./fileTransformers";

export async function createFormDataBody(data: object): Promise<FormData> {
  const formData = new FormData();

  Object.entries(data || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" || key === "qr") {
        formData.append(key, base64ToFile(value, "image"));
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

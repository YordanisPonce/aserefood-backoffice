import { SerializableFile } from "../utils/fileTransformers";

export interface ZelleConf {
  phoneNumber: string;
  qr: string;
}

export interface UpdateZelleConf {
  phoneNumber: string;
  qr: File | null;
}

export interface UpdateZelleConfDTO {
  phoneNumber: string;
  qr: SerializableFile | null
}

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
  qr: string | null
}

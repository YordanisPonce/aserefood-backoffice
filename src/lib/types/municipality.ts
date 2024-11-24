export interface Municipality {
  id: number;
  name: string;
  provinceId: number;
  provinceName: string;
}

export interface CreateMunicipalityDTO {
  name: string,
  provinceId: number
}

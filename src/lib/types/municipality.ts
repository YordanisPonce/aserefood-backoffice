export interface Municipality {
  id: number;
  name: string;
  provinceId: number;
  provinceName: string;
}

export interface CreateMunicipality {
  name: string;
  province: {
    id: number;
    name: string;
  };
}
export interface CreateMunicipalityDTO {
  name: string;
  provinceId: number;
}

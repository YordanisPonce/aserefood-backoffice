export interface Zone {
  id: number;
  name: string;
  description: string;
}

export interface CreateZoneDTO {
  name: string,
  description: string,
  municipalityIds: number[]
}

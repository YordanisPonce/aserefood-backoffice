export interface Zone {
  id: number;
  name: string;
  description: string;
}

export interface ZoneDetails {
  id: number;
  name: string;
  description: string;
  municipalities: {
    id: number;
    name: string;
  }[];
}

export interface CreateZone {
  name: string;
  description: string;
  municipalities: {
    id: number;
    name: string;
  }[];
}

export interface CreateZoneDTO {
  name: string;
  description: string;
  municipalityIds: number[];
}

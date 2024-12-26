export interface ContactInfo {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  observations: string;
  identificationNumber: string;
  municipality: {
    id: number;
    name: string;
  };
}

export interface ContactInfoDetails {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  observations: string;
  identificationNumber: string;
  municipality: {
    id: number;
    name: string;
  };
  userId: number;
}

// Filters
export interface ContactInfoFilters {
  search?: string;
  municipalityId?: number;
}

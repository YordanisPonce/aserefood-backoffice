export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type SearchParams = {
  sort?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  currentModal?: string;
  isFlat?: string;
  municipalityId?: string
};

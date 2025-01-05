import { SearchParams } from "./pagination";

export interface Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parentName: string;
  children: Category[];
}

export interface CategoryDetails {
  id: number;
  name: string;
  description: string;
  parentId: number;
  parentName: string;
  children: CategoryDetails[];
}

export interface CreateCategory {
  name: string;
  description: string;
  parent: {
    id: number;
    name: string;
  } | null;
}

export interface CreateSubCategory {
  name: string;
  description: string;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
  parentId: number | null;
}

// filters

export interface CategoriesFilters extends SearchParams {
  parentId?: number;
  isFlat?: boolean;
}

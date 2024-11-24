export interface Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
  children: string;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
  parentId: number;
}

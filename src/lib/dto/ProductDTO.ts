import { ProviderDTO } from "./ProviderDTO";

export class ProductDTO {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryName: string;
  isService: boolean;
  providers: ProviderDTO[];
  constructor(
    id: string,
    name: string,
    shortDescription: string,
    description: string,
    categoryName: string,
    isService: boolean,
    providers: ProviderDTO[]
  ) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.description = description;
    this.categoryName = categoryName;
    this.isService = isService;
    this.providers = providers;
  }
}

import { Column } from "./Column";

export class ListColumn<T> extends Column<T> {
  nameProperty: string; // represents the property name of the items in the list

  constructor(id: keyof T, label: string, disablePadding: boolean = false, nameProperty: string) {
    super(id, label, disablePadding)
    this.nameProperty = nameProperty;
  }
}

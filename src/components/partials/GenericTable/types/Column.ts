export abstract class Column<T> {
  id: keyof T;
  label: string;
  disablePadding: boolean;

  constructor(id: keyof T, label: string, disablePadding: boolean = false) {
    this.id = id;
    this.label = label;
    this.disablePadding = disablePadding;
  }
}

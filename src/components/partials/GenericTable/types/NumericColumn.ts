import { Column } from "./Column";

export class NumericColumn<T> extends Column<T> {
  constructor(id: keyof T, label: string, disablePadding: boolean = false) {
    super(id, label, disablePadding);
  }
}

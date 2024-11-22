import { Column } from "./Column";

export class BoolColumn<T> extends Column<T> {
  valueTrue: string;
  valueFalse: string;

  constructor(
    id: keyof T,
    label: string,
    disablePadding: boolean = false,
    valueTrue: string,
    valueFalse: string
  ) {
    super(id, label, disablePadding);
    this.valueTrue = valueTrue;
    this.valueFalse = valueFalse;
  }
}

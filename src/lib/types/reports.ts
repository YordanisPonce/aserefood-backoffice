export type MostDemandedItem = {
    name: string,
    quantity:number
}
export type Sale = {
  date: string;
  amount: number;
}
export type Sales = {
  sales: Sale[],
  total: 0
}

export interface ReportsFilters {
    startDate?: string,
    endDate?: string,
    quantity?: string,
  }
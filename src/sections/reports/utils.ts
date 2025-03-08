import { Sale } from "@/lib/types/reports";

export const formatDayData = (data: Sale[]) => {
  return data.map((item) => ({
    date: `${new Date(item.date).getHours()}-${new Date(item.date).getHours() + 1}`, // Formato 1-2, 2-3, ...
    amount: item.amount,
  }));
};

export const formatWeekData = (data: Sale[]) => {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  return data.map((item, index) => ({
    date: `${daysOfWeek[index]} ${new Date(item.date).getDate()}`,
    amount: item.amount,
  }));
};

export const formatMonthData = (data: Sale[]) => {
  return data.map((item, index) => ({
    date: `Semana ${index + 1}`,
    amount: item.amount,
  }));
};

export const formatYearData = (data: Sale[]) => {
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return data.map((item, index) => ({
    date: monthsOfYear[index],
    amount: item.amount,
  }));
};

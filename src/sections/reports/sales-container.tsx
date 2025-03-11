"use client";
import Chart from "@/components/common/charts/chart";
import { Sales } from "@/lib/types/reports";
import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  formatDayData,
  formatMonthData,
  formatWeekData,
  formatYearData,
} from "./utils";
import CardChartContainer from "@/components/common/charts/chart-card";

interface SalesProps {
  promise: Promise<[Sales, Sales, Sales, Sales]>;
}

const SalesContainer: React.FC<SalesProps> = ({ promise }) => {
  const [data, setData] = useState<[Sales, Sales, Sales, Sales] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await promise;
        setData(result);
      } catch {
        setError("Failed to load sales data.");
      }
    };

    fetchData();
  }, [promise]);

  if (error) {
    return (
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h4" color="error" gutterBottom>
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Loading...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const [dayData, weekData, monthData, yearData] = data;

  // Datos formateados según la unidad de tiempo
  const formattedData = [
    formatDayData(dayData.sales),
    formatWeekData(weekData.sales),
    formatMonthData(monthData.sales),
    formatYearData(yearData.sales),
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const charts = [
    {
      label: "Día",
      data: formattedData[0],
      xLabel: "Hora",
      yLabel: "Ventas",
      color: "#AAFAC8",
    },
    {
      label: "Semana",
      data: formattedData[1],
      xLabel: "Día de la Semana",
      yLabel: "Ventas",
      color: "#C7FFED",
    },
    {
      label: "Mes",
      data: formattedData[2],
      xLabel: "Semana",
      yLabel: "Ventas",
      color: "#B0A1BA",
    },
    {
      label: "Año",
      data: formattedData[3],
      xLabel: "Mes",
      yLabel: "Ventas",
      color: "#F96F5D",
    },
  ];

  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          Análisis de Ventas por Período
        </Typography>
        <Typography variant="h6" gutterBottom>
          Visualizar las ventas desglosadas por distintos períodos de tiempo,
          incluyendo ventas diarias, por días de la semana, semanas del mes y
          meses del año.
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Sales data tabs"
        >
          {charts.map((chart, index) => (
            <Tab key={index} label={chart.label} />
          ))}
        </Tabs>
        <CardChartContainer title={`Ventas - ${charts[selectedTab].label}`}>
          <Chart
            data={charts[selectedTab].data}
            xAxisKey="date"
            dataKey="amount"
            Xlabel={charts[selectedTab].xLabel}
            Ylabel={charts[selectedTab].yLabel}
            color={charts[selectedTab].color}
            variant="line"
          />
        </CardChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesContainer;

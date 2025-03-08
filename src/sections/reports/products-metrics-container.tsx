'use client'
import Chart from "@/components/common/charts/chart";
import CardChartContainer from "@/components/common/charts/chart-card";
import { MostDemandedItem } from "@/lib/types/reports";
import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { use, useState } from "react";
import ProductsReportFilters from "./components/Filters/products-report-filters";

interface SalesProps {
  promise:  Promise<[MostDemandedItem[], MostDemandedItem[]]>;
}

const ProductsSalesContainer: React.FC<SalesProps> = ({ promise }) => {
  const [productsData,productsComboData] = use(promise);
  const [selectedTab, setSelectedTab] = useState(0);



  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const charts = [
    { label: "Productos", data: productsData, xLabel: "Productos", yLabel: "Cantidad", color: "#F73F26", quantity:productsData.length },
    { label: "Combos de Productos", data: productsComboData, xLabel: "Combos de Productos", yLabel: "Cantidad", color: "#F96F5D", quantity:productsComboData.length },
   
  ];

  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <CardContent>
        <Typography variant="h4" color='primary' gutterBottom>
          Productos más vendidos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Gráfico interactivo con los productos más vendidos en un período determinado.
        </Typography>
        <ProductsReportFilters/>
        <Tabs sx={{mt:4}} value={selectedTab} onChange={handleTabChange} aria-label="Sales data tabs">
          {charts.map((chart, index) => (
            <Tab key={index} label={chart.label} />
          ))}
        </Tabs>
          <CardChartContainer  title={`Ventas - ${charts[selectedTab].label}`}>
        <Chart
            data={charts[selectedTab].data}
            xAxisKey='name'
            dataKey='quantity'
            Xlabel={charts[selectedTab].xLabel}
            Ylabel={charts[selectedTab].yLabel}
            color={charts[selectedTab].color}
            variant="bar"
          />
          </CardChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProductsSalesContainer;

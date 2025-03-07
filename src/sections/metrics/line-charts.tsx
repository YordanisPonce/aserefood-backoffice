'use client'
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const mockData = Array.from({ length: 10 }, (_, i) => ({
  day: `Día ${i + 1}`,
  sales: Math.floor(Math.random() * 1000) + 100,
  users: Math.floor(Math.random() * 500) + 50,
  categories: Math.floor(Math.random() * 200) + 20,
  orders: Math.floor(Math.random() * 300) + 30,
}));

const charts = [
  { color: "#FF0000", label: "Ventas de Productos", dataKey: "sales" },
  { color: "#0000FF", label: "Usuarios Activos", dataKey: "users" },
  { color: "#008000", label: "Categorías Más Vistas", dataKey: "categories" },
  { color: "#FFA500", label: "Órdenes por Día", dataKey: "orders" },
];

const LineCharts = () => {
  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Gráficos de Líneas - Recharts
        </Typography>
        <Grid container spacing={2}>
          {charts.map(({ color, label, dataKey }) => (
            <Grid item xs={12} md={6} key={dataKey}>
              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {label}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LineCharts;

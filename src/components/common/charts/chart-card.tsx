'use client'
import React from "react";

import { Card, CardContent, Typography } from "@mui/material";


interface SalesLineChartProps {
  children: React.ReactNode;
  title: string;
 
}

const CardChartContainer: React.FC<SalesLineChartProps> = ({children,title}) => {
  return (
    <Card sx={{ width: "100%", p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
       {children}
      </CardContent>
    </Card>
  );
};

export default CardChartContainer;

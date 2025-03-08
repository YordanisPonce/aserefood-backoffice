import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

type Variants = 'bar' | 'line';

interface Props<T> {
  data: T[];
  dataKey: keyof T;
  color: string;
  Xlabel: string;
  Ylabel: string;
  xAxisKey: keyof T;
  variant: Variants;
}

const Chart = <T,>({ data, color, dataKey, Xlabel, Ylabel, xAxisKey, variant }: Props<T>) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {variant === 'bar' ? (
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey as string} label={{ value: Xlabel, position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: Ylabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey={dataKey as string} fill={color} />
        </BarChart>
      ) : (
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey as string} label={{ value: Xlabel, position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: Ylabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey as string} stroke={color} strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;

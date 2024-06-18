import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type dataKeyType = {
  _id: string;
  count: number;
};

interface BarChartComponentProps {
  responses: dataKeyType[];
}

const BarChartComponent = ({ responses }: BarChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={500} height={300} data={responses}>
        <CartesianGrid />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="count" fill="#427AA1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Count:
          <span className="ml-2">{payload[0].value}</span>
        </p>
      </div>
    );
  }
};

export default BarChartComponent;

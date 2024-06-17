import React from "react";
import {
  Bar,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    product1: 3000,
    product2: 4000,
  },
  {
    name: "Feb",
    product1: 1000,
    product2: 2000,
  },
  {
    name: "March",
    product1: 5000,
    product2: 1452,
  },
  {
    name: "May",
    product1: 3231,
    product2: 1232,
  },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={500} data={productSales}>
        <YAxis />
        <XAxis dataKey={"name"} />
        <CartesianGrid />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line dataKey={"product1"} />
        <Line dataKey={"product2"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-white">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Product 2:
          <span>${payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default LineChartComponent;

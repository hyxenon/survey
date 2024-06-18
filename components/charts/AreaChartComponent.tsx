"use client";
import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={500} height={500} data={productSales}>
        <YAxis />
        <XAxis dataKey={"name"} />
        <CartesianGrid />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type={"monotone"}
          fill="red"
          stroke="yellow"
          dataKey={"product1"}
        />
        <Area fill="blue" stroke="yellow" dataKey={"product2"} />
      </AreaChart>
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

export default AreaChartComponent;

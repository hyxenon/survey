import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type dataKeyType = {
  _id: string;
  count: number;
};

interface LineChartComponentProps {
  responses: dataKeyType[];
}

const LineChartComponent = ({ responses }: LineChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={500} data={responses}>
        <YAxis />
        <XAxis dataKey="_id" />
        <CartesianGrid />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line dataKey="count" fill="#427AA1" />
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

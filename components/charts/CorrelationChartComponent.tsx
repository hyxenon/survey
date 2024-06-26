import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const socialMediaData = [
  { name: "1-2 hours", count: 10 },
  { name: "3-4 hours", count: 28 },
  { name: "4-5 hours", count: 28 },
  { name: "Less than 1 hour", count: 6 },
  { name: "More than 5 hours", count: 31 },
];

const gpaData = [
  { name: "1.25 or 96-97", count: 2 },
  { name: "1.50 or 93-95", count: 15 },
  { name: "1.75 or 90-92", count: 20 },
  { name: "2.00 or 87-89", count: 49 },
  { name: "2.25 or 84-86", count: 11 },
  { name: "2.50 or 81-83", count: 5 },
  { name: "2.75 or 78-80", count: 1 },
];

const CorrelationChart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <ScatterChart
        width={800}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="count"
          name="Social Media Usage"
          unit="hours"
        />
        <YAxis type="number" dataKey="count" name="Average GPA" unit="GPA" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter
          name="Social Media Usage"
          data={socialMediaData}
          fill="#8884d8"
        />
        <Scatter name="Average GPA" data={gpaData} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CorrelationChart;

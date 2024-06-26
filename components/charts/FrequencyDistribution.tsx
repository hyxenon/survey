// pages/FrequencyDistribution.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DataPoint {
  _id: string;
  count: number;
}

const data: DataPoint[] = [
  { _id: "Facebook", count: 14 },
  { _id: "Instagram", count: 15 },
  { _id: "Messenger", count: 40 },
  { _id: "Reddit", count: 2 },
  { _id: "Tiktok", count: 24 },
  { _id: "X or Twitter", count: 8 },
];

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

const FrequencyDistribution: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="90%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyDistribution;

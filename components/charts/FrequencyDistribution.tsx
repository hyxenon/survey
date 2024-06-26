import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  calculateFrequencyDistribution,
  SurveyResponse,
} from "../../lib/utils/frequencyDistribution";
import { Card } from "../ui/card";

const FrequencyDistribution: React.FC = () => {
  const [data, setData] = useState<{ platform: string; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/surveyResponses");
        const data: SurveyResponse[] = await response.json();
        const frequencyData = calculateFrequencyDistribution(data);
        setData(frequencyData);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch survey responses:", error);
      }
    }

    fetchData();
  }, []);

  const totalResponses = data.reduce((sum, { count }) => sum + count, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Frequency Distribution of Social Media Platforms
      </h1>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Card>
        <div className=" p-4 bg-gray-100 rounded-lg shadow-md border">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p className="text-gray-700 mb-2">
            Total responses:{" "}
            <span className="font-bold text-gray-900">{totalResponses}</span>
          </p>
          <ul className="list-disc list-inside">
            {data.map(({ platform, count }) => (
              <li key={platform} className="mb-2">
                <span className="font-bold text-gray-900">{platform}</span>:{" "}
                {count} responses (
                <span className="text-blue-500 font-bold">
                  {((count / totalResponses) * 100).toFixed(2)}%
                </span>
                )
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default FrequencyDistribution;

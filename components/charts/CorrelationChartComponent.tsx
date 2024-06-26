import React, { useEffect, useState } from "react";
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
import {
  calculateCorrelation,
  SurveyResponse,
} from "../../lib/utils/correlation";

const CorrelationChartComponent: React.FC = () => {
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [correlation, setCorrelation] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/surveyResponses");
        const data: SurveyResponse[] = await response.json();
        setData(data);
        const corr = calculateCorrelation(data);
        setCorrelation(corr);
      } catch (error) {
        console.error("Failed to fetch survey responses:", error);
      }
    }

    fetchData();
  }, []);

  const scatterData = data.map((response) => {
    const usage = response.responses[0]["1"];
    const gpaValue = response.responses[0]["10"];

    // Convert social media usage to numerical values
    let usageHours: number;
    switch (usage) {
      case "Less than 1 hour":
        usageHours = 0.5;
        break;
      case "1-2 hours":
        usageHours = 1.5;
        break;
      case "3-4 hours":
        usageHours = 3.5;
        break;
      case "4-5 hours":
        usageHours = 4.5;
        break;
      case "More than 5 hours":
        usageHours = 6; // An arbitrary number greater than 5
        break;
      default:
        usageHours = 0;
    }

    // Convert GPA to numerical values
    let gpaNum: number;
    switch (gpaValue) {
      case "1.25 or 96-97":
      case "1.50 or 93-95":
      case "1.75 or 90-92":
      case "2.00 or 87-89":
      case "2.25 or 84-86":
      case "2.50 or 81-83":
      case "2.75 or 78-80":
        gpaNum = parseFloat(gpaValue.split(" ")[0]);
        break;
      default:
        gpaNum = 0;
    }

    return { usageHours, gpa: gpaNum };
  });

  const renderSummary = () => {
    if (!correlation) return null;

    let trendDescription = "";
    if (correlation > 0.5) {
      trendDescription = "a strong positive";
    } else if (correlation > 0.3) {
      trendDescription = "a moderate positive";
    } else if (correlation > 0) {
      trendDescription = "a weak positive";
    } else if (correlation < -0.5) {
      trendDescription = "a strong negative";
    } else if (correlation < -0.3) {
      trendDescription = "a moderate negative";
    } else if (correlation < 0) {
      trendDescription = "a weak negative";
    } else {
      trendDescription = "no";
    }

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>
          The correlation coefficient between social media usage and GPA is{" "}
          {correlation.toFixed(2)}. This indicates {trendDescription}{" "}
          correlation.
          {correlation > 0
            ? " As social media usage increases, GPA tends to increase."
            : correlation < 0
            ? " As social media usage increases, GPA tends to decrease."
            : " There is no clear trend between social media usage and GPA."}
        </p>
        <p>
          Further analysis may be needed to determine if other factors are
          influencing this relationship. It is important to consider that
          correlation does not imply causation.
        </p>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Correlation Analysis</h1>
      <p className="mb-4">
        Correlation between Social Media Usage and GPA:{" "}
        {correlation !== null ? correlation.toFixed(2) : "Loading..."}
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="usageHours"
            name="Social Media Usage (hours)"
          />
          <YAxis type="number" dataKey="gpa" name="GPA" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Students" data={scatterData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
      {renderSummary()}
    </div>
  );
};

export default CorrelationChartComponent;

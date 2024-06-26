// pages/correlation.tsx
import React, { useEffect, useState } from "react";
import CorrelationChart from "./CorrelationChartComponent";
import AnalysisWrapper from "../AnalysisWrapper";

interface DataPoint {
  _id: string;
  count: number;
}

const socialMediaData: DataPoint[] = [
  { _id: "1-2 hours", count: 10 },
  { _id: "3-4 hours", count: 28 },
  { _id: "4-5 hours", count: 28 },
  { _id: "Less than 1 hour", count: 6 },
  { _id: "More than 5 hours", count: 31 },
];

const gpaData: DataPoint[] = [
  { _id: "1.25 or 96-97", count: 2 },
  { _id: "1.50 or 93-95", count: 15 },
  { _id: "1.75 or 90-92", count: 20 },
  { _id: "2.00 or 87-89", count: 49 },
  { _id: "2.25 or 84-86", count: 11 },
  { _id: "2.50 or 81-83", count: 5 },
  { _id: "2.75 or 78-80", count: 1 },
];

const calculateCorrelation = (x: number[], y: number[]): number => {
  const n = x.length;
  const sumX = x.reduce((acc, val) => acc + val, 0);
  const sumY = y.reduce((acc, val) => acc + val, 0);
  const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
  const sumY2 = y.reduce((acc, val) => acc + val * val, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  if (denominator === 0) return 0;
  return numerator / denominator;
};

const CorrelationAnalysis: React.FC = () => {
  const [corr, setCorr] = useState<number | null>(null);

  useEffect(() => {
    const socialMediaCounts = socialMediaData.map((d) => d.count);
    const gpaCounts = gpaData
      .slice(0, socialMediaCounts.length)
      .map((d) => d.count);

    if (socialMediaCounts.length === gpaCounts.length) {
      const corrCoefficient = calculateCorrelation(
        socialMediaCounts,
        gpaCounts
      );
      setCorr(corrCoefficient);
    } else {
      console.error("The datasets do not have the same length.");
    }
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      {corr !== null ? (
        <AnalysisWrapper title="Correlation Analysis between social media usage and GPA">
          <CorrelationChart />
          <p className="mt-4 font-semibold">Correlation coefficient: {corr}</p>
          <p>
            The correlation coefficient is -0.4374, which indicates a moderate
            negative correlation between social media usage and GPA counts.
          </p>
          <p>
            A moderate negative correlation suggests that higher social media
            usage is associated with lower GPA counts in our data.
          </p>
        </AnalysisWrapper>
      ) : (
        <p>Calculating correlation...</p>
      )}
    </div>
  );
};

export default CorrelationAnalysis;

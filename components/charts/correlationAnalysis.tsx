// pages/correlation.tsx
import React, { useEffect, useState } from "react";
import CorrelationChart from "./CorrelationChartComponent";
import AnalysisWrapper from "../AnalysisWrapper";

interface DataPoint {
  _id: string;
  count: number;
}

const CorrelationAnalysis: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <AnalysisWrapper title="Correlation Analysis between social media usage and GPA">
        <CorrelationChart />
      </AnalysisWrapper>
    </div>
  );
};

export default CorrelationAnalysis;

import React, { useEffect, useState } from "react";
import {
  createCrossTabulation,
  CrossTabulationResult,
  SurveyResponse,
} from "../../lib/utils/crossTabulation";
import AnalysisWrapper from "../AnalysisWrapper";

const CrossTabulation: React.FC = () => {
  const [crossTabData, setCrossTabData] =
    useState<CrossTabulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/surveyResponses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SurveyResponse[] = await response.json();
        console.log("Fetched data:", data); // Log fetched data

        const crossTab = createCrossTabulation(data);
        setCrossTabData(crossTab);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch survey responses:", error);
      }
    }

    fetchData();
  }, []);

  const renderConclusion = () => {
    if (!crossTabData) return null;

    // Calculate the total number of responses
    const totalResponses = Object.values(crossTabData).reduce((acc, gpas) => {
      return acc + Object.values(gpas).reduce((sum, count) => sum + count, 0);
    }, 0);

    const mostCommonUsage = Object.entries(crossTabData).reduce(
      (acc, [usage, gpas]) => {
        const usageCount = Object.values(gpas).reduce(
          (sum, count) => sum + count,
          0
        );
        return usageCount > acc.count ? { usage, count: usageCount } : acc;
      },
      { usage: "", count: 0 }
    );

    const highestGpaCategory = Object.entries(crossTabData).reduce(
      (acc, [usage, gpas]) => {
        Object.entries(gpas).forEach(([gpa, count]) => {
          if (count > acc.count) {
            acc = { usage, gpa, count };
          }
        });
        return acc;
      },
      { usage: "", gpa: "", count: 0 }
    );

    const mostCommonUsagePercentage = (
      (mostCommonUsage.count / totalResponses) *
      100
    ).toFixed(2);
    const highestGpaCategoryPercentage = (
      (highestGpaCategory.count / totalResponses) *
      100
    ).toFixed(2);

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Conclusion</h2>
        <p>Total responses: {totalResponses}</p>
        <p>
          Most common social media usage: {mostCommonUsage.usage} (
          {mostCommonUsage.count} responses, {mostCommonUsagePercentage}%)
        </p>
        <p>
          Highest GPA category: {highestGpaCategory.gpa} during{" "}
          {highestGpaCategory.usage} of social media usage (
          {highestGpaCategory.count} responses, {highestGpaCategoryPercentage}%)
        </p>
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!crossTabData) {
    return <div>Loading...</div>;
  }

  // Calculate the total number of responses for percentages
  const totalResponses = Object.values(crossTabData).reduce((acc, gpas) => {
    return acc + Object.values(gpas).reduce((sum, count) => sum + count, 0);
  }, 0);

  return (
    <AnalysisWrapper title="Cross-Tabulation of Social Media Usage During Study Sessions and GPA">
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social Media Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(crossTabData).map(([usage, gpas]) =>
                Object.entries(gpas).map(([gpa, count]) => (
                  <tr key={`${usage}-${gpa}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {gpa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {((count / totalResponses) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {renderConclusion()}
      </div>
    </AnalysisWrapper>
  );
};

export default CrossTabulation;

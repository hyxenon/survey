import React from "react";
import AnalysisWrapper from "../AnalysisWrapper";

// Define interfaces for data points
interface DataPoint {
  _id: string;
  count: number;
}

interface SurveyDataItem {
  [key: string]: DataPoint[];
}

const surveyData: SurveyDataItem[] = [
  {
    question1: [
      { _id: "1-2 hours", count: 10 },
      { _id: "3-4 hours", count: 28 },
      { _id: "4-5 hours", count: 28 },
      { _id: "Less than 1 hour", count: 6 },
      { _id: "More than 5 hours", count: 31 },
    ],
  },
  {
    question2: [
      { _id: "Facebook", count: 14 },
      { _id: "Instagram", count: 15 },
      { _id: "Messenger", count: 40 },
      { _id: "Reddit", count: 2 },
      { _id: "Tiktok", count: 24 },
      { _id: "X or twitter", count: 8 },
    ],
  },
  {
    question6: [
      { _id: "I'm not sure", count: 4 },
      { _id: "No, it doesn't affect me", count: 10 },
      { _id: "Yes, significantly", count: 34 },
      { _id: "Yes, somewhat", count: 55 },
    ],
  },
  {
    question10: [
      { _id: "1.25 or 96-97", count: 2 },
      { _id: "1.50 or 93-95", count: 15 },
      { _id: "1.75 or 90-92", count: 20 },
      { _id: "2.00 or 87-89", count: 49 },
      { _id: "2.25 or 84-86", count: 11 },
      { _id: "2.50 or 81-83", count: 5 },
      { _id: "2.75 or 78-80", count: 1 },
    ],
  },
];

const PercievedAnalytics: React.FC = () => {
  // Function to calculate total counts from an array of data points
  const calculateTotalCounts = (data: DataPoint[]) => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  };

  // Extract relevant data for analysis
  const socialMediaHours =
    surveyData.find((item) => item.hasOwnProperty("question1"))?.question1 ||
    [];
  const socialMediaPlatforms =
    surveyData.find((item) => item.hasOwnProperty("question2"))?.question2 ||
    [];
  const perceivedImpact =
    surveyData.find((item) => item.hasOwnProperty("question6"))?.question6 ||
    [];
  const gpaData =
    surveyData.find((item) => item.hasOwnProperty("question10"))?.question10 ||
    [];

  // Calculate total counts for social media hours (question1)
  const totalSocialMediaHours = calculateTotalCounts(socialMediaHours);

  // Calculate total counts for social media platforms (question2)
  const totalSocialMediaPlatforms = calculateTotalCounts(socialMediaPlatforms);

  // Calculate total counts for perceived impact on academic performance (question6)
  const totalPerceivedImpact = calculateTotalCounts(perceivedImpact);

  // Function to calculate weighted average GPA from data points
  const calculateWeightedAverageGPA = (gpaData: DataPoint[]) => {
    const totalWeightedSum = gpaData.reduce(
      (acc, curr) => acc + parseFloat(curr._id.split(" ")[0]) * curr.count,
      0
    );
    const totalCount = calculateTotalCounts(gpaData);
    return totalWeightedSum / totalCount;
  };

  // Calculate weighted average GPA (question10)
  const weightedAverageGPA = calculateWeightedAverageGPA(gpaData);

  return (
    <AnalysisWrapper title="Analysis of perceived impact on academic performance.">
      <h1 className="text-xl font-bold mb-4">
        Perceived Impact on Academic Performance
      </h1>
      <div className="mb-4">
        <p className="">
          Total hours spent on social media:{" "}
          <span className="font-bold">{totalSocialMediaHours}</span>
        </p>
        <p className="">
          Total counts of social media platform usage:{" "}
          <span className="font-bold">{totalSocialMediaPlatforms}</span>
        </p>
        <p className="">
          Total perceived impact on academic performance:{" "}
          <span className="font-bold">{totalPerceivedImpact}</span>
        </p>
        <p className="">
          Weighted average GPA:{" "}
          <span className="font-bold">{weightedAverageGPA.toFixed(2)}</span>
        </p>
      </div>
    </AnalysisWrapper>
  );
};

export default PercievedAnalytics;

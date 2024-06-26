import React from "react";
import AnalysisWrapper from "../AnalysisWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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

const CrossTabulation: React.FC = () => {
  // Initialize cross-tabulation table
  const crossTabulation: { [key: string]: { [key: string]: number } } = {};

  // Extract relevant data for cross-tabulation
  const socialMediaUsageData =
    surveyData.find((item) => item.hasOwnProperty("question1"))?.question1 ||
    [];
  const gpaData =
    surveyData.find((item) => item.hasOwnProperty("question10"))?.question10 ||
    [];

  // Populate cross-tabulation table
  socialMediaUsageData.forEach((socialMediaEntry) => {
    crossTabulation[socialMediaEntry._id] = {};

    gpaData.forEach((gpaEntry) => {
      crossTabulation[socialMediaEntry._id][gpaEntry._id] = 0;
    });
  });

  // Fill in counts from survey data
  socialMediaUsageData.forEach((socialMediaEntry) => {
    gpaData.forEach((gpaEntry) => {
      const gpaEntryFound = gpaData.find((gpa) => gpa._id === gpaEntry._id);
      if (gpaEntryFound) {
        const count = socialMediaEntry.count * gpaEntryFound.count;
        crossTabulation[socialMediaEntry._id][gpaEntry._id] = count;
      }
    });
  });

  // Function to format numbers with commas for better readability
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <AnalysisWrapper title="Cross-tabulation of social media usage during study sessions and GPA.">
      <Table>
        <TableCaption>
          Cross-tabulation of social media usage during study sessions and GPA.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Social Media Usage</TableHead>
            {gpaData.map((gpaEntry) => (
              <TableHead key={gpaEntry._id} className="px-4 py-2 text-center">
                {gpaEntry._id}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {socialMediaUsageData.map((socialMediaEntry) => (
            <TableRow key={socialMediaEntry._id}>
              <TableCell className="px-4 py-2 font-medium">
                {socialMediaEntry._id}
              </TableCell>
              {gpaData.map((gpaEntry) => (
                <TableCell
                  key={`${socialMediaEntry._id}-${gpaEntry._id}`}
                  className="px-4 py-2 text-center"
                >
                  {formatNumber(
                    crossTabulation[socialMediaEntry._id][gpaEntry._id]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AnalysisWrapper>
  );
};

export default CrossTabulation;

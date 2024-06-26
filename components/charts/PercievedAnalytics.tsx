import React from "react";
import AnalysisWrapper from "../AnalysisWrapper";

interface ResponseItem {
  _id: string;
  count: number;
}

interface QuestionData {
  question1: ResponseItem[];
  question2: ResponseItem[];
  question3: ResponseItem[];
  question4: ResponseItem[];
  question5: ResponseItem[];
  question6: ResponseItem[];
  question7: ResponseItem[];
  question8: ResponseItem[];
  question9: ResponseItem[];
  question10: ResponseItem[];
}

const data: QuestionData = {
  question1: [
    { _id: "1-2 hours", count: 11 },
    { _id: "3-4 hours", count: 28 },
    { _id: "4-5 hours", count: 28 },
    { _id: "Less than 1 hour", count: 6 },
    { _id: "More than 5 hours", count: 31 },
  ],
  question2: [
    { _id: "Facebook", count: 14 },
    { _id: "Instagram", count: 15 },
    { _id: "Messenger", count: 41 },
    { _id: "Reddit", count: 2 },
    { _id: "Tiktok", count: 24 },
    { _id: "X or twitter", count: 8 },
  ],
  question3: [
    { _id: "habit", count: 39 },
    { _id: "staying updated with news and events", count: 27 },
    { _id: "procrastination", count: 42 },
    { _id: "boredom", count: 39 },
    { _id: "looking for study resources or help", count: 45 },
  ],
  question4: [
    { _id: "Frequently (5-6 times)", count: 28 },
    { _id: "Never", count: 6 },
    { _id: "Occasionally (3-4 times)", count: 38 },
    { _id: "Rarely (once or twice)", count: 14 },
    { _id: "Very frequently (more than 6 times)", count: 18 },
  ],
  question5: [
    { _id: "Negative ", count: 24 },
    { _id: "Neutral ", count: 35 },
    { _id: "Positive", count: 45 },
  ],
  question6: [
    { _id: "I'm not sure", count: 4 },
    { _id: "No, it doesn't affect me", count: 10 },
    { _id: "Yes, significantly", count: 34 },
    { _id: "Yes, somewhat", count: 56 },
  ],
  question7: [
    { _id: "Agree", count: 34 },
    { _id: "Disagree", count: 6 },
    { _id: "Neutral", count: 21 },
    { _id: "Strongly agree", count: 40 },
    { _id: "Strongly disagree", count: 3 },
  ],
  question8: [
    { _id: "No, never", count: 14 },
    { _id: "Yes, always", count: 43 },
    { _id: "Yes, sometimes", count: 47 },
  ],
  question9: [
    { _id: "No, I do not use any tools or apps", count: 24 },
    { _id: "Yes, I use social media-blocking apps", count: 29 },
    { _id: "Yes, I use time management apps", count: 51 },
  ],
  question10: [
    { _id: "1.25 or 96-97", count: 2 },
    { _id: "1.50 or 93-95", count: 15 },
    { _id: "1.75 or 90-92", count: 20 },
    { _id: "2.00 or 87-89", count: 50 },
    { _id: "2.25 or 84-86", count: 11 },
    { _id: "2.50 or 81-83", count: 5 },
    { _id: "2.75 or 78-80", count: 1 },
  ],
};

// Analysis functions
const analyzeData = (data: QuestionData) => {
  const totalResponses = Object.values(data).reduce(
    (sum, question) =>
      sum + question.reduce((acc: any, item: any) => acc + item.count, 0),
    0
  );

  const analysis = {
    question1: data.question1.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question2: data.question2.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question3: data.question3.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question4: data.question4.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question5: data.question5.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question6: data.question6.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question7: data.question7.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question8: data.question8.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question9: data.question9.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
    question10: data.question10.reduce(
      (acc: Record<string, number>, item) => ({
        ...acc,
        [item._id]: item.count,
      }),
      {}
    ),
  };

  return { analysis, totalResponses };
};

const PerceivedAnalytics: React.FC = () => {
  const { analysis, totalResponses } = analyzeData(data);

  return (
    <AnalysisWrapper title="Perceived Impact on Academic Performance">
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto max-w-4xl">
          {Object.keys(analysis).map((question, index) => (
            <div key={index} className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{`Question ${
                index + 1
              }`}</h2>
              <ul className="space-y-2">
                {Object.keys(analysis[question as keyof typeof analysis]).map(
                  (key, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between p-2 bg-gray-50 rounded-md shadow-sm"
                    >
                      <span className="font-medium">{key}</span>
                      <span>
                        {analysis[question as keyof typeof analysis][key]}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-4">
              Summary of Analysis
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">
                <strong>Total Responses:</strong> 104
              </p>
              <p className="mb-4">
                <strong>Most Common Study Duration:</strong>{" "}
                {Object.keys(analysis.question1).reduce((a, b) =>
                  analysis.question1[a] > analysis.question1[b] ? a : b
                )}
              </p>
              <p className="mb-4">
                <strong>Most Used Social Media Platform:</strong>{" "}
                {Object.keys(analysis.question2).reduce((a, b) =>
                  analysis.question2[a] > analysis.question2[b] ? a : b
                )}
              </p>
              <p className="mb-4">
                <strong>Top Reason for Social Media Use:</strong>{" "}
                {Object.keys(analysis.question3).reduce((a, b) =>
                  analysis.question3[a] > analysis.question3[b] ? a : b
                )}
              </p>
              <p className="mb-4">
                <strong>General Perception of Social Media Impact:</strong>{" "}
                {Object.keys(analysis.question5).reduce((a, b) =>
                  analysis.question5[a] > analysis.question5[b] ? a : b
                )}
              </p>
              <p className="mb-4">
                <strong>Effect of Social Media on Academic Performance:</strong>{" "}
                {Object.keys(analysis.question6).reduce((a, b) =>
                  analysis.question6[a] > analysis.question6[b] ? a : b
                )}
              </p>
              <p className="mb-4">
                <strong>Average Academic Performance (GPA):</strong>{" "}
                {Object.keys(analysis.question10).reduce((a, b) =>
                  analysis.question10[a] > analysis.question10[b] ? a : b
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnalysisWrapper>
  );
};

export default PerceivedAnalytics;

import CardQuestion from "@/components/cardQuestion";
import SurveyDescription from "@/components/surveyDescription";
import { Button } from "@/components/ui/button";

type dataQuestions = {
  questionTitle: string;
  questions: any[];
  checkbox?: boolean;
};

const dataQuestions: dataQuestions[] = [
  {
    questionTitle: "How many hours do you spend on social media daily?",
    questions: [
      "Less than 1 hour",
      "1-2 hours",
      "3-4 hours",
      "4-5 hours",
      "More than 5 hours",
    ],
  },
  {
    questionTitle: "Which Social media platforms do you use most?",
    questions: [
      "Facebook",
      "Messenger",
      "Instagram",
      "X or twitter",
      "Reddit",
      "Tiktok",
    ],
  },
  {
    questionTitle:
      "What motivates you to check social media during study sessions? (Select all that apply)",
    questions: [
      "Boredom",
      "Procrastination",
      "Habit",
      "X or twitter.",
      "Looking for study resources or help",
      "Staying updated with news and events",
    ],
    checkbox: true,
  },
  {
    questionTitle: "How often do you check social media during study sessions?",
    questions: [
      "Never",
      "Rarely (once or twice)",
      "Occasionally (3-4 times)",
      "Frequently (5-6 times)",
      "Very frequently (more than 6 times)",
    ],
  },
  {
    questionTitle:
      "How do you feel social media affects your academic performance?",
    questions: ["Positive", "Negative ", "Neutral "],
  },
  {
    questionTitle:
      "Do you believe checking social media during study sessions affects your concentration and productivity?",
    questions: [
      "Yes, significantly",
      "Yes, somewhat",
      "No, it doesn't affect me",
      "I'm not sure",
    ],
  },
  {
    questionTitle:
      "Do you feel that social media helps you stay updated with academic deadlines and announcements?",
    questions: [
      "Strongly agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly disagree",
    ],
  },
  {
    questionTitle:
      "Do you set specific time limits for social media usage during study sessions?",
    questions: ["Yes, always", "Yes, sometimes", "No, never"],
  },
  {
    questionTitle:
      "Do you use any tools or apps to help manage your social media usage during study sessions?",
    questions: [
      "Yes, I use time management apps",
      "Yes, I use social media-blocking apps",
      "No, I do not use any tools or apps",
    ],
  },
  {
    questionTitle: "What is your average GPA? ",
    questions: [
      "1.00 or 98 above",
      "1.25 or 96-97",
      "1.50 or 93-95",
      "1.75 or 90-92",
      "2.00 or 87-89",
      "2.25 or 84-86",
      "2.50 or 81-83",
      "2.75 or 78-80",
      "3.00 or 75-77",
      "5.00 or below 75",
    ],
  },
];

const SurveyForm = () => {
  return (
    <div className="px-8 sm: md:px-16 lg:px-32 xl:px-64 py-8 flex flex-col justify-center items-center bg-[#EBF2FA]">
      <SurveyDescription />
      <div className="mt-4 w-full max-w-[800px] flex flex-col gap-3">
        {dataQuestions.map((data, index) => (
          <CardQuestion
            questionTitle={data.questionTitle}
            questions={data.questions}
            checkbox={data.checkbox}
            key={index}
          />
        ))}
        <Button className="bg-[#427AA1] hover:bg-[#064789] w-[150px]">
          Submit Answers
        </Button>
        <footer className="mt-4">
          <p className="text-sm text-gray-500">
            © BSIT 3-1 Group Social Media Influence on Academic Performance
            (ITPE4) Final Requirement
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SurveyForm;

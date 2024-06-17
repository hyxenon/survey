"use client";

import Loading from "@/components/Loading";
import AlreadyResponed from "@/components/alreadyResponed";
import CardQuestion2 from "@/components/cardQuestion2";
import SurveyDescription from "@/components/surveyDescription";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const QuestionSchema = z.object({
  "1": z.string({
    message: "You need to answer this question",
  }),
  "2": z.string({
    message: "You need to answer this question",
  }),
  "3": z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  "4": z.string({
    message: "You need to answer this question",
  }),
  "5": z.string({
    message: "You need to answer this question",
  }),
  "6": z.string({
    message: "You need to answer this question",
  }),
  "7": z.string({
    message: "You need to answer this question",
  }),
  "8": z.string({
    message: "You need to answer this question",
  }),
  "9": z.string({
    message: "You need to answer this question",
  }),
  "10": z.string({
    message: "You need to answer this question",
  }),
});

const dataQuestions = [
  {
    questionTitle: "How many hours do you spend on social media daily?",
    questions: [
      "Less than 1 hour",
      "1-2 hours",
      "3-4 hours",
      "4-5 hours",
      "More than 5 hours",
    ],
    isRadioGroup: true,
    name: "1",
    items: [],
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
    isRadioGroup: true,
    name: "2",
    items: [],
  },
  {
    questionTitle:
      "What motivates you to check social media during study sessions? (Select all that apply)",
    questions: [],
    isRadioGroup: false,
    name: "3",
    items: [
      {
        id: "boredom",
        label: "Boredom",
      },
      {
        id: "procrastination",
        label: "Procrastination",
      },
      {
        id: "habit",
        label: "Habit",
      },
      {
        id: "looking for study resources or help",
        label: "Looking for study resources or help",
      },
      {
        id: "staying updated with news and events",
        label: "Staying updated with news and events",
      },
    ],
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
    isRadioGroup: true,
    name: "4",
    items: [],
  },
  {
    questionTitle:
      "How do you feel social media affects your academic performance?",
    questions: ["Positive", "Negative ", "Neutral "],
    isRadioGroup: true,
    name: "5",
    items: [],
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
    isRadioGroup: true,
    name: "6",
    items: [],
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
    isRadioGroup: true,
    name: "7",
    items: [],
  },
  {
    questionTitle:
      "Do you set specific time limits for social media usage during study sessions?",
    questions: ["Yes, always", "Yes, sometimes", "No, never"],
    isRadioGroup: true,
    name: "8",
    items: [],
  },
  {
    questionTitle:
      "Do you use any tools or apps to help manage your social media usage during study sessions?",
    questions: [
      "Yes, I use time management apps",
      "Yes, I use social media-blocking apps",
      "No, I do not use any tools or apps",
    ],
    isRadioGroup: true,
    name: "9",
    items: [],
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
    isRadioGroup: true,
    name: "10",
    items: [],
  },
];

const SurveyForm = () => {
  const { userId } = useAuth();
  const [alreadyResponded, setAlreadyResponded] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser(id: string) {
      try {
        const res = await fetch(`/api/survey-form/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        if (data !== null) {
          setAlreadyResponded(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      "3": [],
    },
  });

  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (values: z.infer<typeof QuestionSchema>) => {
    try {
      const res = await fetch("/api/add-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clerkId: userId, responses: values }),
      });
      if (!res.ok) {
        throw new Error("Error sending answers");
      }
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <div className="px-8 sm: md:px-16 lg:px-32 xl:px-64 py-8 flex flex-col min-h-full items-center bg-[#EBF2FA]">
      {alreadyResponded ? (
        <div className="max-w-[800px]">
          <SurveyDescription />
          <AlreadyResponed />
        </div>
      ) : (
        <div>
          <SurveyDescription />
          <div className="mt-4 w-full max-w-[800px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center justify-center flex-col gap-2"
              >
                {dataQuestions.map((question, index) => (
                  <CardQuestion2
                    questionTitle={question.questionTitle}
                    form={form}
                    name={question.name}
                    isRadioGroup={question.isRadioGroup}
                    key={index}
                    questions={question.questions}
                    items={question.items}
                  />
                ))}
                <Button
                  className="ml-auto bg-[#427AA1] hover:bg-[#064789]"
                  type="submit"
                >
                  Submit Answers
                </Button>
              </form>
            </Form>
            <footer className="mt-4">
              <p className="text-sm text-gray-500">
                © BSIT 3-1 Group Social Media Influence on Academic Performance
                (ITPE4) Final Requirement
              </p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyForm;

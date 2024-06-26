"use client";
import { getTotalCountResponses } from "@/actions/surveyResponse";
import AnalysisWrapper from "@/components/AnalysisWrapper";
import AreaChartComponent from "@/components/charts/AreaChartComponent";
import BarChartComponent from "@/components/charts/BarChartComponent";
import CorrelationAnalysis from "@/components/charts/correlationAnalysis";
import CorrelationChart from "@/components/charts/CorrelationChartComponent";
import CrossTabulation from "@/components/charts/CrossTabulation";
import FrequencyDistribution from "@/components/charts/FrequencyDistribution";
import LineChartComponent from "@/components/charts/LineChartComponent";
import PercievedAnalytics from "@/components/charts/PercievedAnalytics";
import ChartsCard from "@/components/ChartsCard";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar";
import TotalCard from "@/components/TotalCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Unauthorized from "@/components/unauthorized";
import { User } from "@/lib/types/User";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

type ResponseItem = {
  _id: string;
  count: number;
};

type Question = {
  [key: string]: ResponseItem[];
};

type SurveyResponseModel = Question[];

const Dashboard = () => {
  const { userId } = useAuth();
  const [totalResponses, setTotalResponses] = useState<number>();
  const [user, setUser] = useState<User>();
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponseModel>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser(id: string) {
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        const totalCount = await getTotalCountResponses();

        setUser(data);
        setTotalResponses(totalCount);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    async function getSurveyResponses() {
      try {
        const res = await fetch("/api/responses");
        if (!res.ok) {
          throw new Error("Failed to fetch survey responses");
        }
        const data = await res.json();
        console.log(data);

        setSurveyResponses(data);
      } catch (error) {
        console.error("Error fetching surveyResponses");
      }
    }

    if (userId) {
      getUser(userId);
      getSurveyResponses();
    }
  }, [userId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {user?.role !== "admin" ? (
        <div>
          <Unauthorized />
        </div>
      ) : (
        <div>
          <Navbar isAdmin={true} isInDashboard={true} />
          <div className="flex flex-col items-center justify-center mt-4 py-16">
            <h1 className="text-[#064789] text-4xl mb-8">
              Data Analytics Reports
            </h1>

            <div className="w-full flex flex-col items-center justify-center gap-8 xl:w-[80%]">
              <TotalCard count={totalResponses ? totalResponses : 0} />
              <Tabs
                defaultValue="responses"
                className="flex flex-col justify-center items-center"
              >
                <TabsList className="flex bg-gray-200">
                  <TabsTrigger className="min-w-[200px]" value="responses">
                    Responses Graph
                  </TabsTrigger>
                  <TabsTrigger className="min-w-[200px]" value="analysis">
                    Analysis
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="responses">
                  <div className="flex flex-col items-center justify-center gap-8">
                    <ChartsCard
                      questionTitle="1. How many hours do you spend on social media daily?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[0]["question1"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="2. Which Social media platforms do you use most?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[1]["question2"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="3. What motivates you to check social media during study sessions? (Select all that apply)"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[2]["question3"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="4. How often do you check social media during study sessions?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[3]["question4"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="5. How do you feel social media affects your academic performance?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[4]["question5"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="6. Do you believe checking social media during study sessions affects your concentration and productivity?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[5]["question6"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="7. Do you feel that social media helps you stay updated with academic deadlines and announcements?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[6]["question7"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="8. Do you set specific time limits for social media usage during study sessions?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[7]["question8"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="9. Do you use any tools or apps to help manage your social media usage during study sessions?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[8]["question9"]
                          : []
                      }
                    />
                    <ChartsCard
                      questionTitle="10. What is your average GPA?"
                      responses={
                        surveyResponses.length > 0
                          ? surveyResponses[9]["question10"]
                          : []
                      }
                    />
                  </div>
                </TabsContent>
                <TabsContent value="analysis">
                  <div className="flex flex-col items-center justify-center gap-8">
                    <CorrelationAnalysis />

                    <AnalysisWrapper title="Frequency distribution of social media platforms used.">
                      <FrequencyDistribution />
                    </AnalysisWrapper>

                    <PercievedAnalytics />

                    <CrossTabulation />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

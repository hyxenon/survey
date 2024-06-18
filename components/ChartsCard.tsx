import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import BarChartComponent from "./charts/BarChartComponent";

type dataKeyType = {
  _id: string;
  count: number;
};

interface ChartsCardProps {
  questionTitle: string;
  responses: dataKeyType[];
}

const ChartsCard = ({ questionTitle, responses }: ChartsCardProps) => {
  return (
    <Card className="w-[85%] shadow-2xl drop-shadow-sm">
      <CardHeader>
        <CardTitle className="mb-4 font-bold text-[#064789]">
          {questionTitle}
        </CardTitle>
        <div className="flex gap-4 flex-wrap items-center justify-center">
          {responses.map((data, index) => (
            <Card className="shadow drop-shadow w-[250px]" key={index}>
              <CardHeader className="flex flex-col justify-center items-center">
                <CardTitle className="font-bold capitalize text-center">
                  {data._id}
                </CardTitle>
                <CardDescription className="font-bold ">
                  {data.count}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <BarChartComponent responses={responses} />
      </CardContent>
    </Card>
  );
};

export default ChartsCard;

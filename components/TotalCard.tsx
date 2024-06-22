import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";

interface TotalCardProps {
  count: number;
}

const TotalCard = ({ count }: TotalCardProps) => {
  return (
    <Card className="drop-shadow-md shadow w-[85%]">
      <CardHeader>
        <CardTitle>Total Responses: {count}</CardTitle>
        <CardDescription>
          <Progress value={count} className="mt-4" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <p className="font-bold">Goal</p>
        <p className="font-bold">100</p>
      </CardFooter>
    </Card>
  );
};

export default TotalCard;

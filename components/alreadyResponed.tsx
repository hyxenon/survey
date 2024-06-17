import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

const AlreadyResponed = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          Thank you for participating in our survey! Your responses will assist
          us in developing an analysis of how social media impacts students'
          academic performance.
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default AlreadyResponed;

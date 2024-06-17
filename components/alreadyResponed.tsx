import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const AlreadyResponed = () => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Thank you!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Your responses will assist us in developing an analysis of how social
          media impacts students' academic performance.
        </p>
      </CardContent>
    </Card>
  );
};

export default AlreadyResponed;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AnaylsyisWrapperProps {
  children: any;
  title: string;
}

const AnalysisWrapper = ({ children, title }: AnaylsyisWrapperProps) => {
  return (
    <Card className="w-[85%] shadow-2xl drop-shadow-sm">
      <CardHeader>
        <CardTitle className="font-bold text-[#064789]">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AnalysisWrapper;

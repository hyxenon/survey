import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@/components/ui/label";

type CardQuestionsProps = {
  questionTitle: string;
  questions: any[];
  checkbox?: boolean;
};

const CardQuestion = ({
  questionTitle,
  questions,
  checkbox,
}: CardQuestionsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{questionTitle}</CardTitle>
        <CardContent>
          <div className="mt-4">
            {checkbox ? (
              <div className="flex flex-col gap-4">
                {questions.map((data, index) => (
                  <div className="items-top flex space-x-4" key={index}>
                    <Checkbox id={data} />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={data}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {data}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                defaultValue="option-one"
                className="flex flex-col gap-4"
              >
                {questions.map((data, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem value={data} id={data} />
                    <Label htmlFor={data}>{data}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CardQuestion;

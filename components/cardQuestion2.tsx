import { useFormState } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type ItemType = {
  id: string;
  label: string;
};

type CardQuestionsProps = {
  questionTitle: string;
  isRadioGroup: boolean;
  questions: string[];
  form: any;
  name: string;
  items: ItemType[];
};

const CardQuestion2 = ({
  questionTitle,
  questions,
  isRadioGroup,
  form,
  name,
  items,
}: CardQuestionsProps) => {
  const { errors } = useFormState({ control: form.control });

  const hasError = errors[name] !== undefined;

  const cardClassName = `w-full max-w-[800px] ${
    hasError ? "border-red-200" : ""
  }`;
  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardContent>
          {isRadioGroup && (
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{questionTitle}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {questions.map((question, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem value={question} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {question}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!isRadioGroup && (
            <FormField
              control={form.control}
              name={name}
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">{questionTitle}</FormLabel>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={name}
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CardQuestion2;

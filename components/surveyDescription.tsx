"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useUser } from "@clerk/nextjs";

const SurveyDescription = () => {
  const { user } = useUser();

  return (
    <Card className="w-full max-w-[800px] relative">
      <div className="w-full h-[15px] top-0 bg-[#427AA1] absolute rounded-t-xl"></div>
      <CardHeader className="mt-4">
        <CardTitle className="text-[#064789] font-bold">
          Social Media Influence on Academic Performance
        </CardTitle>
        <CardContent className="p-0">
          <div className="mt-2 flex gap-2 flex-col">
            <p className="text-sm font-semibold">
              This survey aims to explore the relationship between social media
              usage and academic performance among students. By participating,
              you'll help us understand how platforms like Facebook, Instagram,
              and Twitter impact your study habits, time management, and overall
              academic success.
            </p>
            <p className="text-sm font-semibold">
              Your responses are crucial in shaping strategies to promote a
              healthy balance between social media engagement and educational
              achievement. Thank you for contributing to this important
              research!
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex gap-2 items-center mt-4">
            <Image
              alt="user logo"
              src={user?.imageUrl ? user.imageUrl : ""}
              className="w-[30px] h-[30px] rounded-full"
              width={40}
              height={40}
            />
            <div>
              <h1 className="text-sm">
                {user?.emailAddresses[0].emailAddress}
              </h1>
              <p className="text-sm">{user?.fullName}</p>
            </div>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default SurveyDescription;

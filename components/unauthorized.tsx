import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex items-center gap-6">
        <p className="font-semibold text-2xl">404</p>
        <div className="w-[1px] h-[50px] bg-gray-400"></div>
        <p className="">This page could not be found.</p>
      </div>
    </div>
  );
};

export default Unauthorized;

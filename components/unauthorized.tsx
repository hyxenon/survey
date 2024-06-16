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
    <div className="flex justify-center items-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Unauthorized Access</CardTitle>
          <CardDescription>
            Only Admin can proceed to this link.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <p>
            If you're not an admin, click{" "}
            <Link href={"/survey-form"} className="font-bold">
              here
            </Link>{" "}
            to return to the previous page.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;

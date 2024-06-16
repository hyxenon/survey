import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type NavbarProps = {
  isAdmin?: boolean;
  isInDashboard?: boolean;
};

const Navbar = ({ isAdmin, isInDashboard }: NavbarProps) => {
  return (
    <nav className="flex justify-between px-8 py-4 shadow-xl drop-shadow-2xl bg-[#064789]">
      <h1 className=" text-sm md:text-lg text-white font-bold">
        Group Social Media
      </h1>
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Button variant={"link"}>
            {isInDashboard ? (
              <Link href={"/survey-form"} className="text-white text-lg">
                Survey Form
              </Link>
            ) : (
              <Link href={"/dashboard"} className="text-white text-lg">
                Dashboard
              </Link>
            )}
          </Button>
        )}

        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

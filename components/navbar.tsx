import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-5 shadow-xl drop-shadow-2xl bg-[#064789]">
      <h1 className=" text-sm md:text-lg text-white font-bold">
        Group Social Media
      </h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Navbar;

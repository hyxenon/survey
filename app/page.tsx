"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      router.push("/survey-form");
    } else {
      console.log(pathname);
    }
  }, [pathname]);
  return <div></div>;
};

export default Home;

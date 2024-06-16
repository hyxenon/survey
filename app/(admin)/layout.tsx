"use client";
import Navbar from "@/components/navbar";
import Unauthorized from "@/components/unauthorized";
import { User } from "@/lib/types/User";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser(id: string) {
      const res = await fetch(`http://localhost:3000/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
      console.log(user?.email);
    }

    if (userId) {
      getUser(userId);
    }
  }, []);

  return (
    <div>
      {user?.role !== "admin" ? (
        <div>
          <Unauthorized />
        </div>
      ) : (
        <div>
          <Navbar />
          {children}
        </div>
      )}
    </div>
  );
}

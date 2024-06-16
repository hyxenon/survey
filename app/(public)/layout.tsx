"use client";
import Navbar from "@/components/navbar";
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
      const res = await fetch(`http://localhost:3000/api/user/${id}`);
      const data = await res.json();
      setUser(data);
      console.log(data);
    }

    if (userId) {
      getUser(userId);
    }

    console.log(userId);
  }, [userId]);

  return (
    <div>
      <Navbar isAdmin={user?.role === "admin"} isInDashboard={false} />
      {children}
    </div>
  );
}

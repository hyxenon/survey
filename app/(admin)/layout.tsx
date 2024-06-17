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
      try {
        const res = await fetch(`/api/user/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return (
    <div>
      {user?.role !== "admin" ? (
        <div>
          <Unauthorized />
        </div>
      ) : (
        <div>
          <Navbar isAdmin={true} isInDashboard={true} />
          <h1>{user?.email}</h1>
          {children}
        </div>
      )}
    </div>
  );
}

"use client";
import Loading from "@/components/Loading";
import Navbar from "@/components/navbar";
import Unauthorized from "@/components/unauthorized";
import { User } from "@/lib/types/User";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  if (loading) {
    return <Loading />;
  }
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;

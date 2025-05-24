"use client";

import React, { useEffect, useState } from "react";
import api from "@/utils/api"; // Make sure this is correctly configured with baseURL

const LoginInfo = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    setRole(role);

    if (token && userId) {
      api
        .get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);
  return (
    <div className="border p-4 rounded mb-4 bg-white">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">1. LOGIN</h3>
        {user ? (
          <div className="flex gap-2">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default LoginInfo;

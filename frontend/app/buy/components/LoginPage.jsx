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
    <div className="">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 tracking-wide">
          1. LOGIN
        </h3>
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
          Verified
        </span>
      </div>

      {user ? (
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-700 font-medium">
              {user.username}
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-1 text-sm text-gray-700 font-medium">
              {user.email}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-500 text-sm">Loading user info...</p>
      )}
    </div>
  );
};

export default LoginInfo;

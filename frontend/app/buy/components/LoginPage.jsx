"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
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
        <h3 className="text-[#878787] text-base font-medium mb-[6px] uppercase">
          <span className="bg-[#f0f0f0]  text-[#2874f0] text-[12px] text-[#2874f0] rounded-[2px] px-1.5 py-0.5  align-baseline mr-[15px]">
            1
          </span>
          LOGIN
          <Check className="text-[#2874f0] ml-2 inline font-semibold w-6 h-4" />
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

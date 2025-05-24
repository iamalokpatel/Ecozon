"use client";
import React from "react";

const LoginInfo = ({ user }) => {
  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="text-lg font-semibold">1. LOGIN</h3>
      <p>
        {user?.name || "Guest"} — {user?.phone || "Not Available"}
      </p>
    </div>
  );
};

export default LoginInfo;

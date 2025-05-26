"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [accessMessage, setAccessMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const role = localStorage.getItem("userRole");

    if (role !== "admin") {
      setAccessMessage("Unauthorized! Only Admin can access this page.");
      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (accessMessage) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)]  text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className="layout flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

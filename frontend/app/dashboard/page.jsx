"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasCheckedRef = useRef(false); // prevent double execution

  useEffect(() => {
    if (hasCheckedRef.current) return; // skip if already checked
    hasCheckedRef.current = true;

    const role = localStorage.getItem("userRole");

    if (role !== "admin") {
      alert("Unauthorized! Only Admin can access the Dashboard");
      router.push("/");
    } else {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
    </div>
  );
}

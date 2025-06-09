"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [accessMessage, setAccessMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)] text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex`}
      >
        <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {/* Hamburger / Close Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

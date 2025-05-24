"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/utils/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ local login state
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await api.post("/users/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // ✅ update UI
    window.dispatchEvent(new Event("authChange")); // ✅ notify others
    alert(`Successfully Logged Out`);
    router.push("/users/login");
  };

  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ✅ on initial load

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token); // ✅ update on login/logout
    };

    window.addEventListener("authChange", handleAuthChange); // ✅ listen

    return () => {
      window.removeEventListener("authChange", handleAuthChange); // ✅ cleanup
    };
  }, []);

  return (
    <nav className="w-full text-white h-20 sticky top-0 z-50 bg-[#0f1111] flex justify-between items-center px-4 border-b border-gray-600 font-[Montserrat]">
      <div className="flex items-center">
        <div
          className="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer mr-4"
          onClick={toggleMenu}
        >
          <span className="h-1 w-full bg-white rounded"></span>
          <span className="h-1 w-full bg-white rounded"></span>
          <span className="h-1 w-full bg-white rounded"></span>
        </div>
        <div className="flex cursor-pointer" onClick={handleClick}>
          <img
            src="/images/logo.png"
            className="bg-transparent w-12 rounded-full shadow-none"
            alt="Logo"
          />
          <p className="text-lg font-semibold flex mt-[6px]">Ecozon</p>
        </div>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-20 left-0 w-full bg-[#0f1111] flex flex-col items-center gap-4 py-4 md:flex md:static md:flex-row md:w-auto md:gap-8 md:bg-transparent md:py-0`}
      >
        <li className="hover:text-yellow-400">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/products">Products</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/orders">Orders</Link>
        </li>
        <li className="hover:text-yellow-400">
          <Link href="/cart">Cart</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="hover:text-yellow-400">
              <Link href="/users/login">Login</Link>
            </li>
            <li className="hover:text-yellow-400">
              <Link href="/users/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="hover:text-yellow-400">
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

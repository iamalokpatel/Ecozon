"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import api from "@/utils/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await api.post("/users/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserRole("");
    window.dispatchEvent(new Event("authChange"));
    alert(`Successfully Logged Out`);
    closeMenu();
    router.push("/users/login");
  };

  const handleClick = () => {
    router.push("/");
    closeMenu();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setUserRole(role || "");

    const handleAuthChange = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setUserRole(role || "");
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Close menu on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Helper for active link classes
  const linkClasses = (path) =>
    `hover:underline underline-offset-2 ${
      pathname === path ? "underline" : ""
    }`;

  return (
    <nav className="w-full text-[#212121] h-18 sticky top-0 z-50 bg-[#FFFFFF] flex justify-between items-center px-4 font-[Montserrat]">
      <div className="flex items-center">
        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer mr-4"
          onClick={toggleMenu}
        >
          <span className="h-1 w-full bg-black rounded"></span>
          <span className="h-1 w-full bg-black rounded"></span>
          <span className="h-1 w-full bg-black rounded"></span>
        </div>

        {/* Logo */}
        <div className="flex cursor-pointer" onClick={handleClick}>
          <img
            src="/images/logo.png"
            className="bg-transparent w-12 rounded-full shadow-none"
            alt="Logo"
          />
          <p className="text-lg font-semibold flex mt-[6px]">Ecozon</p>
        </div>
      </div>

      {/* Menu */}
      <ul
        ref={menuRef}
        className={`${
          isMenuOpen ? "block text-white !w-[50%] h-screen " : "hidden "
        } absolute top-20 left-0 w-full bg-[#0f1111] flex flex-col items-center gap-4 py-4 
          md:flex md:static md:flex-row md:w-auto md:gap-8 md:bg-transparent md:py-0`}
      >
        <li onClick={closeMenu}>
          <Link href="/" className={linkClasses("/")}>
            Home
          </Link>
        </li>

        {isLoggedIn && userRole === "admin" && (
          <li onClick={closeMenu}>
            <Link href="/dashboard" className={linkClasses("/dashboard")}>
              Dashboard
            </Link>
          </li>
        )}

        <li onClick={closeMenu}>
          <Link href="/products" className={linkClasses("/products")}>
            Products
          </Link>
        </li>

        {isLoggedIn && userRole === "user" && (
          <>
            <li onClick={closeMenu}>
              <Link href="/cart" className={linkClasses("/cart")}>
                Cart
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/address" className={linkClasses("/address")}>
                Address
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/orders" className={linkClasses("/orders")}>
                Orders
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <li onClick={closeMenu}>
              <Link href="/users/login" className={linkClasses("/users/login")}>
                Login
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link
                href="/users/register"
                className={linkClasses("/users/register")}
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              className="hover:underline underline-offset-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

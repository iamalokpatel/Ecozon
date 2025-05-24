"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-10 px-6 mt-10 shadow-inner ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Ecozon</h2>
          <p className="text-gray-600">
            Find your dream home with ease. Explore the best properties in the
            city.
          </p>
        </div>

        {/* Right Section */}
        <div>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Ecozon . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

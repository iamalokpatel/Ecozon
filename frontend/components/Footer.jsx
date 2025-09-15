"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="md:w-1/2 space-y-2">
          <h2 className="text-2xl font-bold text-gray-400">Ecozon</h2>
          <p className="text-gray-400">
            Find your dream home with ease. Explore the best properties in the
            city.
          </p>
        </div>
        <div>
          <ul className="space-y-2 text-white text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
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

      <div className=" w-fulltext-center mt-10 pt-6 text-gray-500 text-sm border-t border-[#454d5e] flex text-align justify-center">
        &copy; {new Date().getFullYear()} Ecozon . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

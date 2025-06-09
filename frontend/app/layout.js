// app/layout.js
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="layout">
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}

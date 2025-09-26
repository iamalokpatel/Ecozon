"use client"; // client component
import { usePathname } from "next/navigation";
import HomeFooter from "./HomeFooter";
import MainFooter from "./MainFooter";
import Script from "next/script";

export default function FooterController() {
  const pathname = usePathname();

  const renderFooter = () => {
    if (pathname === "/") {
      return <HomeFooter />;
    } else if (pathname.startsWith("/product")) {
      return <HomeFooter />;
    } else {
      return <MainFooter />;
    }
  };

  return (
    <>
      {renderFooter()}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </>
  );
}

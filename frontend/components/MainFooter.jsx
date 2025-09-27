"use client";
import React from "react";
import Link from "next/link";

const MainFooter = () => {
  return (
    <footer className="w-full pt-6">
      <div className="w-full h-auto bg-[#1f1f1f] text-white mt-2">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-6 md:px-12 lg:px-[60px] pt-10">
          {/* ABOUT */}
          <div className="flex flex-col">
            <div className="flex flex-col text-[#878787] text-[12px] mb-3">
              ABOUT
            </div>
            <Link
              href="/helpcentre?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Contact Us"
            >
              Contact Us
            </Link>
            <Link
              href="https://corporate.flipkart.net/corporate-home"
              className="HlWMPX"
              aria-label="About Us"
            >
              About Us
            </Link>
            <Link
              href="https://www.flipkartcareers.com/?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Careers"
            >
              Careers
            </Link>
            <Link
              href="http://stories.flipkart.com/?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Flipkart Stories"
            >
              Flipkart Stories
            </Link>
            <Link
              href="http://stories.flipkart.com/category/top-stories/news/"
              className="HlWMPX"
              aria-label="Press"
            >
              Press
            </Link>
            <Link
              href="/corporate-information"
              className="HlWMPX"
              aria-label="Corporate Information"
            >
              Corporate Information
            </Link>
          </div>

          {/* GROUP COMPANIES */}
          <div className="flex flex-col">
            <div className="text-[#878787] text-[12px] mb-3">
              GROUP COMPANIES
            </div>
            <Link
              href="https://www.myntra.com/"
              className="HlWMPX"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Myntra"
            >
              Myntra
            </Link>
            <Link
              href="https://www.cleartrip.com/"
              className="HlWMPX"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Cleartrip"
            >
              Cleartrip
            </Link>
            <Link
              href="https://www.shopsy.in"
              className="HlWMPX"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Shopsy"
            >
              Shopsy
            </Link>
          </div>

          {/* HELP */}
          <div className="flex flex-col">
            <div className="text-[#878787] text-[12px] mb-3">HELP</div>
            <Link
              href="/pages/payments"
              className="HlWMPX"
              aria-label="Payments"
            >
              Payments
            </Link>
            <Link
              href="/pages/shipping"
              className="HlWMPX"
              aria-label="Shipping"
            >
              Shipping
            </Link>
            <Link
              href="/helpcentre?catalog=55c9c6edb000002e002c1701&amp;view=CATALOG"
              className="HlWMPX"
              aria-label="Cancellation &amp; Returns"
            >
              Cancellation &amp; Returns
            </Link>
            <Link
              href="/helpcentre?catalog=55c9c8e2b0000023002c1702&amp;view=CATALOG"
              className="HlWMPX"
              aria-label="FAQ"
            >
              FAQ
            </Link>
          </div>

          {/* CONSUMER POLICY */}
          <div className="flex flex-col">
            <div className="text-[#878787] text-[12px] mb-3">
              CONSUMER POLICY
            </div>
            <Link
              href="/pages/returnpolicy?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Cancellation &amp; Returns"
            >
              Cancellation &amp; Returns
            </Link>
            <Link
              href="/pages/terms?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Terms Of Use"
            >
              Terms Of Use
            </Link>
            <Link
              href="/pages/paymentsecurity?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Security"
            >
              Security
            </Link>
            <Link
              href="/pages/privacypolicy?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Privacy"
            >
              Privacy
            </Link>
            <Link
              href="/sitemap?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Sitemap"
            >
              Sitemap
            </Link>
            <Link
              href="/pages/grievance-redressal-mechanism?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="Grievance Redressal"
            >
              Grievance Redressal
            </Link>
            <Link
              href="/pages/ewaste-compliance-tnc?otracker=footer_navlinks"
              className="HlWMPX"
              aria-label="EPR Compliance"
            >
              EPR Compliance
            </Link>
          </div>

          {/* MAIL + SOCIAL */}
          <div className="flex flex-col">
            <div className="text-[#878787] text-[12px] mb-3">Mail Us:</div>
            <div className="_1UkyFI">
              <p className="_1oQ-r6">Flipkart Internet Private Limited,</p>
              <p className="_1oQ-r6">Buildings Alyssa, Begonia &amp;</p>
              <p className="_1oQ-r6">Clove Embassy Tech Village,</p>
              <p className="_1oQ-r6">
                Outer Ring Road, Devarabeesanahalli Village,
              </p>
              <p className="_1oQ-r6">Bengaluru, 560103,</p>
              <p className="_1oQ-r6">Karnataka, India</p>
            </div>
            <div className="text-[#878787] text-[12px] my-3">Social:</div>
            <div className="flex items-center gap-2">
              <div className="_2l3nc-">
                <Link
                  href="https://www.facebook.com/flipkart"
                  aria-label="Facebook"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjkzMzEgMjFDMTcuOTAzNyAyMSAyMS45MzMxIDE2Ljk3MDYgMjEuOTMzMSAxMkMyMS45MzMxIDcuMDI5NDQgMTcuOTAzNyAzIDEyLjkzMzEgM0M3Ljk2MjU0IDMgMy45MzMxMSA3LjAyOTQ0IDMuOTMzMTEgMTJDMy45MzMxMSAxNi45NzA2IDcuOTYyNTQgMjEgMTIuOTMzMSAyMVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE2LjY4MzEgOC4yNUgxNS4xODMxQzE0LjU4NjQgOC4yNSAxNC4wMTQxIDguNDg3MDUgMTMuNTkyMSA4LjkwOTAxQzEzLjE3MDIgOS4zMzA5NyAxMi45MzMxIDkuOTAzMjYgMTIuOTMzMSAxMC41VjIxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05LjkzMzExIDEzLjVIMTUuOTMzMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K"
                    alt="Facebook"
                    width="24"
                    height="24"
                  />
                </Link>
              </div>
              <div className="_2l3nc-">
                <Link
                  href="https://www.twitter.com/flipkart"
                  aria-label="Twitter"
                >
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE4M18yMCkiPgo8cGF0aCBkPSJNMTMuNTQzNiAxMC42MTc5TDIwLjA5NzEgM0gxOC41NDQxTDEyLjg1MzcgOS42MTQ0OEw4LjMwODg3IDNIMy4wNjY4OUw5LjkzOTY0IDEzLjAwMjNMMy4wNjY4OSAyMC45OTA4SDQuNjE5OTRMMTAuNjI5MSAxNC4wMDU2TDE1LjQyODggMjAuOTkwOEgyMC42NzA4TDEzLjU0MzIgMTAuNjE3OUgxMy41NDM2Wk0xMS40MTY1IDEzLjA5MDRMMTAuNzIwMiAxMi4wOTQ0TDUuMTc5NTMgNC4xNjkxMUg3LjU2NDkxTDEyLjAzNjMgMTAuNTY1MUwxMi43MzI2IDExLjU2MTFMMTguNTQ0OCAxOS44NzQ4SDE2LjE1OTVMMTEuNDE2NSAxMy4wOTA4VjEzLjA5MDRaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE4M18yMCI+CjxyZWN0IHg9IjMuMDY2ODkiIHk9IjMiIHdpZHRoPSIxNy42MDM5IiBoZWlnaHQ9IjE4IiByeD0iMC4yIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
                    alt="Twitter"
                    width="24"
                    height="24"
                  />
                </Link>
              </div>
              <div className="_2l3nc-">
                <Link
                  href="https://www.youtube.com/flipkart"
                  aria-label="YouTube"
                >
                  <img
                    src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/YoutubeLogo-8425c4.svg"
                    alt="YouTube"
                    width="24"
                    height="24"
                  />
                </Link>
              </div>
              <div className="ml-1">
                <Link
                  href="https://www.instagram.com/flipkart"
                  aria-label="Instagram"
                >
                  <img
                    src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/InstagramLogo-43f906.svg"
                    alt="Instagram"
                    width="20"
                    height="20"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="flex flex-col">
            <div className="text-[#878787] text-[12px] mb-3">
              Registered Office Address:
            </div>
            <div>
              <p className="_1oQ-r6">Flipkart Internet Private Limited,</p>
              <p className="_1oQ-r6">Buildings Alyssa, Begonia &amp;</p>
              <p className="_1oQ-r6">Clove Embassy Tech Village,</p>
              <p className="_1oQ-r6">
                Outer Ring Road, Devarabeesanahalli Village,
              </p>
              <p className="_1oQ-r6">Bengaluru, 560103,</p>
              <p className="_1oQ-r6">Karnataka, India</p>
            </div>
          </div>
        </div>
        <div>
          {/* Bottom Section*/}
          <div className="border-t border-[#454d5e] py-[25px] mt-10 w-full flex flex-col lg:flex-row md:flex-col justify-between items-center gap-4 md:gap-2 px-4">
            {/* Left Section */}
            <div className="flex flex-row items-center justify-center gap-5 md:gap-20 text-xs px-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/sell-image-9de8ef.svg"
                  alt="Become a Seller"
                  width="13"
                  height="12"
                />
                <Link
                  href="https://seller.flipkart.com/?utm_source=fkwebsite&amp;utm_medium=websitedirect"
                  aria-label="Become a Seller"
                >
                  <span>Become a Seller</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/advertise-image-866c0b.svg"
                  alt="Advertise"
                  width="14"
                  height="14"
                />
                <Link href="https://brands.flipkart.com" aria-label="Advertise">
                  <span>Advertise</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/gift-cards-image-d7ff24.svg"
                  alt="Gift Cards"
                  width="13"
                  height="13"
                />
                <Link
                  href="/the-gift-card-store?otracker=footer_navlinks"
                  aria-label="Gift Cards"
                >
                  <span>Gift Cards</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/help-centre-image-c4ace8.svg"
                  alt="Help Center"
                  width="13"
                  height="13"
                />
                <Link
                  href="/helpcentre?otracker=footer_navlinks"
                  aria-label="Help Center"
                >
                  <span>Help Center</span>
                </Link>
              </div>
            </div>

            {/* Center Section */}
            <div className="flex text-xs text-center items-center justify-center gap-3">
              <span> © 2024-2026</span> <span>Flipkart.com</span>
            </div>

            {/* Right Section */}
            <div className="flex justify-center">
              <img
                src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg"
                alt="Payment methods"
                className="w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

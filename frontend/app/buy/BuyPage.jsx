"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import OrderSummary from "./components/OrderSummary";
import PriceDetails from "./components/PriceDetails";
import LoginPage from "./components/LoginPage";
import DeliveryAddress from "./components/DeliveryAddress";

const BuyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId");
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const [productsToOrder, setProductsToOrder] = useState([]);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(2);

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    const fetchData = async () => {
      try {
        if (mode === "single" && productId) {
          const res = await api.get(`/products/${productId}`);
          setProductsToOrder([{ product: res.data, quantity: 1 }]);
        } else if (mode === "cart") {
          const res = await api.get("/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProductsToOrder(res.data.items);
        }
      } catch {
        setError("Failed to fetch products");
      }
    };

    fetchData();
  }, [mode, productId]);

  const onQuantityChange = (index, newQty) => {
    const updated = [...productsToOrder];
    updated[index].quantity = newQty;
    setProductsToOrder(updated);

    if (mode === "cart") {
      api
        .post(
          "/cart/update",
          { productId: updated[index].product._id, quantity: newQty },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((err) => console.error("Cart update failed", err));
    }
  };

  const handleContinueToPayment = () => {
    if (!address) return alert("Please select your address");

    if (typeof window !== "undefined") {
      sessionStorage.setItem("checkoutItems", JSON.stringify(productsToOrder));
      sessionStorage.setItem("checkoutAddress", JSON.stringify(address));
    }

    router.push("/payments");
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3.5">
        {/* Step 1 - Login */}
        {step >= 1 && (
          <section className="rounded border border-gray-200 bg-white p-4 shadow-md">
            <LoginPage />
          </section>
        )}

        {/* Step 2 - Delivery Address */}
        {step >= 2 && (
          <section className="">
            <DeliveryAddress
              onSelect={(addr) => {
                setAddress(addr);
                setStep(3);
              }}
            />
          </section>
        )}

        {/* Step 3 - Order Summary */}
        {step >= 3 && (
          <section className="rounded space-y-4">
            <OrderSummary
              products={productsToOrder}
              onQuantityChange={onQuantityChange}
            />
            <div className="h-[80px] bg-[#fff] border-t border-[#f0f0f0] px-4 py-4 items-center">
              <span className="inline-flex items-center justify-center mt-2">
                For order confirmation click to continue...
              </span>
              <button
                className="w-50 bg-[#fb641b] text-[#fff] px-4 py-2.5 rounded cursor-pointer uppercase h-[48px] w-[200px] uppercase text-base font-medium float-right"
                onClick={handleContinueToPayment}
              >
                Continue
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Price Details */}
      <div className="sticky top-6 h-fit">
        {productsToOrder.length === 0 ? (
          <div className="p-4 bg-white border rounded">
            Loading price details...
          </div>
        ) : (
          <PriceDetails products={productsToOrder} />
        )}
      </div>
    </div>
  );
};

export default BuyPage;

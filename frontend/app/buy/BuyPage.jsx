"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import OrderSummary from "./components/OrderSummary";
import PriceDetails from "./components/PriceDetails";
import PaymentOptions from "@/app/buy/components/PaymentOptions";
import LoginPage from "./components/LoginPage";
import DeliveryAddress from "./components/DeliveryAddress";

const BuyPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId");

  const [productsToOrder, setProductsToOrder] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [step, setStep] = useState(2);

  const token = typeof window !== "undefined" && localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    if (mode === "single" && productId) {
      api
        .get(`/products/${productId}`)
        .then((res) => setProductsToOrder([{ product: res.data, quantity: 1 }]))
        .catch(() => setError("Failed to fetch product"));
    } else if (mode === "cart") {
      api
        .get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProductsToOrder(res.data.items))
        .catch(() => setError("Failed to fetch cart items"));
    }
  }, [mode, productId]);

  const handleConfirmOrder = async () => {
    if (!address) return alert("Please select your address");

    try {
      const payload = {
        mode, // "single" or "cart"
        address,
        paymentMethod,
      };

      if (mode === "single" && productId) {
        payload.productId = productId;
      }

      await api.post("/orders/buy", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Order placed successfully!");
      setTimeout(() => router.push("/orders"), 1200);
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong!");
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        {/* Step 1: Login */}
        {step >= 1 && (
          <section className="rounded p-4 bg-white">
            <LoginPage />
          </section>
        )}

        {/* Step 2: Address */}
        {step >= 2 && (
          <section className="rounded p-4 bg-white">
            <h2 className="text-lg font-bold mb-2">2. Delivery Address</h2>
            <DeliveryAddress onSelect={(address) => setAddress(address._id)} />
            <button
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded"
              onClick={() => {
                if (address) setStep(3);
                else alert("Please select an address");
              }}
            >
              Deliver Here
            </button>
          </section>
        )}

        {/* Step 3: Order Summary */}
        {step >= 3 && (
          <section className="border rounded p-4 bg-white">
            <h2 className="text-lg font-bold mb-2">3. Order Summary</h2>
            <OrderSummary
              products={productsToOrder}
              onQuantityChange={(index, newQty) => {
                const updated = [...productsToOrder];
                updated[index].quantity = newQty;
                setProductsToOrder(updated);
              }}
            />
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setStep(4)}
            >
              Continue to Payment
            </button>
          </section>
        )}

        {/* Step 4: Payment Options */}
        {step >= 4 && (
          <section className="border rounded p-4 bg-white">
            <h2 className="text-lg font-bold mb-2">4. Payment Options</h2>
            <PaymentOptions
              selectedOption={paymentMethod}
              setSelectedOption={setPaymentMethod}
            />
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
            {success && <p className="text-green-600 mt-4">{success}</p>}
          </section>
        )}
      </div>

      {/* Sticky Price Summary */}
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

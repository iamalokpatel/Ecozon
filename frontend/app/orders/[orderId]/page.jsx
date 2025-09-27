"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Image from "next/image";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please login again.");
        }

        const { data } = await api.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!data) {
          throw new Error("Order data not found.");
        }

        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong while fetching the order."
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="min-h-screen max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-60 bg-white rounded p-5 shadow-sm"></div>
            <div className="h-40 bg-white rounded p-5 shadow-sm"></div>
          </div>
          <div className="space-y-6">
            <div className="h-60 bg-white rounded p-5 shadow-sm"></div>
            <div className=" h-40 bg-white rounded p-5 shadow-sm"></div>
          </div>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!order) {
    return <p className="text-center text-red-500 py-10">Order not found.</p>;
  }

  const address = order.address;

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white p-4 shadow-sm">
            <h2 className="text-md font-semibold mb-3">Order Status</h2>
            <ol className="relative border-l border-gray-200 ml-2">
              <li className="mb-3 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -left-3 ring-4 ring-white"></span>
                <h4 className="font-base">Order Confirmed</h4>
                <p className="text-xs text-gray-600">
                  Your order was placed on{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
              </li>
              <li className="mb-3 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-base">Shipped</h3>
                <p className="text-xs text-gray-600">Expected soon</p>
              </li>
              <li className="mb-3 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-base">Out for Delivery</h3>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-base">Delivered</h3>
              </li>
            </ol>
          </div>
          {/* Items */}
          <div className="bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-[14px]">
              OrderId:{" "}
              <span className="text-sm text-yellow-700">[ {order._id} ]</span>
            </h2>

            <ul className="divide-y divide-gray-200">
              {order.items?.length > 0 ? (
                order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.product?.image || "/placeholder.png"}
                        alt={item.product?.title || "Product Image"}
                        width={64}
                        height={64}
                        fill
                        priority
                        className="rounded object-cover shadow-[0_2px_6px_0_rgba(0,0,0,0.15)]"
                      />
                      <div>
                        <p className="font-medium">{item.product?.title}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-800">
                      ₹
                      {(
                        (item.product?.price || 0) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No items found in this order.
                </p>
              )}
            </ul>
          </div>
        </div>

        {/* Right Section - Address & Price */}
        <div className="space-y-6">
          {/* Price Details */}
          <div className=" bg-white  p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-[11px]">Price Details</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{order.totalPrice?.toLocaleString() || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="capitalize">
                  {order.paymentMethod || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status</span>
                <span className="capitalize">
                  {order.paymentStatus || "pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className="capitalize text-yellow-600">
                  {order.status || "processing"}
                </span>
              </div>
              <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                <span>Total Amount</span>
                <span className="text-indigo-600 ">
                  ₹{order.totalPrice?.toLocaleString() || "0"}
                </span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-4 shadow-sm">
            <h2 className="text-md font-semibold">Delivery Details</h2>
            {address ? (
              <div className="text-gray-700">
                <p className="font-medium">{address.fullName}</p>
                <p>
                  {address.addressLine}, {address.city}
                </p>
                <p className="text-sm ">
                  {address.state} - {address.pincode}
                </p>
                <p className="text-sm ">Phone: {address.mobile}</p>
              </div>
            ) : (
              <p className="text-red-500">No address found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

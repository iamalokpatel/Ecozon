"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.get(`/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!order)
    return <p className="text-center text-red-500 py-10">Order not found.</p>;

  const address = order.address;

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Items in this order</h2>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.image || "/placeholder.png"}
                      alt={item.product?.title}
                      className="w-16 h-16 rounded object-cover shadow-[0_2px_6px_0_rgba(0,0,0,0.15)]"
                    />
                    <div>
                      <p className="font-medium">{item.product?.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Status */}
          <div className="bg-white rounded p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <ol className="relative border-l border-gray-200 ml-3">
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-medium">Order Confirmed</h3>
                <p className="text-sm text-gray-600">
                  Your order was placed on{" "}
                  {new Date(order.createdAt).toDateString()}
                </p>
              </li>
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-medium">Shipped</h3>
                <p className="text-sm text-gray-600">Expected soon</p>
              </li>
              <li className="mb-6 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-medium">Out for Delivery</h3>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full -left-3 ring-4 ring-white"></span>
                <h3 className="font-medium">Delivered</h3>
              </li>
            </ol>
          </div>
        </div>

        {/* Right Section - Address & Price */}
        <div className="space-y-6">
          {/* Address */}
          <div className="bg-white rounded p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Delivery Details</h2>
            {address ? (
              <div className="text-gray-700">
                <p className="font-medium">{address.fullName}</p>
                <p>
                  {address.addressLine}, {address.city}
                </p>
                <p>
                  {address.state} - {address.pincode}
                </p>
                <p className="text-sm mt-1">Phone: {address.mobile}</p>
              </div>
            ) : (
              <p className="text-red-500">No address found.</p>
            )}
          </div>

          {/* Price Details */}
          <div className="bg-white rounded p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Price Details</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-gray-200 pt-2">
                <span>Total Amount</span>
                <span className="text-indigo-600">
                  ₹{order.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

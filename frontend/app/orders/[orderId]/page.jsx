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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  const address = order.address;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 mb-12">
      <h1 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
        Order #{order._id}
      </h1>

      <div className="flex flex-col space-y-2 text-gray-700">
        <p>
          Status:{" "}
          <span className="font-semibold text-indigo-600">{order.status}</span>
        </p>
        <p>
          Payment: <span className="capitalize">{order.paymentMethod}</span> (
          <span
            className={`font-semibold ${
              order.paymentStatus === "paid"
                ? "text-green-600"
                : order.paymentStatus === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {order.paymentStatus}
          </span>
          )
        </p>
        <p className="text-lg font-semibold mt-2">
          Total Price: ₹{order.totalPrice.toLocaleString()}
        </p>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3">
          Shipping Address
        </h2>
        {address ? (
          <p className="text-gray-800">
            {address.fullName || "N/A"}
            <br />
            {address.addressLine || "N/A"}, {address.city || "N/A"}
            <br />
            {address.state || "N/A"} - {address.pincode || "N/A"}
            <br />
            Phone: {address.mobile || "N/A"}
          </p>
        ) : (
          <p className="text-red-500">Shipping address not available.</p>
        )}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3">
          Items
        </h2>
        <ul className="divide-y divide-gray-200">
          {order.items.map((item, index) => (
            <li
              key={item._id || index}
              className="flex justify-between items-center py-3"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {item.product?.title || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-gray-900">
                ₹
                {item.product
                  ? (item.product.price * item.quantity).toLocaleString()
                  : "0"}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

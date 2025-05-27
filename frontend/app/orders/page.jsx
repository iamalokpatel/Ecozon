"use client";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [accessMessage, setAccessMessage] = useState("");
  const hasCheckedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
      setAccessMessage("Only users can access this page.");
      setTimeout(() => {
        router.push("/users/login");
      }, 2000);
      return;
    }

    if (role !== "user") {
      setAccessMessage("Only users can access this page.");
      setTimeout(() => {
        router.back(); // Redirect to previous page after 3 seconds
      }, 2000);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (accessMessage) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)]  text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Products Ordered
                </h3>
                <ul className="space-y-1">
                  {order.items.map((item) => (
                    <li key={item._id} className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {item.product?.title}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-0.5 rounded-full">
                        Qty: {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-700 mb-1">
                <strong className="font-semibold text-gray-800">
                  Total Price:
                </strong>{" "}
                ₹{order?.totalPrice}
              </p>

              <p className="text-gray-700 mb-1">
                <strong className="font-semibold text-gray-800">
                  Shipping Address:
                </strong>{" "}
                {typeof order.address === "string"
                  ? order.address
                  : `${order.address.fullName}, ${order.address.addressLine}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}, Ph: ${order.address.mobile}`}
              </p>

              <p className="text-gray-700">
                <strong className="font-semibold text-gray-800">
                  Ordered on:
                </strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;

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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-4 mb-4 bg-white shadow"
          >
            <div className="flex gap-2">
              <p>
                <strong>Products :</strong>
              </p>
              <ul className="list-disc list-inside flex gap-4">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.product?.title} (Qty: {item.quantity})
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong>Price:</strong> ₹{order?.totalPrice}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {typeof order.address === "string"
                ? order.address
                : `${order.address.fullName}, ${order.address.addressLine}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}, Ph: ${order.address.mobile}`}
            </p>

            <p>
              <strong>Ordered on:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersPage;

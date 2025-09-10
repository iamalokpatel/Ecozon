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
        router.back();
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
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)] text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mb-12">
      <h2 className="text-xl font-bold tracking-wide text-center text-gray-800 mb-10 uppercase relative after:content-[''] after:block after:w-20 after:h-1 after:bg-black after:mx-auto after:mt-2">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            try {
              const product = order.items[0]?.product;
              return (
                <div
                  key={order._id}
                  onClick={() => router.push(`/orders/${order._id}`)}
                  className="bg-white border border-gray-200 shadow-md rounded p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-full flex justify-between items-start space-x-4">
                    <div className="relative w-20 h-20">
                      <img
                        src={product?.image || "/placeholder.png"}
                        alt={product?.name || "Product Image"}
                        className="w-20 h-20 object-cover rounded"
                      />
                      {order.items.length > 1 && (
                        <div className="absolute top-16 left-2 bg-white text-xs px-2 py-0.5 rounded shadow">
                          +{order.items.length - 1} more
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between ml-8 text-base text-gray-600 gap-1">
                      <div className="font-medium">
                        {product?.title || "No product title"}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 whitespace-nowrap">
                      ₹{order.totalPrice}
                    </div>
                    <div className="text-sm text-gray-700 whitespace-nowrap">
                      Status:{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded-lg text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            } catch (err) {
              console.error("Error rendering order:", order._id, err);
              return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;

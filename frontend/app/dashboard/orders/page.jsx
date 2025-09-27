"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true); // new state
  const router = useRouter();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
        setTotal(res.data.total);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setUnauthorized(true);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false); // stop loading once API call is done
      }
    };

    fetchAllOrders();
  }, []);

  if (unauthorized) {
    return (
      <p className="text-center text-red-600 text-xl mt-8">
        Unauthorized: Admins only
      </p>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl w-full mx-auto p-6">
        <div className="flex flex-row mb-6 text-xl font-semibold text-gray-800">
          Total Orders:
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 shadow-md rounded p-6 animate-pulse"
            >
              <div className="w-full flex justify-around items-start space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1 flex ml-8">
                  <div className="h-4 bg-gray-200 rounded w-2/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-14"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
      <p className="mb-6 text-xl font-semibold text-gray-800">
        Total Orders: <span className="text-blue-600 font-bold">{total}</span>
      </p>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            try {
              const product = order.items[0]?.product;
              return (
                <div
                  key={order._id}
                  className="bg-white border border-gray-200 shadow-md rounded p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="w-full flex justify-between items-start space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={product?.image || "/placeholder.png"}
                        alt={product?.name || "Product Image"}
                        height={80}
                        width={80}
                        className="object-cover rounded"
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
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          order.status === "Delivered"
                            ? "text-green-800"
                            : order.status === "Cancelled"
                            ? "text-red-800"
                            : "text-yellow-800"
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

export default AdminDashboard;

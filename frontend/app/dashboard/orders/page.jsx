"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [unauthorized, setUnauthorized] = useState(false);
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

  return (
    <>
      <div className="max-w-6xl w-full mx-auto p-6">
        <p className="mb-6 text-xl font-semibold text-gray-800">
          Total Orders: <span className="text-blue-600 font-bold">{total}</span>
        </p>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-lg">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl p-6 mb-6 bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-lg font-medium text-gray-800 mb-2">
                <strong>User:</strong> {order.user?.username}
              </p>

              <div className="mt-4">
                <p className="text-gray-700 font-semibold mb-2">Items:</p>
                <div className="grid gap-4 pl-4">
                  <ol className="list-decimal ml-5 flex gap-6">
                    {order.items?.map((item, index) => (
                      <li key={index} className="p-3 rounded-lg">
                        <p>
                          <span className="font-semibold">Product:</span>{" "}
                          {item.product?.title}
                        </p>
                        <p>
                          <span className="font-semibold">Price:</span> ₹
                          {item.product?.price}
                        </p>
                        <p>
                          <span className="font-semibold"> Quantity:</span>{" "}
                          {item.quantity}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-4 text-gray-700">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address?.address}, {order.address?.city},{" "}
                  {order.address?.state} - {order.address?.pincode}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

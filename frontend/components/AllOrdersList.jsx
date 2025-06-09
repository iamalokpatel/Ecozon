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
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <p className="mb-4 text-lg">
          Total Orders: <strong>{total}</strong>
        </p>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 mb-4 bg-white shadow"
            >
              <p>
                <strong>User:</strong> {order.user?.name} ({order.user?.email})
              </p>
              <p>
                <strong>Product:</strong> {order.product?.title}
              </p>
              <p>
                <strong>Price:</strong> ₹{order.product?.price}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

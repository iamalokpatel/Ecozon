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
                <strong>User:</strong> {order.user?.username}
              </p>

              <div className="mt-2">
                <strong>Items:</strong>
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="mb-2 pl-4 border-l-2 border-gray-300"
                  >
                    <p>
                      <strong>Product:</strong> {item.product?.title}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.product?.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <p>
                <strong>Address:</strong> {order.address?.address},
                {order.address?.city}, {order.address?.state} -
                {order.address?.pincode}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await api.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        All Users
      </h2>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {user.username}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-600">
              <strong className="text-gray-700">Email:</strong> {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

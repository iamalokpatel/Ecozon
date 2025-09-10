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
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold tracking-wide text-center text-gray-800 mb-10 uppercase relative after:content-[''] after:block after:w-16 after:h-1 after:bg-black after:mx-auto after:mt-2">
        All Users
      </h2>

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white w-auto border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow p-5"
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

"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const AllUsersPage = () => {
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
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {users.map((user) => (
        <div key={user._id} className="p-4 border mb-2 bg-white shadow rounded">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllUsersPage;

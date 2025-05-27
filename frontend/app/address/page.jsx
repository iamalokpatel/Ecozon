"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [accessMessage, setAccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
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

        const res = await api.get("/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(res.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleEdit = (id) => {
    router.push(`/address/edit/${id}`);
  };

  const handleAddNew = () => {
    router.push("/address/add");
  };

  if (accessMessage) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.25)] text-center text-red-600 font-semibold text-lg">
        {accessMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          My Addresses
        </h2>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses found.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="relative border rounded-xl p-4 shadow-sm bg-gray-50"
              >
                <button
                  onClick={() => handleEdit(address._id)}
                  className="absolute top-3 right-3 text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  aria-label={`Edit address of ${address.fullName}`}
                >
                  Edit
                </button>
                <div className="flex gap-2">
                  <p className="font-semibold text-lg">{address.fullName}</p>
                  <p>Home</p>
                  <p>{address.mobile}</p>
                </div>
                <p>
                  {address.addressLine}, {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressList;

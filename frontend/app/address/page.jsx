"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          My Addresses
        </h2>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses found.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="relative border rounded-xl p-4 shadow-sm bg-gray-50"
              >
                {/* Edit button at top-right */}
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
                {/* {address.landmark && <p>Landmark: {address.landmark}</p>} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressList;

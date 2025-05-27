"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const DeliveryAddress = ({ onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
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

  const handleSelect = (address) => {
    setSelectedAddressId(address._id);
    onSelect?.(address); // Call parent handler
  };

  const handleAddNew = () => {
    router.push("/address/add");
  };

  return (
    <div className="space-y-4">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500">No addresses found.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address._id}
            className={`relative border rounded-xl p-4 shadow-sm cursor-pointer transition 
              ${
                selectedAddressId === address._id
                  ? "border-green-500 bg-green-50"
                  : "bg-gray-50 hover:border-gray-400"
              }`}
            onClick={() => handleSelect(address)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(address._id);
              }}
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
        ))
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
  );
};

export default DeliveryAddress;

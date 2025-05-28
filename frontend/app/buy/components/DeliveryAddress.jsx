"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";

const DeliveryAddress = ({ onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract mode and productId from URL
  const mode = searchParams.get("mode") || "cart";
  const productId = searchParams.get("productId");

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
    let returnTo = `/buy?mode=${mode}`;
    if (mode === "single" && productId) {
      returnTo += `&productId=${productId}`;
    }

    router.push(`/address/edit/${id}?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleAddNew = () => {
    let returnTo = `/buy?mode=${mode}`;
    if (mode === "single" && productId) {
      returnTo += `&productId=${productId}`;
    }

    router.push(`/address/add?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleSelect = (address) => {
    setSelectedAddressId(address._id);
    onSelect?.(address);
  };

  return (
    <div className="space-y-5">
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500">No addresses found.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address._id}
            className={`relative p-5 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm border-2 group
            ${
              selectedAddressId === address._id
                ? "border-green-500 bg-green-50 ring-2 ring-green-400/30"
                : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-md"
            }`}
            onClick={() => handleSelect(address)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(address._id);
              }}
              className="absolute top-4 right-4 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              Edit
            </button>

            <div className="flex flex-col gap-1 text-gray-800">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-lg font-bold">{address.fullName}</p>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  Home
                </span>
                <span className="text-sm">{address.mobile}</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {address.addressLine}, {address.city}, {address.state} –{" "}
                {address.pincode}
              </p>
            </div>
          </div>
        ))
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-md transition duration-200"
        >
          + Add New Address
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddress;

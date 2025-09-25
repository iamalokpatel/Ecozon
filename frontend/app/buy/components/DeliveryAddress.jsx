"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";

const DeliveryAddress = ({ onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [confirmedAddress, setConfirmedAddress] = useState(null); // ✅ new
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode") || "cart";
  const productId = searchParams.get("productId");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/address", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const navigateTo = (path) => {
    let returnTo = `/buy?mode=${mode}`;
    if (productId) returnTo += `&productId=${productId}`;
    router.push(`${path}?returnTo=${encodeURIComponent(returnTo)}`);
  };

  // ✅ Agar confirm ho gaya hai toh sirf wahi address show karo
  if (confirmedAddress) {
    return (
      <div className="p-4 rounded border border-green-500 bg-green-50 relative">
        <button
          onClick={() => setConfirmedAddress(null)} // change option
          className="absolute top-3 right-3 text-xs text-blue-500 hover:text-blue-800"
        >
          Change
        </button>
        <div className="flex flex-col gap-1 text-gray-800">
          <div className="flex items-center gap-3 mb-1">
            <p className="text-lg font-bold">{confirmedAddress.fullName}</p>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Home
            </span>
            <span className="text-sm">{confirmedAddress.mobile}</span>
          </div>
          <p className="text-sm text-gray-700">
            {confirmedAddress.addressLine}, {confirmedAddress.city},{" "}
            {confirmedAddress.state} – {confirmedAddress.pincode}
          </p>
        </div>
      </div>
    );
  }

  // ✅ Normal address selection UI
  return (
    <div>
      {addresses.length === 0 ? (
        <p className="text-center text-gray-500">No addresses found.</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address._id}
            className={`relative p-4 mb-3 w-full rounded border cursor-pointer transition-all duration-200 ${
              selectedAddressId === address._id
                ? "border-blue-600 bg-blue-50 ring-1 ring-blue-400/30"
                : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-md"
            }`}
            onClick={() => setSelectedAddressId(address._id)}
          >
            {/* Edit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateTo(`/address/edit/${address._id}`);
              }}
              className="absolute top-3 right-3 text-xs text-blue-500 hover:text-blue-800"
            >
              Edit
            </button>

            {/* Address Info */}
            <div className="flex flex-col gap-1 text-gray-800">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-lg font-bold">{address.fullName}</p>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  Home
                </span>
                <span className="text-sm">{address.mobile}</span>
              </div>
              <p className="text-sm text-gray-700">
                {address.addressLine}, {address.city}, {address.state} –{" "}
                {address.pincode}
              </p>
            </div>

            {/* Deliver Here Button (only for selected address) */}
            {selectedAddressId === address._id && (
              <div className="mt-3">
                <button
                  className="w-full bg-orange-600 text-white px-4 py-2.5 rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmedAddress(address); // ✅ confirm address
                    onSelect?.(address);
                  }}
                >
                  Deliver Here
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Add new address */}
      <div className="text-center mt-2.5">
        <button
          onClick={() => navigateTo("/address/add")}
          className="w-full bg-white shadow px-6 py-3 rounded"
        >
          <p className="font-semibold text-blue-500 hover:text-blue-800">
            + Add New Address
          </p>
        </button>
      </div>
    </div>
  );
};

export default DeliveryAddress;

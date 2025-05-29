"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/utils/api";

const AddAddress = () => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressline, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/address/add",
        {
          fullName: fullname,
          mobile,
          pincode,
          addressLine: addressline,
          city,
          state,
          landmark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(returnTo || "/address");
    } catch (error) {
      console.error("Failed to add address:", error);
      alert("Error adding address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="Address Line"
            value={addressline}
            onChange={(e) => setAddressLine(e.target.value)}
            className="w-full p-2 border rounded-xl"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border rounded-xl"
          />
          <input
            type="text"
            placeholder="Landmark (optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full p-2 border rounded-xl"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;

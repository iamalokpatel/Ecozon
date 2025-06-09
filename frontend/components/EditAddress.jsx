// components/EditAddress.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import api from "@/utils/api";

const EditAddress = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/address/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.address;
        if (data) {
          setFullname(data.fullName || "");
          setMobile(data.mobile || "");
          setPincode(data.pincode || "");
          setAddressLine(data.addressLine || "");
          setCity(data.city || "");
          setState(data.state || "");
          setLandmark(data.landmark || "");
        } else {
          alert("Address not found.");
          router.push(returnTo || "/buy");
        }
      } catch (error) {
        console.error("Failed to fetch address:", error);
        alert("Failed to load address data.");
      }
    };

    if (id) fetchAddress();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/address/${id}`,
        {
          fullName: fullname,
          mobile,
          pincode,
          addressLine,
          city,
          state,
          landmark,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push(returnTo || "/address");
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Error updating address.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Address deleted successfully.");
      router.push(returnTo || "/address");
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Error deleting address.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Address
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
            value={addressLine}
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

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Update Address
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Delete Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;

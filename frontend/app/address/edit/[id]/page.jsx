"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import api from "@/utils/api";

const EditAddress = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo"); // ✅ Safe way
  const { id } = useParams();

  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");

  // Fetch address data on mount to prefill form
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/address/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.address;

        setFullname(data.fullName || "");
        setMobile(data.mobile || "");
        setPincode(data.pincode || "");
        setAddressLine(data.addressLine || "");
        setCity(data.city || "");
        setState(data.state || "");
        setLandmark(data.landmark || "");
      } catch (error) {
        console.error("Failed to fetch address:", error);
        alert("Failed to load address data.");
      }
    };

    fetchAddress();
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ✅ Redirect back after success
      if (returnTo) {
        router.push(returnTo); // go back to Buy page with original params
      } else {
        router.push("/buy"); // fallback
      }
    } catch (error) {
      console.error("Failed to update address:", error);
      alert("Error updating address.");
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Update Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;

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
    <div className="min-h-screen py-4 px-4">
      <div className="max-w-6xl mx-auto  p-4">
        <h2 className=" text-xl font-bold tracking-wide text-center text-gray-800 mb-10 uppercase relative after:content-[''] after:block after:w-20 after:h-1 after:bg-black after:mx-auto after:mt-2">
          Manage Address
        </h2>

        {addresses.length === 0 ? (
          <p className="text-center text-gray-500">No addresses found.</p>
        ) : (
          <div className="">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="relative bg-[#FFFFFF] gap-2 mb-3 w-full h-32 border border-gray-200 shadow-md rounded p-8 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <button
                  onClick={() => handleEdit(address._id)}
                  className="absolute top-4 right-5 text-blue-600 hover:text-blue-800 text-xs cursor-pointer"
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
        <div className="text-center border border-gray-300 mt-4 w-full">
          <button
            onClick={handleAddNew}
            className=" text-blue-500 px-6 py-3 rounded-lg hover:text-blue-800 transition font-semibold  uppercase cursor-pointer"
          >
            + Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressList;

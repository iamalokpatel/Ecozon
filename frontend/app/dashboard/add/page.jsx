"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/utils/api";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("choose");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error first
    setCategoryError("");

    // Validate category
    if (!category || category === "choose") {
      setCategoryError("Please select a valid category.");
      return;
    }

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("user", userId);
    formData.append("image", image);

    try {
      await api.post("/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value !== "choose") setCategoryError("");
              }}
              className={`appearance-none w-full p-2 border ${
                categoryError ? "border-red-500" : "border-gray-300"
              } rounded-xl focus:outline-none focus:ring-2 ${
                categoryError ? "focus:ring-red-500" : "focus:ring-blue-500"
              } bg-white`}
              required
            >
              <option value="">Choose Category</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptop">Laptop</option>
              <option value="earbuds">Earbuds</option>
              <option value="earphone">Earphone</option>
              <option value="watch">Watch</option>
              <option value="projector">Projector</option>
              <option value="camera">Camera</option>
              <option value="projector">Projector</option>
              <option value="speaker">Speaker</option>
              <option value="electronic">Electronic</option>
              <option value="fashion">Fashion</option>
              <option value="others">Others</option>
            </select>
            {categoryError && (
              <p className="text-red-500 text-sm mt-1">{categoryError}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-46 p-2 text-sm text-gray-700 border-gray-300 rounded-lg shadow-sm"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={160}
              height={160}
              quality={50}
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-xl border mt-2"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;

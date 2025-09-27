"use client";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditProduct = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const router = useRouter();
  const { id } = React.use(params);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setProduct(data);
        setTitle(data.title);
        setCategory(data.category);
        setSubtitle(data.subtitle);
        setDescription(data.description);
        setPrice(data.price);
        setPreview(data.image);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("price", price);
      if (image) formData.append("image", image);

      await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      router.push(`/products`);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/products");
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading product...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded shadow-md my-9">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Edit Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 p-2 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full p-[6px] pl-2 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Choose Category</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptop">Laptop</option>
              <option value="earbuds">Earbuds</option>
              <option value="earphone">Earphone</option>
              <option value="watch">Watch</option>
              <option value="camera">Camera</option>
              <option value="projector">Projector</option>
              <option value="speaker">Speaker</option>
              <option value="electronic">Electronic</option>
              <option value="fashion">Fashion</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full mt-2 p-2 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-2 text-sm p-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 text-sm  border-gray-300 rounded-lg shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 p-1 w-50 pl-2 text-sm border-gray-300 rounded-lg shadow-sm resize-none"
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                width={128}
                height={128}
                quality={50}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="mt-3 object-cover border rounded-md shadow "
              />
            ) : (
              <p className="text-sm text-gray-400 mt-2">No image selected</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-between mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-3 bg-[#FF3131] text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

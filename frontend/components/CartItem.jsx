"use client";

import React from "react";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-5 mb-4 flex flex-col md:flex-row items-center md:items-start justify-between border border-gray-100">
      {/* Left: Image & Details */}
      <div className="flex items-center space-x-4 w-full md:w-2/3">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg border border-gray-200"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition-colors">
            {item.product.title}
          </h4>
          <p className="text-gray-500 text-sm mt-1">
            Seller: <span className="font-medium">BestDeals</span>
          </p>
          <p className="text-green-600 font-bold text-lg mt-2">
            ₹{item.product.price}
          </p>
          <p className="text-gray-400 text-xs line-through">
            M.R.P ₹{(item.product.price * 1.2).toFixed(0)}
          </p>
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded mt-2">
            20% OFF
          </span>
        </div>
      </div>

      {/* Right: Quantity & Actions */}
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div className="flex items-center border border-gray-200 rounded">
          <button
            onClick={() => onDecrease(item.product._id)}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition"
          >
            −
          </button>
          <span className="px-4 py-1 font-medium">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item.product._id)}
            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onRemove(item.product._id)}
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

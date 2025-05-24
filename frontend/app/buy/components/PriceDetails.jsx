"use client";
import React from "react";

const PriceDetails = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p className="text-gray-500">No items to display in summary.</p>
      </div>
    );
  }

  const calculateTotals = () => {
    let totalPrice = 0;
    let discount = 0;
    const platformFee = 3;

    items.forEach(({ product, quantity }) => {
      const price = product.price * quantity;
      totalPrice += price;
      discount += price * 0.8;
    });

    const finalAmount = totalPrice - discount + platformFee;

    return {
      totalPrice,
      discount,
      platformFee,
      finalAmount,
      savings: discount,
    };
  };

  const { totalPrice, discount, platformFee, finalAmount, savings } =
    calculateTotals();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Price Details
      </h2>
      <div className="space-y-2 text-gray-600 text-sm">
        <div className="flex justify-between">
          <span>
            Price ({items.reduce((acc, item) => acc + item.quantity, 0)} item
            {items.length > 1 ? "s" : ""})
          </span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">− ₹{discount}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
      </div>

      <div className="border-t pt-4 mt-4 flex justify-between font-bold text-base text-gray-800">
        <span>Total Amount</span>
        <span>₹{finalAmount}</span>
      </div>

      <p className="text-sm text-green-700 mt-2">
        You will save ₹{savings} on this order
      </p>
    </div>
  );
};

export default PriceDetails;

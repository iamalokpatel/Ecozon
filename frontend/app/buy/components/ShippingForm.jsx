"use client";
export default function ShippingForm({ address, setAddress }) {
  return (
    <div className="mt-4">
      <label className="block font-semibold mb-1">Shipping Address</label>
      <textarea
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter your full address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  );
}

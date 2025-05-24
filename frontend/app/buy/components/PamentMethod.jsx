"use client";
export default function PaymentMethod({ method, setMethod }) {
  return (
    <div className="mt-4">
      <label className="block font-semibold mb-1">Payment Method</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          Cash on Delivery
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="online"
            checked={method === "online"}
            onChange={() => setMethod("online")}
          />
          Online (Coming soon)
        </label>
      </div>
    </div>
  );
}

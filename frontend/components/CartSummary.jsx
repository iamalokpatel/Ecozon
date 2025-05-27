const CartSummary = ({ items }) => {
  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // Optional: tax, discount etc.
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;

  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full text-gray-800">
      <h3 className="text-base font-semibold text-gray-700 pb-3 border-b border-gray-300 uppercase tracking-wide">
        Price Details
      </h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Price ({items.length} items)</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount</span>
          <span>− ₹{(subtotal * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div className="flex justify-between text-base font-semibold text-gray-900">
        <span>Total Amount</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="mt-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md p-3 font-medium">
        🎉 You saved ₹{(subtotal * 0.1).toFixed(2)} on this order!
      </div>
    </div>
  );
};

export default CartSummary;

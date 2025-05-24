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
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold mb-4">Price Details</h3>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax (10%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;

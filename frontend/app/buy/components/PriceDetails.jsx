const PriceDetails = ({ products }) => {
  const total = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 border rounded bg-white">
      <h3 className="text-lg font-bold mb-4">Price Details</h3>
      <div className="flex justify-between mb-2">
        <span>Total Items</span>
        <span>{products.length}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Total Amount</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default PriceDetails;

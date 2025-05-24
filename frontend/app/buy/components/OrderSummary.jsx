const OrderSummary = ({ products, onQuantityChange }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      {products.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-3 border-b"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() =>
                  onQuantityChange(index, Math.max(1, item.quantity - 1))
                }
                className="bg-gray-200 px-2 rounded"
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(index, item.quantity + 1)}
                className="bg-gray-200 px-2 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right font-semibold">
            ₹{item.price * item.quantity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;

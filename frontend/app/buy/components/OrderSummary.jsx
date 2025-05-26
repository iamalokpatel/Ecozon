const OrderSummary = ({ products, onQuantityChange }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      {products.map((item, index) => (
        <div
          key={item._id || index}
          className="flex gap-4 items-center py-3 border-b"
        >
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-20 h-20 object-contain rounded"
          />
          <div className="flex-1">
            <p className="font-medium">{item.product.title}</p>
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
            ₹{item.product.price * item.quantity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;

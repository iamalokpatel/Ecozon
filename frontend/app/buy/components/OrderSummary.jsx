const OrderSummary = ({ products, onQuantityChange }) => {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
      {products.map((item, index) => (
        <div
          key={item._id || index}
          className="flex gap-4 items-center bg-gray-50 rounded-xl p-4 hover:shadow transition"
        >
          <img
            src={item.product.image}
            alt={item.product.title}
            className="w-20 h-20 object-contain rounded-lg bg-white border"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.product.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() =>
                  onQuantityChange(index, Math.max(1, item.quantity - 1))
                }
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="px-2 text-gray-800 font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(index, item.quantity + 1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right font-semibold text-gray-800">
            ₹{item.product.price * item.quantity}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummary;

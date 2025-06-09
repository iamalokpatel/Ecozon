const PriceDetails = ({ products }) => {
  const totalItems = products.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = 100; // example fixed discount
  const deliveryCharge = totalAmount > 499 ? 0 : 40;
  const finalAmount = totalAmount - discount + deliveryCharge;

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-md shadow-sm p-5">
      <h2 className="text-gray-700 font-semibold text-lg mb-4 border-b pb-2">
        PRICE DETAILS
      </h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>
            Price ({totalItems} item{totalItems > 1 ? "s" : ""})
          </span>
          <span>₹{totalAmount}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
            {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
          </span>
        </div>

        <div className="border-t border-dashed pt-3 flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹{finalAmount}</span>
        </div>

        <div className="pt-2 text-sm text-green-600 font-medium">
          You will save ₹{discount} on this order
        </div>
      </div>
    </div>
  );
};

export default PriceDetails;

import Image from "next/image";

const OrderSummary = ({ products, onQuantityChange }) => {
  return (
    <div className="bg-[#fff]">
      <h2 className="bg-[#2874f0] text-[#fff] text-base font-medium uppercase py-3 pl-4">
        <span className="bg-[#f0f0f0] text-[#2874f0] text-[12px] rounded-[2px] px-[7px] py-[3px] align-baseline mr-[15px]">
          3
        </span>
        Order Summary
      </h2>
      {products.map((item, index) => (
        <div
          key={item.product._id || index}
          className="flex gap-4 items-center border-b border-gray-100 p-4 hover:shadow transition last:shadow-[0_1px_1px_0_rgba(0,0,0,0.2)]"
        >
          <Image
            src={item.product.image}
            alt={item.product.title}
            width={80}
            height={80}
            fill
            priority
            className="object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.product.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() =>
                  onQuantityChange(index, Math.max(1, item.quantity - 1))
                }
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
              >
                −
              </button>
              <span className="px-2 text-gray-800 font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(index, item.quantity + 1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 cursor-pointer"
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

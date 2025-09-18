import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay init
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/////////////////////// Create Order ///////////////////////
export const createOrderWithPayment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, address, paymentMethod, totalPrice } = req.body;

    if (!address)
      return res.status(400).json({ message: "Address is required" });
    if (!items || items.length === 0)
      return res.status(400).json({ message: "No items to order" });
    if (!paymentMethod)
      return res.status(400).json({ message: "Payment method is required" });

    if (paymentMethod === "cod") {
      // ✅ Direct order for COD
      const order = new Order({
        user: userId,
        items: items.map((i) => ({
          product: i.product._id,
          quantity: i.quantity,
        })),
        address,
        paymentMethod,
        paymentStatus: "pending",
        totalPrice,
      });

      await order.save();
      await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

      return res.status(201).json({ success: true, order });
    } else {
      // ✅ Online payment → Create Razorpay order
      const options = {
        amount: totalPrice * 100,
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };

      const razorpayOrder = await razorpay.orders.create(options);

      return res.json({
        success: true,
        razorpayOrder,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/////////////////////// Verify Payment ///////////////////////
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      address,
      totalPrice,
      paymentMethod,
    } = req.body;
    const userId = req.user._id;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // ✅ Payment success → Create order
    const order = new Order({
      user: userId,
      items: items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      address,
      paymentMethod,
      paymentStatus: "paid",
      totalPrice,
    });

    await order.save();
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.json({ success: true, order });
  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/////////////////////// Order Summary ///////////////////////
export const OrderSummary = async (req, res) => {
  const { mode, productId } = req.query;
  const userId = req.user._id;

  try {
    if (mode === "single") {
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.json([
        {
          productId: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
        },
      ]);
    }

    if (mode === "cart") {
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const cartItems = cart.items.map((item) => ({
        productId: item.product._id,
        name: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }));

      return res.json(cartItems);
    }

    return res.status(400).json({ error: "Invalid mode" });
  } catch (err) {
    console.error("Order summary error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

/////////////////////// Get Order Details ///////////////////////
export const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("items.product")
      .populate("address");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized access" });

    res.json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/////////////////////// Get All User Orders ///////////////////////
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

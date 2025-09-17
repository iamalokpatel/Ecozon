// controllers/orderController.js

import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

/////////////////////// Place Buy Order ///////////////////////
export const placeBuyOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { mode, productId, quantity, address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    if (mode === "single") {
      if (!productId) {
        return res
          .status(400)
          .json({ message: "Product ID is required for single order" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const order = new Order({
        user: userId,
        items: [{ product: product._id, quantity }],
        totalPrice: product.price * quantity,
        address,
        paymentStatus: "pending", // paymentMethod removed
      });

      await order.save();

      await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id } },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: "Order placed successfully", order });
    }

    if (mode === "cart") {
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const total = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      const order = new Order({
        user: userId,
        items: cart.items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalPrice: total,
        address,
        paymentStatus: "pending",
      });

      await order.save();

      await User.findByIdAndUpdate(
        userId,
        { $push: { orders: order._id } },
        { new: true }
      );

      cart.items = [];
      await cart.save();

      return res
        .status(201)
        .json({ message: "Cart order placed successfully", order });
    }

    return res
      .status(400)
      .json({ message: "Invalid mode. Must be 'single' or 'cart'" });
  } catch (error) {
    console.error("Error placing order:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/////////////////////// Update Payment Method ///////////////////////
export const updatePaymentMethod = async (req, res) => {
  const { orderId } = req.params;
  const { paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized access" });

    if (order.paymentStatus !== "pending")
      return res
        .status(400)
        .json({ message: "Cannot change payment method for processed orders" });

    order.paymentMethod = paymentMethod;
    await order.save();

    res.json({ message: "Payment method updated successfully", order });
  } catch (err) {
    console.error("Error updating payment method:", err);
    res.status(500).json({ message: "Server error", error: err.message });
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

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

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

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js"; // Import User for summary

// Place a single product order
export const placeOrder = async (req, res) => {
  try {
    const { productId, address } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const order = new Order({
      user: req.user._id,
      items: [{ product: product._id, quantity: 1 }],
      totalAmount: product.price,
      address,
      paymentMethod: "cod", // default, you can extend later
    });

    await order.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Place order for all cart items
export const placeCartOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

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
      totalAmount: total,
      address,
      paymentMethod: "cod",
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Orders placed successfully", order });
  } catch (err) {
    console.error("Error placing orders:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get order summary data (price, qty) for frontend display
export const OrderSummary = async (req, res) => {
  const { mode, productId } = req.query;
  const userId = req.user._id;

  try {
    if (mode === "single") {
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      return res.json([
        { price: product.price, quantity: 1, name: product.title },
      ]);
    }

    if (mode === "cart") {
      const cart = await Cart.findOne({ user: userId }).populate(
        "items.product"
      );
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const cartItems = cart.items.map((item) => ({
        price: item.product.price,
        quantity: item.quantity,
        name: item.product.title,
      }));

      return res.json(cartItems);
    }

    res.status(400).json({ error: "Invalid mode" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all orders by logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import Order from "../models/Order.js";
import User from "../models/User.js";
import Address from "../models/Address.js";

// For Find All Orders For Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username")
      .populate("address", "address city state pincode")
      .populate("items.product", "title price");

    res.json({ total: orders.length, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

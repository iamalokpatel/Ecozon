import Cart from "../models/Cart.js";

// Add or Increase Product Quantity in Cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create new cart if not exists
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // ✅ If product already exists → increase quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // ✅ If new product → push it
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  await cart.populate("items.product"); // optional but useful

  res.status(200).json({ message: "Cart updated", cart });
};

// Get all Cart Product
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart || { items: [] });
};

//UpdateD Cart
// POST /api/cart/update
export const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId, action, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });

  if (action === "increase") {
    item.quantity += 1;
  } else if (action === "decrease") {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    }
  }
  if (quantity) {
    item.quantity = quantity;
  }

  await cart.save();
  await cart.populate("items.product");
  res.json({ message: "Cart updated", cart });
};

// Remove Product From  Cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const updatedItems = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.items = updatedItems;
    await cart.save();
    res.json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const existing = await Cart.findOne({ name });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.json({ success: true, message: "Quantity Updated" });
    }

    await Cart.create({ name, price, image });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// GET ALL CART ITEMS
export const getCart = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// REMOVE ITEM
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.json({ success: true, message: "Item Removed" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
// DECREASE QUANTITY
export const decreaseFromCart = async (req, res) => {
  try {
    const { name } = req.params;
    const item = await Cart.findOne({ name });
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      return res.json({ success: true, message: "Quantity decreased" });
    } else {
      await Cart.deleteOne({ name });
      return res.json({ success: true, message: "Item removed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

import Order from '../../models/order.model.js';
import Product from '../../models/product.model.js';

export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: 'No items in order' });

    // Build items with current product prices
    const detailedItems = [];
    let total = 0;
    for (const it of items) {
      const prod = await Product.findById(it.product);
      if (!prod) return res.status(400).json({ message: `Product not found: ${it.product}` });
      const qty = it.qty || 1;
      detailedItems.push({ product: prod._id, name: prod.name, qty, price: prod.price });
      total += prod.price * qty;
    }

    const order = await Order.create({ user: req.user._id, items: detailedItems, shippingAddress, paymentMethod, totalPrice: total });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

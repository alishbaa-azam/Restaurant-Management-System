import Product from '../../models/product.model.js';
import { logAction } from '../../utils/auditLogger.js';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, special, isAvailable } = req.body;
    const prod = await Product.create({ name, description, price, category, image, stock, special: !!special, isAvailable: isAvailable === undefined ? true : !!isAvailable });
      // Audit
      await logAction({ req, action: 'create', resource: 'product', resourceId: prod._id, after: prod.toObject() });
    res.status(201).json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list products' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });

    const { name, description, price, category, image, stock, special, isAvailable } = req.body;
    if (name) prod.name = name;
    if (description) prod.description = description;
    if (price !== undefined) prod.price = price;
    if (category) prod.category = category;
    if (image) prod.image = image;
    if (stock !== undefined) prod.stock = stock;
    if (special !== undefined) prod.special = !!special;
    if (isAvailable !== undefined) prod.isAvailable = !!isAvailable;

    const before = prod.toObject();
    await prod.save();
    const after = prod.toObject();
    await logAction({ req, action: 'update', resource: 'product', resourceId: prod._id, before, after });
    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    const before = prod.toObject();
    await logAction({ req, action: 'delete', resource: 'product', resourceId: prod._id, before });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

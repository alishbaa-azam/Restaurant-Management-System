// import MenuItem from "../models/menu.model.js";
// import Product from "../models/product.model.js";

// // CREATE menu item (with image)
// export const createMenuItem = async (req, res) => {
//   try {
//     const { name, description, price, category, special } = req.body;

//     const image = req.file ? req.file.filename : null;

//     const item = await MenuItem.create({
//       name,
//       description,
//       price,
//       category,
//       image,
//       special: special === 'true' || special === true
//     });

//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET all menu items
// export const getMenuItems = async (req, res) => {
//   try {
//     const [menuItems, products] = await Promise.all([
//       MenuItem.find().lean(),
//       Product.find().lean()
//     ]);

//     // Normalize products to menu item shape so frontend can render both sources
//     const normalizedProducts = (products || []).map(p => ({
//       _id: p._id,
//       name: p.name,
//       description: p.description,
//       price: p.price,
//       category: p.category,
//       image: p.image,
//       special: p.special || false,
//       isAvailable: p.isAvailable === undefined ? true : p.isAvailable,
//       source: 'product'
//     }));

//     const normalizedMenu = (menuItems || []).map(m => ({
//       _id: m._id,
//       name: m.name,
//       description: m.description,
//       price: m.price,
//       category: m.category,
//       image: m.image,
//       special: m.special || false,
//       isAvailable: true,
//       source: 'menu'
//     }));

//     res.json([...normalizedMenu, ...normalizedProducts]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET by category
// export const getByCategory = async (req, res) => {
//   try {
//     const cat = req.params.category;
//     const [menuItems, products] = await Promise.all([
//       MenuItem.find({ category: cat }).lean(),
//       Product.find({ category: cat }).lean()
//     ]);

//     const normalizedProducts = (products || []).map(p => ({
//       _id: p._id,
//       name: p.name,
//       description: p.description,
//       price: p.price,
//       category: p.category,
//       image: p.image,
//       special: p.special || false,
//       isAvailable: p.isAvailable === undefined ? true : p.isAvailable,
//       source: 'product'
//     }));

//     const normalizedMenu = (menuItems || []).map(m => ({
//       _id: m._id,
//       name: m.name,
//       description: m.description,
//       price: m.price,
//       category: m.category,
//       image: m.image,
//       special: m.special || false,
//       isAvailable: true,
//       source: 'menu'
//     }));

//     res.json([...normalizedMenu, ...normalizedProducts]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // UPDATE menu item (with image update option)
// export const updateMenuItem = async (req, res) => {
//   try {
//     const data = {
//       ...req.body,
//     };

//     if (typeof data.special !== 'undefined') {
//       data.special = data.special === 'true' || data.special === true;
//     }

//     if (req.file) {
//       data.image = req.file.filename; // update image if uploaded
//     }

//     const item = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE
// export const deleteMenuItem = async (req, res) => {
//   try {
//     await MenuItem.findByIdAndDelete(req.params.id);
//     res.json({ message: "Item deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import MenuItem from "../models/menu.model.js";
import Product from "../models/product.model.js";

// CREATE menu item (image REQUIRED)
export const createMenuItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { name, description, price, category, special } = req.body;

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image: req.file.filename,
      special: special === "true" || special === true
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all menu items
export const getMenuItems = async (req, res) => {
  try {
    const [menuItems, products] = await Promise.all([
      MenuItem.find().lean(),
      Product.find().lean()
    ]);

    const normalizedMenu = (menuItems || []).map(m => ({
      _id: m._id,
      name: m.name,
      description: m.description,
      price: m.price,
      category: m.category,
      image: m.image || "",     // ✅ NEVER null
      special: m.special || false,
      isAvailable: true,
      source: "menu"
    }));

    const normalizedProducts = (products || []).map(p => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image || "",     // ✅ NEVER null
      special: p.special || false,
      isAvailable: p.isAvailable ?? true,
      source: "product"
    }));

    res.json([...normalizedMenu, ...normalizedProducts]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by category
export const getByCategory = async (req, res) => {
  try {
    const cat = req.params.category;

    const [menuItems, products] = await Promise.all([
      MenuItem.find({ category: cat }).lean(),
      Product.find({ category: cat }).lean()
    ]);

    const normalizedMenu = (menuItems || []).map(m => ({
      _id: m._id,
      name: m.name,
      description: m.description,
      price: m.price,
      category: m.category,
      image: m.image || "",
      special: m.special || false,
      isAvailable: true,
      source: "menu"
    }));

    const normalizedProducts = (products || []).map(p => ({
      _id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image || "",
      special: p.special || false,
      isAvailable: p.isAvailable ?? true,
      source: "product"
    }));

    res.json([...normalizedMenu, ...normalizedProducts]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateMenuItem = async (req, res) => {
  try {
    const data = { ...req.body };

    if (typeof data.special !== "undefined") {
      data.special = data.special === "true" || data.special === true;
    }

    if (req.file) {
      data.image = req.file.filename;
    }

    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

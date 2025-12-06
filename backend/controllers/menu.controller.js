// import MenuItem from "../models/menu.model.js";

// // CREATE menu item
// export const createMenuItem = async (req, res) => {
//   try {
//     const item = await MenuItem.create(req.body);
//     res.status(201).json(item);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET all menu items
// export const getMenuItems = async (req, res) => {
//   try {
//     const items = await MenuItem.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // GET by category
// export const getByCategory = async (req, res) => {
//   try {
//     const items = await MenuItem.find({ category: req.params.category });
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // UPDATE
// export const updateMenuItem = async (req, res) => {
//   try {
//     const item = await MenuItem.findByIdAndUpdate(
//       req.params.id,
//       req.body,
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

// CREATE menu item (with image)
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const image = req.file ? req.file.filename : null;

    const item = await MenuItem.create({
      name,
      description,
      price,
      category,
      image
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all menu items
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by category
export const getByCategory = async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE menu item (with image update option)
export const updateMenuItem = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename; // update image if uploaded
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

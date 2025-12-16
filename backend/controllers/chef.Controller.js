import Chef from "../models/chef.model.js";

// =============================
// CREATE CHEF
// =============================
export const createChef = async (req, res) => {
  try {
    const { name, role, description } = req.body;

    if (!name || !role || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const chef = await Chef.create({
      name,
      role,
      description,
      image,
    });

    res.status(201).json({ message: "Chef created successfully", chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// GET ALL CHEFS
// =============================
export const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find().sort({ createdAt: -1 });
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// GET SINGLE CHEF BY ID
// =============================
export const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);

    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// UPDATE CHEF (WITH IMAGE)
// =============================
export const updateChef = async (req, res) => {
  try {
    const { name, role, description } = req.body;

    let updatedFields = { name, role, description };

    // If new image uploaded
    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    const chef = await Chef.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    res.json({ message: "Chef updated successfully", chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =============================
// DELETE CHEF
// =============================
export const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);

    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }

    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

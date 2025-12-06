import Chef from "../models/chef.model.js";

// Create chef
export const createChef = async (req, res) => {
  try {
    const { name, description, pic } = req.body;

    const chef = await Chef.create({ name, description, pic });

    res.status(201).json({ message: "Chef created successfully", chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all chefs
export const getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single chef
export const getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) return res.status(404).json({ message: "Chef not found" });

    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update chef
export const updateChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!chef)
      return res.status(404).json({ message: "Chef not found" });

    res.json({ message: "Chef updated successfully", chef });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete chef
export const deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);

    if (!chef)
      return res.status(404).json({ message: "Chef not found" });

    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

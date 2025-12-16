import Culinary from "../models/culinary.js";

// CREATE
export const createCulinary = async (req, res) => {
  try {
    const card = new Culinary({
      title: req.body.title,
      desc: req.body.desc,
      iconType: req.body.iconType,
      img: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const saved = await card.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
export const getCulinary = async (req, res) => {
  try {
    const cards = await Culinary.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateCulinary = async (req, res) => {
  try {
    const updated = await Culinary.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
        iconType: req.body.iconType,
        img: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteCulinary = async (req, res) => {
  try {
    await Culinary.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Stat from "../models/stats.js";

export const createStat = async (req, res) => {
  try {
    const stat = await Stat.create(req.body);
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

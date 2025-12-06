import express from "express";
import {
  createChef,
  getChefs,
  getChefById,
  updateChef,
  deleteChef,
} from "../controllers/chefController.js";

const router = express.Router();

router.post("/create", createChef);
router.get("/", getChefs);
router.get("/:id", getChefById);
router.put("/:id", updateChef);
router.delete("/:id", deleteChef);

export default router;

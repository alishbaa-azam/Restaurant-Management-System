import express from "express";
import {
  createChef,
  getChefs,
  getChefById,
  updateChef,
  deleteChef,
} from "../controllers/chef.Controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// CREATE
router.post("/", upload.single("image"), createChef);

// READ
router.get("/", getChefs);
router.get("/:id", getChefById);

// UPDATE
router.put("/:id", upload.single("image"), updateChef);

// DELETE
router.delete("/:id", deleteChef);

export default router;

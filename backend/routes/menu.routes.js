import express from "express";
import {
  createMenuItem,
  getMenuItems,
  getByCategory,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menu.controller.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post("/", upload.single("image"), createMenuItem);
router.get("/", getMenuItems);
router.get("/:category", getByCategory);
router.put("/:id", upload.single("image"), updateMenuItem);
router.delete("/:id", deleteMenuItem);

export default router;

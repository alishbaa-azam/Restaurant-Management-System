import express from "express";
import upload from "../middleware/upload.js";
import {
  createCulinary,
  getCulinary,
  updateCulinary,
  deleteCulinary,
} from "../controllers/culinary.controller.js";

const router = express.Router();

router.post("/", upload.single("img"), createCulinary);
router.get("/", getCulinary);
router.put("/:id", upload.single("img"), updateCulinary);
router.delete("/:id", deleteCulinary);

export default router;

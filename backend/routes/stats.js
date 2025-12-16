import express from "express";
import { createStat, getStats } from "../controllers/statsController.js";

const router = express.Router();

router.post("/", createStat);
router.get("/", getStats);

export default router;

import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

// Public route to submit query
router.post("/", createContact);

// Optional: Get all queries (admin)
router.get("/", getContacts);

export default router;

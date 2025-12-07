import express from "express";
import { addToCart, getCart, removeFromCart, decreaseFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/items", getCart);
router.delete("/remove/:id", removeFromCart);
router.delete("/decrease/:name", decreaseFromCart); 

export default router;

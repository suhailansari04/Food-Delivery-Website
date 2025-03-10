import express from "express";
import {
    addToCart,
    removeFromCart,
    getCart,
} from "../controllers/cartController.js";
// import { get } from "mongoose";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.get("/getdata", authMiddleware, getCart);
export default cartRouter;

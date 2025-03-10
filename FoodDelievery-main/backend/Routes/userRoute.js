import express from "express";
import {
    logOutUser,
    loginUser,
    registerUSer,
    verifyUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
const userRouter = express.Router();
userRouter.post("/register", registerUSer);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logOutUser);
userRouter.get("/verify", authMiddleware, verifyUser);
export default userRouter;

import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./Routes/foodRoute.js";
import userRouter from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoutes.js";

//app config
const app = express();
const port = 5000;
app.use(express.json());
connectDb();

//middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(cookieParser());

//api endpoint
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
//

import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect(
        "mongodb+srv://greatstack:861717@cluster0.uwtprte.mongodb.net/FoodDelievery"
    );
    console.log("connected successfully");
};

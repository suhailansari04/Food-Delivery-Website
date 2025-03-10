import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
    });
    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Food  not Added",
        });
    }
};
const listfood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, data: error });
    }
};
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success: true,
            message: "Food Removed",
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Food Couldn't be Removed",
        });
    }
};
export { addFood, listfood, removeFood };

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(key);

const placeOrder = async (req, res) => {
    const frontEndUrl = "http://localhost:5173";

    const { userId, items, amount, address } = req.body;

    try {
        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items?.map((elm) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: elm?.name,
                },
                unit_amount: elm?.price * 100,
            },
            quantity: elm?.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
        });

        // creating session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontEndUrl}/verifyOrder?success=true&orderId=${newOrder?._id}`,
            cancel_url: `${frontEndUrl}/verifyOrder?success=false&orderId=${newOrder?._id}`,
        });

        return res.json({
            success: true,
            session_url: session.url,
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Something Went Wrong " + error,
        });
    }
};
const verifyOrder = async (req, res) => {
    console.log(req?.body);
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        res.json({ success: false, message: error });
    }
};
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status,
        });
        res.json({ success: true, message: "status updated" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

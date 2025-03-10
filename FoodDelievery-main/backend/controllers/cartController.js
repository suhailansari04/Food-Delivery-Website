import userModel from "../models/userModel.js";

//add  to card
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart " });
    } catch (error) {
        res.json({ success: false, message: "There was some error" });
    }
};

//remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart " });
    } catch (error) {
        res.json({ success: false, message: "There was some error" });
    }
};

//get cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        res.json({ success: true, data: cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "There was some error" });
    }
};
export { addToCart, removeFromCart, getCart };

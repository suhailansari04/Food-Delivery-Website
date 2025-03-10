import { createContext, useState, useEffect, useContext } from "react";
// import { food_list } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [cartItems, setcartItems] = useState({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems({
                ...cartItems,
                [itemId]: 1,
            });
        } else {
            setcartItems({
                ...cartItems,
                [itemId]: cartItems[itemId] + 1,
            });
        }
        if (isUserLoggedIn) {
            await axios.post("http://localhost:5000/api/cart/add", { itemId });
        }
    };
    const removeFromCart = async (itemId) => {
        setcartItems({
            ...cartItems,
            [itemId]: cartItems[itemId] - 1,
        });
        if (isUserLoggedIn) {
            await axios.post("http://localhost:5000/api/cart/remove", {
                itemId,
            });
        }
    };
    const getCart = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/cart/getdata"
            );
            if (res.data.success) {
                setcartItems(res.data.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(
                    (product) => product._id === item
                );
                totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    };
    const checkLoginStatus = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/user/verify"
            );

            if (res.data.success === true) {
                setIsUserLoggedIn(true);
            } else {
                setIsUserLoggedIn(false);
            }
        } catch (error) {
            toast.error("Server Error");
            setIsUserLoggedIn(false);
            console.log(error);
        }
    };
    const fetchFoodList = async () => {
        const res = await axios.get("http://localhost:5000/api/food/list");
        setFoodList(res.data.data);
    };
    useEffect(() => {
        fetchFoodList();
    }, []);
    useEffect(() => {
        getCart();
    }, [isUserLoggedIn]);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        checkLoginStatus,
        isUserLoggedIn,
        setIsUserLoggedIn,
    };

    return (
        <>
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        </>
    );
};

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, isUserLoggedIn, food_list, cartItems } =
        useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const placeOrder = async (e) => {
        e.preventDefault();

        let orderItems = [];

        food_list?.map((elm) => {
            if (cartItems[elm?._id] > 0) {
                let itemInfo = elm;

                itemInfo["quantity"] = cartItems[elm?._id];

                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/order/place",
                orderData
            );

            if (res.data.success) {
                const { session_url } = res.data;

                window.location.replace(session_url);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/cart");
        } else if (getTotalCartAmount() === 0) {
            navigate("/cart");
        }
    }, [isUserLoggedIn]);

    return (
        <>
            <form className="place-order" onSubmit={placeOrder}>
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input
                            required
                            type="text"
                            placeholder="First name"
                            name="firstName"
                            onChange={onChangeHandler}
                            value={data.firstName}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Last name"
                            name="lastName"
                            onChange={onChangeHandler}
                            value={data.lastName}
                        />
                    </div>
                    <input
                        required
                        type="email"
                        placeholder="Email adress"
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                    />
                    <input
                        required
                        type="text"
                        placeholder="Street"
                        name="street"
                        onChange={onChangeHandler}
                        value={data.street}
                    />
                    <div className="multi-fields">
                        <input
                            required
                            type="text"
                            placeholder="City"
                            name="city"
                            onChange={onChangeHandler}
                            value={data.city}
                        />
                        <input
                            required
                            type="text"
                            placeholder="State"
                            name="state"
                            onChange={onChangeHandler}
                            value={data.state}
                        />
                    </div>
                    <div className="multi-fields">
                        <input
                            required
                            type="text"
                            placeholder="zip-code"
                            name="zipcode"
                            onChange={onChangeHandler}
                            value={data.zipcode}
                        />
                        <input
                            required
                            type="text"
                            placeholder="Country"
                            name="country"
                            onChange={onChangeHandler}
                            value={data.country}
                        />
                    </div>
                    <input
                        required
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        onChange={onChangeHandler}
                        value={data.phone}
                    />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delievery Fee</p>
                                <p>${getTotalCartAmount() === 0 ? "0" : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Total</p>
                                <p>
                                    $
                                    {getTotalCartAmount() === 0
                                        ? "0"
                                        : getTotalCartAmount() + 2}
                                </p>
                            </div>
                        </div>
                        <button type="submit">PROCEED TO CHECKOUT</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PlaceOrder;

import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import "./MyOrders.css";
const MyOrders = () => {
    const { isUserLoggedIn } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const fetchOrders = async () => {
        const response = await axios.get(
            "http://localhost:5000/api/order/userOrders"
        );
        console.log(response.data.data);

        setData(response.data.data);
    };

    useEffect(() => {
        console.log(isUserLoggedIn);
        if (isUserLoggedIn) {
            fetchOrders();
        }
    }, [isUserLoggedIn]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <>
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return (
                                            item.name + " x " + item.quantity
                                        );
                                    } else {
                                        return (
                                            item.name +
                                            " x " +
                                            item.quantity +
                                            " , "
                                        );
                                    }
                                })}
                            </p>
                            <p>${order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p>
                                <span>&#x25cf;</span>
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;

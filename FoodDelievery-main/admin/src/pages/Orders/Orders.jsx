import React, { useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets.js";
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        const res = await axios.get("http://localhost:5000/api/order/list");
        if (res.data.success) {
            setOrders(res.data.data);
        } else {
            toast.error("Error");
        }
    };

    const statusHandler = async (event, orderId) => {
        const res = await axios.post("http://localhost:5000/api/order/status", {
            orderId: orderId,
            status: event.target.value,
        });
        if (res.data.success) {
            await fetchAllOrders();
        }
    };
    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <div className="order add">
                <h3>Order Page</h3>
                <div className="order-list">
                    {orders.map((order, index) => (
                        <>
                            <div key={index} className="order-item">
                                <img src={assets.parcel_icon} />
                                <div>
                                    <p className="order-item-food">
                                        {order.items.map((item, index) => {
                                            if (
                                                index ===
                                                order.items.length - 1
                                            ) {
                                                return (
                                                    item.name +
                                                    " x " +
                                                    item.quantity
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
                                    <p className="order-item-name">
                                        {order.address.firstName +
                                            " " +
                                            order.address.lastName}
                                    </p>
                                    <div className="order-item-address">
                                        <p>{order.address.street + ""}</p>
                                        <p>
                                            {order.address.city +
                                                "," +
                                                order.address.state +
                                                "," +
                                                order.address.country +
                                                ", " +
                                                order.address.zipcode}
                                        </p>
                                    </div>
                                    <p className="order-item-phone">
                                        {order.address.phone}
                                    </p>
                                </div>
                                <p>Items:{order.items.length}</p>
                                <p>${order.amount}</p>
                                <select
                                    onChange={(event) =>
                                        statusHandler(event, order._id)
                                    }
                                    value={order.status}
                                >
                                    <option value="Food Processing">
                                        Food Processing
                                    </option>
                                    <option value="Out For Delievery">
                                        Out For Delievery
                                    </option>
                                    <option value="Delievered">
                                        Delievered
                                    </option>
                                </select>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Orders;

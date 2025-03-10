import { useEffect, useState } from "react";
import React from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/food/list"
            );
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const removeFood = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/food/remove",
                { id: id }
            );
            await fetchList();
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error("Error");
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchList();
    }, []);
    return (
        <>
            <div className="list add flex-col">
                <p>All Foods List</p>
                <div className="list-table">
                    <div className="list-table-format title">
                        <p>Image</p>
                        <p>Name</p>
                        <p>Category</p>
                        <p>Price</p>
                        <p>Action</p>
                    </div>
                    {list.map((item) => (
                        <>
                            <div className="list-table-format">
                                <img
                                    src={
                                        `http://localhost:5000/images/` +
                                        item.image
                                    }
                                />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p
                                    className="cursor"
                                    onClick={() => {
                                        removeFood(item._id);
                                    }}
                                >
                                    X
                                </p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default List;

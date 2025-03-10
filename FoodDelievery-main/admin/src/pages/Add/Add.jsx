import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image) {
            formData.append("image", image);
        } else {
            return toast.error("Please upload file");
        }
        try {
            const res = await axios.post(
                "http://localhost:5000/api/food/add",
                formData
            );
            if (res.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad",
                });
                setImage(false);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : assets.upload_area
                            }
                        />
                    </label>
                    <input
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                            e.target.value = "";
                        }}
                        type="file"
                        id="image"
                        hidden
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Type here.."
                        value={data.name}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Write Content here"
                        required
                        value={data.description}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            name="category"
                            value={data.category}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input
                            type="Number"
                            name="price"
                            placeholder="$20"
                            value={data.price}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <button className="add-btn">Add</button>
            </form>
        </div>
    );
};

export default Add;

//to console formData
// formData.forEach((value, key) => console.log(key, value));

//option-2 loop appending
// Object.entries(data).map((item) => {
//     formData.append(item[0], item[1]);
// });
// formData.append("image", image);

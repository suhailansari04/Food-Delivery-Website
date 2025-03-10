import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/storeContext";

const FoodItem = ({ id, name, price, description, image }) => {
    const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

    return (
        <>
            <div className={"food_item"}>
                <div className={"food_item_img_container"}>
                    <img
                        className={"food_item_img"}
                        src={"http://localhost:5000/images/" + image}
                        alt={name}
                    />

                    {!cartItems?.[id] ? (
                        <img
                            className={"add"}
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_white}
                            alt="add-icon"
                        />
                    ) : (
                        <div className={"food_item_counter"}>
                            <img
                                onClick={() => removeFromCart(id)}
                                src={assets.remove_icon_red}
                                alt="icon-red"
                            />
                            <p>{cartItems[id]}</p>
                            <img
                                onClick={() => addToCart(id)}
                                src={assets.add_icon_green}
                                alt="icon-green"
                            />
                        </div>
                    )}
                </div>

                <div className={"food_item_info"}>
                    <div className={"food_item_name_rating"}>
                        <p>{name}</p>

                        <img src={assets.rating_starts} alt="ratings" />
                    </div>

                    <p className={"food_item_desc"}>{description}</p>

                    <p className={"food_item_price"}>₹{price}</p>
                </div>
            </div>
        </>
    );
};

export default FoodItem;

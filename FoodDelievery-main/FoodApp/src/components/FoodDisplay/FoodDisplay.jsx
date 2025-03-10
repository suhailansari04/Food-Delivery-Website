import React, { useContext, Fragment } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    return (
        <>
            <div className="food-diplay" id="food-display">
                <h2>Top dishes near you </h2>
                <div className="food-display-list">
                    {food_list?.map((elm, index) => {
                        if (category === "All" || elm?.category === category)
                            return (
                                <Fragment key={index}>
                                    <FoodItem
                                        id={elm?._id}
                                        name={elm?.name}
                                        price={elm?.price}
                                        description={elm?.description}
                                        image={elm?.image}
                                    />
                                </Fragment>
                            );
                    })}
                </div>
            </div>
        </>
    );
};

export default FoodDisplay;

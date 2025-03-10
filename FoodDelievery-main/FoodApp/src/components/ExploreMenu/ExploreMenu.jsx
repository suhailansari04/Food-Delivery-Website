import React, { useState } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets.js";

const ExploreMenu = ({ category, setcategory }) => {
    return (
        <>
            <div className="explore-menu" id="explore-menu">
                <h1>Explore our menu</h1>
                <p className="explore-menu-text">
                    Choose from a diverse menu featuring a delectable array of
                    dishes. Our mission is to satisfy your cravings and elevate
                    your dining experience meal at a time.
                </p>
                <div className="explore-menu-list">
                    {menu_list?.map((elm, index) => (
                        <div
                            onClick={() =>
                                setcategory((prev) =>
                                    prev === elm.menu_name
                                        ? "All"
                                        : elm.menu_name
                                )
                            }
                            key={index}
                            className="explore-menu-list-item"
                        >
                            <img
                                className={
                                    category === elm.menu_name ? "active" : ""
                                }
                                src={elm?.menu_image}
                                alt={elm?.menu_name}
                            />
                            <p>{elm?.menu_name}</p>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
        </>
    );
};

export default ExploreMenu;

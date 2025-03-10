import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Navbar = ({ setshowLogin }) => {
    const navigate = useNavigate();
    const [menu, setmenu] = useState("");
    const { getTotalCartAmount, isUserLoggedIn, setIsUserLoggedIn } =
        useContext(StoreContext);
    const logout = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/user/logout"
            );
            if (res.data.success) {
                setIsUserLoggedIn(false);
                toast.success(res.data.message);
                navigate("/");
                setmenu("home");
            }
        } catch (error) {
            toast.error("Error Occured");
            console.log("error", error);
        }
    };

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <img src={assets.logo} className="logo" />
                </Link>
                <ul className="navbar_menu">
                    <Link
                        to="/"
                        className={menu === "home" ? "active" : ""}
                        onClick={() => setmenu("home")}
                    >
                        Home
                    </Link>
                    <a
                        href="#explore-menu"
                        className={menu === "menu" ? "active" : ""}
                        onClick={() => setmenu("menu")}
                    >
                        Menu
                    </a>
                    <a
                        href="#app-download"
                        className={menu === "mobile" ? "active" : ""}
                        onClick={() => setmenu("mobile")}
                    >
                        Mobile-App
                    </a>
                    <a
                        href="#footer"
                        className={menu === "contact" ? "active" : ""}
                        onClick={() => setmenu("contact")}
                    >
                        Contact Us
                    </a>
                </ul>
                <div className="navbar_right">
                    <img src={assets.search_icon} />
                    <div className="navbar_search_icon">
                        <Link to="/cart">
                            {" "}
                            <img src={assets.basket_icon} />
                        </Link>
                        <div
                            className={getTotalCartAmount() === 0 ? "" : "dot"}
                        />
                    </div>
                    {!isUserLoggedIn ? (
                        <button onClick={() => setshowLogin(true)}>
                            Sign In
                        </button>
                    ) : (
                        <div className="navbar-profile">
                            <img src={assets.profile_icon} />
                            <ul className="nav-profile-dropdown">
                                <li onClick={() => navigate("/myorders")}>
                                    <img src={assets.bag_icon} />
                                    <p> My Orders</p>
                                </li>
                                <hr />{" "}
                                <li onClick={logout}>
                                    <img src={assets.logout_icon} />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;

import React, { useState, useContext } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/storeContext";

const LoginPopup = ({ setshowLogin }) => {
    const { checkLoginStatus } = useContext(StoreContext);
    const [currState, setcurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value,
        });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        let newUrl = "http://localhost:5000";
        if (currState === "Signup") {
            newUrl += "/api/user/register";
        } else {
            newUrl += "/api/user/login";
        }

        try {
            const res = await axios.post(newUrl, data);

            if (res.data.success) {
                toast.success(res.data.message);
                checkLoginStatus();
                setshowLogin(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <>
            <div className="login-popup">
                <form className="login-popup-container" onSubmit={handleLogin}>
                    <div className="login-popup-title">
                        <h2>{currState}</h2>
                        <img
                            src={assets.cross_icon}
                            onClick={() => {
                                setshowLogin(false);
                            }}
                        />
                    </div>
                    <div className="login-popup-inputs">
                        {currState === "Login" ? (
                            <></>
                        ) : (
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={data.name}
                                name="name"
                                onChange={handleChange}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Your Password"
                            required
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">
                        {currState === "Signup" ? "Create Account" : "Login"}
                    </button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>
                            By continuing, i agree to the terms of use & privacy
                            policy.
                        </p>
                    </div>
                    {currState === "Login" ? (
                        <p>
                            Create a new account?
                            <span onClick={() => setcurrState("Signup")}>
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?
                            <span onClick={() => setcurrState("Login")}>
                                Login here
                            </span>
                        </p>
                    )}
                </form>
            </div>
        </>
    );
};

export default LoginPopup;

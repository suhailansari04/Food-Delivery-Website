import React, { useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const res = await axios.post(
            "http://localhost:5000/api/order/verifyOrder",
            { success, orderId }
        );
        if (res.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    };
    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <>
            <div className="verify">
                <div className="spinner"></div>
            </div>
        </>
    );
};

export default Verify;

import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "./context/storeContext";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
    const [showLogin, setshowLogin] = useState(false);
    const { checkLoginStatus } = useContext(StoreContext);
    useEffect(() => {
        checkLoginStatus();
    }, []);
    return (
        <>
            <ToastContainer />
            {showLogin ? <LoginPopup setshowLogin={setshowLogin} /> : <></>}
            <div className="app">
                <BrowserRouter>
                    <Navbar setshowLogin={setshowLogin} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/PlaceOrder" element={<PlaceOrder />} />
                        <Route path="/verifyOrder" element={<Verify />} />
                        <Route path="/myorders" element={<MyOrders />} />
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer />
        </>
    );
}

export default App;

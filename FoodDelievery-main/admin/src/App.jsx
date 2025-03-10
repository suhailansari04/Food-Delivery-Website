import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                    <Sidebar />
                    <Routes>
                        <Route path="/add" element={<Add />} />
                        <Route path="/list" element={<List />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import Success from "../Pages/Success";
import Failure from "../Pages/Failure";
import Navbar from "../Components/Navbar";
import Checkout from "../Pages/Checkout";

const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;

import React from "react";
import Navbar from "./Navbar";
import AllProducts from "./AllProducts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import User from "./User";


const Main = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <div id="title">
        <h1>Aloe There A</h1>
      </div>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
      {/* <AllProducts /> */}
    </Router>
  );
};

export default Main;

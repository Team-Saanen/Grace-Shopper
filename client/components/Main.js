import React from "react";
import Navbar from "./Navbar";
import AllProducts from "./AllProducts";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Main = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <div id="title">
        <h1>Aloe There A</h1>
      </div>
      {/* <Routes>
        <Route path="/" element={<AllProducts />} />
      </Routes> */}
      <AllProducts />
    </Router>
  );
};

export default Main;

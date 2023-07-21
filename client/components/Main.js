import React from "react";
import Navbar from "./Navbar";
import AllProducts from "./AllProducts";

const Main = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div id="title">
        <h1>Aloe There A</h1>
      </div>
      <AllProducts />
    </>
  );
};

export default Main;

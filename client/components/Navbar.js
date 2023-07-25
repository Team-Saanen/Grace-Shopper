import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="nav container">
          <a href="/" className="logo">
            Aloe There A
          </a>
          <i className="bx bx-shopping-bag" id="cart-icon"></i>
        </div>
      </header>
    </>
  );
};

export default Navbar;

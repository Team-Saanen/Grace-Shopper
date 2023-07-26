import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const imageAddress =
    "https://www.pngmart.com/files/14/Colorful-Shopping-Bag-Transparent-PNG.png";

  return (
    <>
      <header>
        <div className="nav container">
          <a href="/" className="logo">
            Aloe There A
          </a>
          <Link
            to="/cart"
            className="cart-link"
            style={{ backgroundImage: `url(${imageAddress})` }}
          ></Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;

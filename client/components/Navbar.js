import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const imageAddress =
    "https://www.pngmart.com/files/14/Colorful-Shopping-Bag-Transparent-PNG.png";
  const imageAddress2 =
    "https://pic.onlinewebfonts.com/thumbnails/icons_184513.svg";

  return (
    <>
      <header>
        <div className="nav container">
          <a href="/" className="logo">
            Home
          </a>
          <Link
            to="/cart"
            className="cart-link"
            style={{ backgroundImage: `url(${imageAddress})` }}
          ></Link>
          <Link
            to="/user/1"
            className="user-link"
            style={{ backgroundImage: `url(${imageAddress2})` }}
          ></Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;

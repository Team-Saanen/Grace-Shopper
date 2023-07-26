import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { fetchCartAsync, selectCart, setUserId } from "../store/cartSlice";
import { updateSales } from "../store/salesSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cartProducts = useSelector(selectCart);
  console.log('cart products', cartProducts);

  useEffect(() => {
    
      let tempID = localStorage.getItem("tempID");
      
      if (!tempID) {
          tempID = Math.floor(Math.random() * 1000);
          localStorage.setItem("tempID", tempID);
      }
      dispatch(fetchCartAsync(tempID));
      dispatch(setUserId(tempID));
  }, []);


  const handleCheckOut = async () => {
    try {
      const items = cartProducts.map((item) => item.id);
      const quantity = cartProducts.map((item) => item.CartItem.quantity);
      const date = new Date().toISOString();

      await dispatch(updateSales({ items, quantity, date }));
      setShowConfirmation(true);
      dispatch(fetchCartAsync());
    }
    catch(err) {
      console.error("Failed to checkout: ", err)
    }
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
      </nav>

      <h1>Cart Review</h1>
      <div>
        {Array.isArray(cartProducts) && cartProducts.map((cartItem) => (
          <div key={cartItem.id}>
            <CartItem cartItem={cartItem} />          
          </div>
        ))}
      </div>
      <button onClick={handleCheckOut}>Checkout</button>

      {showConfirmation && (
        <div>
          <h2>Thank you for your purchase!</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;

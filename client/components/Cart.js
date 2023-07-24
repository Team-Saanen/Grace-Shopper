import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { fetchCartAsync,removeFromCart  } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const cartProducts = useSelector((state) => state.cart);

  const handleDelete = async (id) => {
    await dispatch(removeFromCart(id));
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
      </nav>

      <h1>Cart Review</h1>

      {cartProducts.map((cartItem) => (
        <div key={cartItem.id}>
          <CartItem cartItem={cartItem} />
          <button onClick={() => handleDelete(cartItem.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

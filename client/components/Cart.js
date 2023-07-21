import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
// add import for fetch cart thunk

const Cart = () => {
  //dispatch thunk
  const dispatch = useDispatch();
  // const { id } = useParams();
  const Navigate = useNavigate();


  // remember to add a fetch cart function in the cart Slice
  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const cartProducts = useSelector((state) => state.cart);

  const handleDelete = async (id) => {
    await dispatch(deleteTaskAsync(id));
    Navigate("/cart");
  };

  return (
    <div>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Products</Link>
      </nav>

      <h1>Cart Review</h1>

      {/* each productID is pushed once */}
      {/* need to add function so that if pushed again then quantity will change */}
      {cartProducts.map((cartItem) => (
        <div key={cartItem.id}>
          {/* double check what to put in link to get back to single product page */}
          <Link to={`/cart/${cartItem.id}`} key={cartItem.id}>
            <CartItem cartItem={cartItem} />
          </Link>
          <button onClick={() => handleDelete(cartItem.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

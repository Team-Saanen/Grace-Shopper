import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectProduct } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const { productId } = useParams();
  // console.log("this should be the id", { productId });
  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  return (
    <>
      <div key={product.id}>
        <h1 id="singleProductTitle">Your Future Plant</h1>
      </div>
      <div className="singleProduct">
        <h2>{product.productName}</h2>
        <img src={product.productImg} />
        <p>{product.description}</p>
        <p>{product.quantity}</p>
        <p>{product.price}</p>
        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
      </div>
    </>
  );
};

export default SingleProduct;

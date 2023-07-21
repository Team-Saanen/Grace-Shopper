import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/productSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  return (
    <>
      <div>
        <h1>Plant Info</h1>
      </div>
      <h2>{product.productName}</h2>
      <img>{product.productImg}</img>
      <p>{product.description}</p>
      <p>{product.quantity}</p>
      <p>{product.price}</p>
    </>
  );
};

export default SingleProduct;

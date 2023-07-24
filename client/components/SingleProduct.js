import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct, selectProduct } from "../store/productSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const { productId } = useParams();
  console.log("this should be the id", { productId });
  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      <div>
        <h1>Plant Info</h1>
      </div>
      <h2>{product.productName}</h2>
      <img src={product.productImg} />
      <p>{product.description}</p>
      <p>{product.quantity}</p>
      <p>{product.price}</p>
    </>
  );
};

export default SingleProduct;

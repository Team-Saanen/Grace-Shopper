import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/productsSlice";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <>
      <h1 id="all-plants">All Plants</h1>
      <div class="list-container">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default AllProducts;

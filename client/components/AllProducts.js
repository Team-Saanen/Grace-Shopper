import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../store/productsSlice";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  const dispatch = useDispatch();

  // const products = useSelector((state) => state.products);
  const products = useSelector(selectProducts);
  
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  
  return (
    <>
      <h1 id="all-plants">All Plants</h1>
      <div className="list-container">
        <p>What if prod list?</p>
        {/* {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))} */}
      </div>
    </>
  );
};

export default AllProducts;

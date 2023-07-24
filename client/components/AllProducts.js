import React, { useEffect } from "react";
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

  if (products.length > 0) {
    return (
      <>
        <h1 id="all-plants">All Plants</h1>
        <div class="list-container">
          {products.map((product) => (
            <p>{product.productName}</p>
            // <div className="product">
            //   <h3>{product.name}</h3>
            //   <p>Price: ${product.price}</p>
            //   <button onClick={addToCart}>Add to Cart</button>
            // </div>
          ))}
        </div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
};

export default AllProducts;

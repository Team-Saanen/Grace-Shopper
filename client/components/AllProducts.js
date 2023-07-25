import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../store/productsSlice";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom/cjs/react-router-dom";

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
        <div className="list-container">
          {products.map((product) => (
            <div className="product" key={`product-${product.id}`}>
              <h3>{product.productName}</h3>
              <Link to={`/products/${product.id}`}>
                <img src={product.productImg} />
              </Link>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
};

export default AllProducts;

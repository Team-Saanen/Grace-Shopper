import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, selectProducts } from "../store/productsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const handleAddToCart = (productId) => {
    const userid = 1;
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  if (products.length > 0) {
    return (
      <>
        <h1 id="all-plants">All Plants</h1>
        <div className="list-container">
          {products.map((product) => (
            <div className="product" key={`product-${product.id}`}>
              <h3>{product.productName}</h3>
              <Link to={`/products/${product.id}`}>
                <img src={product.productImg} alt={product.productName} />
              </Link>
              <p>Price: ${product.price}</p>
              <button onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </button>
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

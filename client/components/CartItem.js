import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuantity } from '../store/cartItemSlice';
import { fetchSingleProduct, selectProduct } from '../store/productSlice';

const CartItem = ({ cartItem, quantity }) => {
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);

    useEffect(() => {
        dispatch(fetchSingleProduct(cartItem.id))
    }, [dispatch, cartItem.id]);

    const handleQuantityChange = (evt) => {
        evt.preventDefault();
        dispatch(editQuantity({ productId: cartItem.id, quantity: parseInt(evt.target.value) }));
    }

    return (
        <div className="cart-card">
        {product && (
          <div>
            <h1>{product.name}</h1>
            <h2>Quantity: {quantity}</h2>
            <label htmlFor="quantityChange"></label>
            <input
                name="quantity"
                type="number"
                min="1"
                value={cartItem.quantity}
                onChange={handleQuantityChange}
            />
          </div>
        )}
      </div>
    );
};

export default CartItem;

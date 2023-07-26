import React from 'react';
import { useDispatch } from 'react-redux';
import { editQuantity } from '../store/cartItemSlice';

const CartItem = ({ productId, quantity}) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (evt) => {
        evt.preventDefault();
        dispatch(editQuantity({ productId, quantity: parseInt(evt.target.value) }));
    }

    return (
        <div className='cart-card'>
            <h1>{productId}</h1>
            <h2>{quantity}</h2>
            <label htmlFor="quantityChange">Last Name:</label>
            <input
                name="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
            />
        </div>
    );
};

export default CartItem;

import React from 'react';
import { useDispatch } from 'react-redux';
import { editQuantity } from '../store/cartItemSlice';

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (evt) => {
        evt.preventDefault();
        dispatch(editQuantity({ productId: cartItem.id, quantity: parseInt(evt.target.value) }));
    }

    return (
        <div className='cart-card'>
            <h1>{cartItem.item}</h1>
            <h2>{cartItem.quantity}</h2>
            <label htmlFor="quantityChange">Last Name:</label>
            <input
                name="quantity"
                type="number"
                min="1"
                value={cartItem.quantity}
                onChange={handleQuantityChange}
            />
        </div>
    );
};

export default CartItem;

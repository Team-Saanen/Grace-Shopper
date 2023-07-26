import React from 'react';
import { useDispatch } from 'react-redux';
import { editQuantity } from '../store/cartItemSlice';
import { removeFromCart } from '../store/cartSlice';

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(removeFromCart(cartItem.id));
      };

    const handleQuantityChange = (evt) => {
        evt.preventDefault();
        const newQuantity = parseInt(evt.target.value)
        dispatch(editQuantity({ productId: cartItem.id, quantity: newQuantity }));
    }

    return (
        <div className='cart-card'>
            <h1>{cartItem.productName}</h1>
            <h2>{cartItem.quantity}</h2>
            <label htmlFor="quantityChange">Quantity:</label>
            <input
                name="quantity"
                type="number"
                min="1"
                value={cartItem.quantity}
                onChange={handleQuantityChange}
            />
            <button onClick={() => handleDelete(cartItem.id)}>Delete</button>
        </div>
    );
};

export default CartItem;

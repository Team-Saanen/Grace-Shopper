import React from 'react';


const CartItem = ({cartItem}) => {

    return (
        <div className='cart-card'>
            <h1>{cartItem.item}</h1>
            <h2>{cartItem.quantity}</h2>
        </div>
    );
};

export default CartItem;

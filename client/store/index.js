import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './auth'
import productReducer from './productSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import cartReducer from './cartSlice';
import cartItemReducer from './cartItemSlice'
import salesReducer from './salesSlice';
// import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer, 
    product: productReducer,
    products: productsReducer,
    user: userReducer,
    users: usersReducer,
    cart: cartReducer,
    cartItem: cartItemReducer,
    sales: salesReducer
},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
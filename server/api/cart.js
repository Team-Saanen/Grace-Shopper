const express = require('express');
const router = express.Router();
const { models: { Cart, Sales }} = require('../db');
//!!! need cart.addProduct and sale.addProduct!!!
// Route for adding a product to the cart
router.put('/cart/:productId', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ where: { userId } });
  
      if (!cart) {
        cart = await Cart.create({ userId });
      }
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await Cart.create({ cartId: cart.id, productId, quantity: 1 });
  
      res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
      next(error);
    }
  });
  

// Only use this route if user is logged in
// Route for updating the product quantity in the cart
router.put('/cart/:productId/quantity', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const quantity = req.body.quantity;
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ where: { userId } });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      const cartItem = await Cart.findOne({ where: { cartId: cart.id, productId } });
  
      if (cartItem) {
        // If the item already exists in the cart, update the quantity
        Cart.quantity = quantity;
        await Cart.save();
      } else {
        // If the item is not found in the cart, return an error
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      res.json({ message: 'Product quantity updated successfully' });
    } catch (error) {
      next(error);
    }
  });
  


  // Delete route to delete a product anywhere in cart
  router.delete('/cart/:productId', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const userId = req.user.id;
  
      // Find the cart entry for the user
      const cart = await Cart.findOne({ where: { userId } });
  
      // Check if the cart exists
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Find the index of the product in the productIds array
      const productIndex = cart.productIds.indexOf(productId);
  
      // Check if the product exists in the cart
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      // Remove the product from the arrays
      cart.productIds.splice(productIndex, 1);
      cart.quantities.splice(productIndex, 1);
  
      // Save the updated cart
      await cart.save();
  
      res.json({ message: 'Product removed from cart successfully' });
    } catch (error) {
      next(error);
    }
  });

  // Checkout and clear cart in the database 
  router.post('/checkout', async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ where: { userId } });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Retrieve the productIds, quantities, and calculate the total price
      const cartItems = await cart.getProducts();
      const productIds = cartItems.map((item) => item.id);
      const quantities = cartItems.map((item) => item.CartItem.quantity);
  
      // Create a new sales entry
      const newSale = await Sales.create({
        userId,
        productIds,
        dateTime: new Date(),
      });
  
      // Add each cart item as a separate entry in the Sales table
      for (let i = 0; i < cartItems.length; i++) {
        await newSale.addProduct(cartItems[i], {
          through: { quantity: quantities[i] },
        });
      }
  
      await newSale.save();
  
      // Clear the user's cart after successful purchase
      await cart.destroy();
  
      res.status(201).json({ message: 'Purchase completed successfully', saleId: newSale.id });
    } catch (error) {
      next(error);
    }
  });

  // Route to change the quantity of a product in the cart
  router.put('/cart/:productId/change', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const userId = req.user.id;
      const quantity = req.body.quantity;
  
      // Find the cart entry for the user
      const cart = await Cart.findOne({ where: { userId } });
  
      // Check if the cart exists
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Find the index of the product in the productIds array
      const productIndex = cart.productIds.indexOf(productId);
  
      // Check if the product exists in the cart
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      // Increase the quantity of the product
      cart.quantities[productIndex] += quantity;
  
      // Save the updated cart
      await cart.save();
  
      res.json({ message: 'Quantity increased successfully' });
    } catch (error) {
      next(error);
    }
  });

module.exports = router
const express = require('express');
const router = express.Router();
const { models: { User, Products, Cart, Sales }} = require('../db');

//Homepage
router.get('/', async (req, res, next) => {
    try{
        const products = await Products.findAll();
        res.json(products);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/:productId', async(req, res, next) =>{
    try {
        const product = await Products.findByPk(req.params.productId);
        if(productId){
            res.json(user);
        }else {
            res.status(404).send('Product not found')
        }
    }catch (error) {
        next(error);
    }
});
//Only use this route if user is logged in
router.put('/cart/:productId', async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const quantity = req.body.quantity;
      const userId = req.user.id;
  
      let cart = await Cart.findOne({ where: { userId } });
  
      // If the cart doesn't exist, create a new cart entry for the user
      if (!cart) {
        cart = await Cart.create({
          userId,
          productIds: [productId],
          quantities: [quantity]
        });
  
        return res.json({ message: 'Product added to cart successfully' });
      }
  
      // Check if the productId already exists in the productIds array
      const productIndex = cart.productIds.indexOf(productId);
  
      if (productIndex !== -1) {
        // If the productId already exists, update the corresponding quantity
        cart.quantities[productIndex] += quantity;
      } else {
        // If the productId is not found, add it to the arrays
        cart.productIds.push(productId);
        cart.quantities.push(quantity);
      }
  
      // Save the updated cart
      await cart.save();
  
      res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
      next(error);
    }
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = await User.create({
        username,
        password,
        email
      });
  
      res.status(201).json({ message: 'User account created successfully', userId: newUser.id });
    } catch (error) {
      next(error);
    }
  });

  router.post('/checkout', async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cart = await Cart.findOne({ where: { userId } });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Retrieve the productIds, quantities, and calculate the total price
      const { productIds, quantities } = cart;
      const totalPrice = calculateTotalPrice(productIds, quantities);
  
      // Create a new sales entry
      const newSale = await Sales.create({
        userId,
        quantities,
        items: productIds,
        totalPrice,
        dateTime: new Date()
      });
  
      // Clear the user's cart after successful purchase
      await cart.destroy();
  
      res.status(201).json({ message: 'Purchase completed successfully', saleId: newSale.id });
    } catch (error) {
      next(error);
    }
  });
  
module.exports = router;
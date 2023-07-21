const express = require('express');
const router = express.Router();
const { models: { User, Products, Sales }} = require('../db');

//Homepage
router.get('/', async (req, res, next) => {
    try{
        const products = await Products.findAll();
        res.json(products);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/:productId', async (req, res, next) => {
  try {
      const product = await Products.findByPk(req.params.productId);
      if (product) {
          res.json(product);
      } else {
          res.status(404).send('Product not found');
      }
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

      // Check if the email already exists
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({ error: 'Email already in use' });
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


// Get client's user information based on log in status
router.get('/user/:userId', (req, res, next) => {
  // Check if the client is authenticated
  if (req.user) {
    // Retrieve the authenticated user's information
    const userId = req.user.userId;
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    const username = req.user.username;
    const email = req.user.email;

    // Return the user information as json
    res.json({
      userId,
      firstName,
      lastName,
      email,
      username,
    });
  } else {
    // Client is not authenticated
    res.status(401).json({ error: 'User not authenticated' });
  }
});

// Get order history for a user based on their ID
router.get('/user/:userId/order-history', async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Query the Sales model for all sales associated with the user's ID
    const orderHistory = await Sales.findAll({ where: { userId } });

    res.json(orderHistory);
  } catch (error) {
    next(error);
  }
});
  
  // Put to update the user's information based on ID
  router.put('/user/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { firstName, lastName, email } = req.body;
  
      // Find the user by ID
      const user = await User.findByPk(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user information
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
  
      // Save the updated user
      await user.save();
  
      res.json({ message: 'User information updated successfully' });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
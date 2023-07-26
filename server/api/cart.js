const express = require("express");
const router = express.Router();
const {
  models: { Cart, Sales, Product },
} = require("../db");

const bodyParser = require('body-parser');
router.use(bodyParser.json());

// Get all route for cart
router.get("/cart", async (req, res, next) => {
  console.log(req.user);
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: 'User not authenticated' });
    // }
    const userId = req.query.userId;
    const cartData = await Cart.findAll({ where: { userId } });

    //If cart data is empty or if the length of cart is 0
    if (!cartData || cartData.length === 0) {
      return res.json({ message: "Your cart is empty" });
    }

    res.json(cartData);
  } catch (error) {
    next(error);
  }
});

// Route for adding a product to the cart
router.post("/cart/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    //Optional chaining for user
    const userId = req.user?.id;
    if (!userId) {
      const tempUser = await User.create({ isGuest: true });
      userId = tempUser.id;
    }
    let cart = await Cart.findAll({ where: { userId } });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Cart.create({ cartId: cart.id, productId, quantity: 1 });

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    next(error);
  }
});

// Only use this route if user is logged in
// Route for updating the product quantity in the cart
router.put("/cart/:productId/quantity", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const userId = req.query.userId;

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = await Cart.findAll({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      // If the item already exists in the cart, update the quantity
      cartItem.quantity = quantity;
      await Cart.save();
    } else {
      // If the item is not found in the cart, return an error
      return res.status(404).json({ error: "Product not found in cart" });
    }

    res.json({ message: "Product quantity updated successfully" });
  } catch (error) {
    next(error);
  }
});

// Delete route to delete a product anywhere in cart
router.delete("/cart/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.query.userId;

    // Find the cart entry for the user
    const cart = await Cart.findOne({ where: { userId } });

    // Check if the cart exists
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the productIds array
    const productIndex = cart.productIds.indexOf(productId);

    // Check if the product exists in the cart
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the arrays
    cart.productIds.splice(productIndex, 1);
    cart.quantities.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    next(error);
  }
});

// Checkout and clear cart in the database
router.post('/checkout', async (req, res, next) => {
  try {
    const { userId, cartItems, date } = req.body;

    // Check if userId, cartItems, and date are provided
    if (!userId || !cartItems || !date) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    // Create a new sales entry for each item-quantity pair
    for (const cartItem of cartItems) {
      const { items, quantity } = cartItem;
      
      // Create a new Sales entry for each item-quantity pair
      await Sales.create({
        userId,
        items,
        quantities: quantity,
        date,
      });
    }

    res.status(201).json({ message: 'Purchase completed successfully' });
  } catch (error) {
    next(error);
  }
});

// Route to change the quantity of a product in the cart
router.put("/cart/:productId/change", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;
    const quantity = req.body.quantity;

    // Find the cart entry for the user
    const cart = await Cart.findOne({ where: { userId } });

    // Check if the cart exists
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the product in the productIds array
    const productIndex = cart.productIds.indexOf(productId);

    // Check if the product exists in the cart
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Increase the quantity of the product
    cart.quantities[productIndex] += quantity;

    // Save the updated cart
    await cart.save();

    res.json({ message: "Quantity increased successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

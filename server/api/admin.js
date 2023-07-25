const express = require("express");
const router = express.Router();
const {
  models: { User, Products },
} = require("../db");

// Create a new product based on the request body
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Edit a product based on the product ID and request body
router.put("/products/:productId", async (req, res, next) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const productId = req.params.productId;
    const updatedProduct = await Products.update(req.body, {
      where: { id: productId },
    });
    

    if (updatedProduct[0] === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
});


// Delete a product based on the product ID
router.delete("/products/:productId", async (req, res, next) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const productId = req.params.productId;
    const deletedProduct = await Products.destroy({
      where: { id: productId },
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.get('/users/all', async (req, res, next) => {
  try{
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    const users = await User.findAll();
    res.json(users);
  }catch(error){
    next(error);
}
})

// const { verifyToken } = require('../auth');

// //admins -all users
// router.get('/users', verifyToken, async (req, res, next) => {
//   try {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ error: 'Insufficient privileges' });
//     }
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'username']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// //admins -single user
// router.get('/:userId',verifyToken, async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;

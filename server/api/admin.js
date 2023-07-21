const express = require("express");
const router = express.Router();
const {
  models: { User, Products },
} = require("../db");

// Create a new product based on the request body
router.post("/products", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

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

// module.exports = router;

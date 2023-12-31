//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Sales = require('./models/Sales')
const Products = require('./models/Products')
const Cart = require('./models/Cart')

//associations could go here!

User.hasMany(Sales);
Sales.belongsTo(User);

User.hasMany(Cart);
Cart.belongsTo(User);

Products.belongsToMany(Cart, { through: 'CartProducts' });
Cart.belongsToMany(Products, { through: 'CartProducts' });

Products.belongsToMany(Sales, { through: 'SalesProducts' });
Sales.belongsToMany(Products, { through: 'SalesProducts' });

module.exports = {
  db,
  models: {
    User,
    Sales,
    Products,
    Cart
  },
}

//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Sales = require('./models/Sales')
const Products = require('./models/Products')
const Cart = require('./models/Cart')

//associations could go here!

User.hasMany(Sales);
User.hasOne(Cart);
Sales.belongsTo(User);
Cart.belongsTo(User);
// Products.belongsToMany(Cart);
// Products.belongsToMany(Sales);

module.exports = {
  db,
  models: {
    User,
    Sales,
    Products,
    Cart
  },
}

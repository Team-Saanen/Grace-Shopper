const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Products = db.define('products', {
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productImg: {
        type: Sequelize.STRING,
        defaultValue: 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue: 'This is a plant'
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
    price: {
        type: Sequelize.FLOAT
    }
});

module.exports = Products;
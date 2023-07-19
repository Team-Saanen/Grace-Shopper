const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const Sales = db.define('sales', {
    items: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantities: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

module.exports = Sales;
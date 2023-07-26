const jwt = require('jsonwebtoken');
const { models: { User } } = require('../db');
const axios = require('axios');
require('dotenv').config();

// Add to functions that require user tokens.

//Add event listeners for the login form
async function handleLoginToken(event){
    event.preventDefault();
    //Parses user data from form body
    const formData = new FormData (event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password'),
      };
    try{
        const res = await axios.post('/login', data);
        //If login is successful, extract response data containing token
        if (res.status === 200){
            const {token} = res.data
            //Store the token in local storage under "Authorization" header
            localStorage.setItem('Authorization', `Bearer ${token}`);
            //Redirect to home
            window.location.href = '/'
        }else{
            // Alert client for authentication errors
            alert('Authentication error. Contact administrator.')
        }
    } catch (error) {
        alert('Login error:', error);
      }
}

const requireToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = await User.findByToken(token);
        req.user = user;
        next();
    } catch (ex) {
        next(ex);
    }
};

module.exports = {requireToken, handleLoginToken};
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
module.exports = app

// Retreives user information and mounted in app.js
const UserMiddleware = (req, res, next) => {
  // Check if the client is logged in
  if (!req.user) {
    next();
    return;
  }

  // Attach the user information to req.user
  req.user = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    userName: req.body.userName,
    password: req.body.password,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  };

  next();
};

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

//Get user info for auth and api routes
app.use(UserMiddleware);

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})


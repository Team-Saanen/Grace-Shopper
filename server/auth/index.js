const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router
// const jwt = requre('jsonwebtoken')

// jwt to verify if a web client is a) logged in, and
// b) has privilages to view all user's as an admin
// MAKE SURE THIS FILE IS KEPT AS A SECRET!!!!!!!!!!!!!

// export const verifyToken = (req, res, next) =>{
//   const token = req.headers.authorization || req.query.token;

//   if(!token){
//     return res.status(401).json({error: 'No token provided'})
//   }
//   try {
//     const decoded = jwt.verity(token, "MHcCAQEEIDx1cX68XeH4WjsSbDu9YFyWWe43tV32BbEBCQP4etl2oAoGCCqGSM49AwEHoUQDQgAEYMxAhruGCsZKPdkPeY2RdKyiCnD0FaSw+FP16qPF6/MpxAOuJd9f2Qp3k2fs8xk8asFK4IxpcUtF1e30TmrQSg==")
//     req.user = decoded;
//   }catch(err){
//     return res.status(401).json({ error: 'Invalid token' });
//   }
// }

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    let user;
    
    // check if temporary user exists
    if (req.body.tempUserId) {
      user = await User.findByPk(req.body.tempUserId);
      if (user) {
        // update the user's information
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.userName = req.body.userName;
        user.password = req.body.password;
        user.isGuest = false;
        await user.save();
      }
    }
    
    // if user doesn't exist, create a new one
    if (!user) {
      user = await User.create(req.body);
    }
    
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
});


router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

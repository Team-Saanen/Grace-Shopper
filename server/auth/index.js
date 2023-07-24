const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router
const jwt = require('jsonwebtoken')

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
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

const router = require('express').Router();
const {User} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
      res.json(users)
  } catch (err) {
    next(err);
  }
});

// get user by userId
router.get('/:userId', async(req, res, next) => {
  try{
    const singleUser = await User.findById(req.params.id)
    res.json(singleUser)
  }catch(err){
    next(err)
  }
})

// create new user
router.post('/createUser', async(req, res, next) => {
  try{
    if(!req.params.admin){
      res.sendStatus(403)
    }
    const user = await User.create(req.body)
    res.send(user)
  }catch(err){
    next(err)
  }
})

// update user
router.put('/:userId', async(req, res, next) => {
  try{
    if(!req.user.admin){
      res.sendStatus(403)
    }
    const user = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.userId
      }
    })
    if(!user) return res.sendStatus(404)
    res.send(user);
  }catch(err){
    next(err)
  }
})

module.exports = router;

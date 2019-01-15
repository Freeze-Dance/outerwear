const router = require('express').Router()
const {User} = require('../db/models')

// get all users by userId
router.get('/allUsers', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// get user by userId
router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.userId)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

// create new user
router.post('/createUser', async (req, res, next) => {
  try {
    if (!req.params.admin) {
      res.sendStatus(403)
    }
    const user = await User.create(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// update user
router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.sendStatus(403)
    }
    const user = await User.findById(req.params.userId)
    const updatedUser = await user.update({password: req.body.password})

    console.log('what am i?', updatedUser)
    res.send(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.put('/makeAdmin/:userId', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.sendStatus(403)
    }
    const user = await User.update(
      {admin: true},
      {
        returning: true,
        where: {
          id: req.params.userId
        }
      }
    )
    if (!user) return res.sendStatus(404)
    const updatedUser = user[1][0]
    res.send(updatedUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.json('User successfully deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router

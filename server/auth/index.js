const router = require('express').Router()
const {Cart, CartProduct, User} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => {
        console.log('console log from /login', req.session)
        if (user.admin) {
          req.session.admin = user.admin
        } else if (req.session.cart) {
          let wrapper = async () => {
            let cart = await Cart.findOne({
              where: {userId: user.id},
              include: {all: true}
            })

            // If cart does not exist... create cart and set to user

            if (cart === null) {
              cart = await Cart.create()
              await user.setCart(cart)
            }

            for (let i = 0; i < req.session.cart.length; i++) {
              let join = await CartProduct.findOrCreate({
                where: {cartId: cart.id, productId: req.session.cart[i].id}
              })
              if (!join[1])
                await join[0].update({quantity: join[0].quantity + 1})
            }
            req.session.cart = []
          }
          wrapper()
        }
        err ? next(err) : res.json(user)
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    if (req.session.cart) {
      let wrapper = async () => {
        let cart = await Cart.create()
        await user.setCart(cart)
        for (let i = 0; i < req.session.cart.length; i++) {
          let join = await CartProduct.findOrCreate({
            where: {cartId: cart.id, productId: req.session.cart[i].id}
          })
          if (!join[1]) await join[0].update({quantity: join[0].quantity + 1})
        }
        req.session.cart = []
      }
      wrapper()
    }
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

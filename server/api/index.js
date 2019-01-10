const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/carts', require('./carts'))
router.use('/orders', require('./orders'))

router.put('/guestAdd', (req, res, next) => {
  console.log(req.session.cart)
  req.session.cart === undefined
    ? (req.session.cart = [req.body])
    : req.session.cart.push(req.body)
  console.log(req.session)
  res.send('hello')
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

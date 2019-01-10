const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))

router.put('/guestAdd', (req, res, next) => {
  console.log(req.body)
  req.session.cart = []
  res.send('hello')
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

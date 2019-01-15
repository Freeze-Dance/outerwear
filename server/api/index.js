const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/carts', require('./carts'))
router.use('/orders', require('./orders'))

router.get('/stripe', async (req, res, next) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  let stripe = require('stripe')('sk_test_X6BZjn0LR6PzVaTWFtjiTf6k')

  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'yaodijr@gmail.com'
  })
  res.json(charge)
})
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

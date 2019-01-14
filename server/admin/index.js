const router = require('express').Router()
module.exports = router

// admin middleware
// verify admin callback
function requireAdmin(req, res, next) {
  if (req.session.admin) {
    next()
  } else {
    console.log('Unauthorized')
    res.status(401).redirect('/')
  }
}

// applies verify admin callback to all admin routes
router.use(requireAdmin, (req, res, next) => {
  next()
})

router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

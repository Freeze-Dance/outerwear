const router = require('express').Router()
const {Order, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const customerOrders = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: {
        all: true
      },
      order: [['createdAt', 'DESC']]
    })
    if (!customerOrders)
      return res.status(404).send(`Error - no order for ${req.params.userId}`)
    res.json(customerOrders)
  } catch (err) {
    next(err)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: {all: true}})
    res.json(orders)
  } catch (e) {
    console.log(e)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router

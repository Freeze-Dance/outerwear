const router = require('express').Router()
const {Order, User} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const customerOrders = await Order.findAll({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: User
        }
      ]
    })
    if (!customerOrders)
      return res.status(404).send(`Error - no order for ${req.params.userId}`)
    res.json(customerOrders)
  } catch (err) {
    next(err)
  }
})

// ALL ORDERS HISTORY FOR ADMIN
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({include: {all: true}})
    res.json(allOrders)
  } catch (err) {
    next(err)
  }
})

module.exports = router

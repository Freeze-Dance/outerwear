const router = require('express').Router()
const {Order} = require('../db/models')

// admin/get all orders
router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({include: {all: true}})
    res.status(200).json(allOrders)
  } catch (err) {
    next(err)
  }
})

// admin/get single order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id, {
      include: {all: true}
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})

// admin/update specific order - NEED order status field to be added to model
router.put('/:id', async (req, res, next) => {
  try {
    const [numRows, updatedOrder] = await Order.update(req.body, {
      returning: true,
      where: {id: req.body.id}
    })
    res.status(201).json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router

const router = require('express').Router()
const {Cart, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOrCreate({
      where: {userId: req.body.id},
      include: {all: true}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    //find or create instance of cart specific to user
    const cart = await Cart.findOne({
      where: {
        userId: req.body.id
      }
    })
    const addItem = await cart.addProduct(req.body)
    res.json(addItem)
  } catch (err) {
    next(err)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    const updatedCart = await Cart.update(req.body, {
      returning: true,
      where: {
        id: req.body.id
      }
    })
    res.json(updatedCart[1][0])
  } catch (err) {
    next(err)
  }
})

router.delete('/deleteItem/:itemId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.body.id
      }
    })
    const product = await Product.findOne({
      where: {
        productId: req.body.id
      }
    })
    await cart.removeProduct({
      where: {
        id: req.params.id
      }
    })
    res.json('Item successfully deleted')
  } catch (err) {
    next(err)
  }
})

module.exports = router

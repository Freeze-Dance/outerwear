const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product)
      return res.status(404).send(`Error - no product ${req.params.id}`)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: {all: true}})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = await Product.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router

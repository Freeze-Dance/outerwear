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
    console.log(products)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.status(403).send('cant create new product')
    }
    const productBody = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      catergory: req.body.catergory,
      photoURL: req.body.photoURL,
      inventoryQuantity: req.body.inventoryQuantity
    }
    const product = await Product.create(productBody)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user.admin) {
      res.status(403).send('cant create new product')
    }

    const productBody = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      catergory: req.body.catergory,
      photoURL: req.body.photoURL,
      inventoryQuantity: req.body.inventoryQuantity
    }

    const product = await Product.update(productBody, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    if (!product) {
      res.status(404).send(`No product found ${req.params.id}`)
    } else {
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router

const router = require('express').Router()
const {Product, Review, ProductCategory, Category} = require('../db/models')

router.get('/singleProduct/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {
      include: {
        all: true
      }
    })
    if (!product) {
      return res.status(404).send(`Error - no product ${req.params.id}`)
    }
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
    const product = await Product.create(req.body.newProduct)
    const category = await Category.findOrCreate({
      where: {name: req.body.category}
    })
    await ProductCategory.create({
      productId: product.id,
      categoryId: category[0].id
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/createreview', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    await Product.update(req.body, {
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

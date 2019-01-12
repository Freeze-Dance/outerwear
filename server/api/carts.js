const router = require('express').Router()
const {
  Cart,
  Product,
  User,
  CartProduct,
  OrderProduct,
  Order
} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({include: {all: true}})

    res.json(carts)
  } catch (err) {
    next(err)
  }
})
router.get('/usercart', async (req, res, next) => {
  try {
    console.log(req.session.cart)
    let cart = await Cart.findOne({
      where: {userId: req.query.userId},
      include: {all: true}
    })

    // If cart does not exist... create cart and set to user

    if (cart === null) {
      cart = await Cart.create()
      const user = await User.findById(req.query.userId)
      await user.setCart(cart)
    }
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
router.put('/quantity', async (req, res, next) => {
  let {sign, productId, cartId} = req.body
  let join = await CartProduct.find({where: {productId, cartId}})
  if (sign === 'add') join.update({quantity: join.quantity + 1})
  else {
    join.update({quantity: join.quantity - 1})
  }
  console.log('QUANTITY>>>>', join.quantity)
})
router.put('/addToCart/:userId', async (req, res, next) => {
  let cart = await Cart.findOne({where: {userId: req.params.userId}})
  let join = await CartProduct.findOrCreate({
    where: {cartId: cart.id, productId: req.body.productId}
  })
  console.log('cart<<<<<<<', join[0])
  if (!join[1]) join[0].update({quantity: join[0].quantity + 1})
  console.log('CART>>>>>', cart)

  // cart.addProduct()
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

router.put('/submit/:cartId', async (req, res, next) => {
  try {
    let quantity = req.body.products.cartProduct.quantity
    let products = req.body.products
    let subTotal = products.reduce((acc, curr) => {
      return (acc += curr.price * curr.cartProduct.quantity)
    }, 0)
    console.log('req body >>>>>>', req.body)
    console.log('cart id param >>>>>>>', req.params.cartId)
    console.log('SUBTOTAL>>>>', subTotal)
    const order = await Order.create({
      quantity: req.body.quantity,
      time: Date.now(),
      subTotal: subTotal,
      userId: req.body.userId
    })
    console.log('ORDER>>>>>', order)
    products.forEach(async product => {
      let orderProductRow = await OrderProduct.create({
        purchasedPrice: product.price,
        productId: product.id,
        orderId: order.id,
        quantity: quantity[`quantity${product.id}`]
      })
      console.log('order product row >>>>>>>>', orderProductRow)
    })
    await CartProduct.destroy({
      where: {
        cartId: req.params.cartId
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router

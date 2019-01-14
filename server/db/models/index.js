const db = require('../db')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const Category = require('./category')
const Cart = require('./cart')
const Sequelize = require('sequelize')

const OrderProduct = db.define('orderProduct', {
  purchasedPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})
const CartProduct = db.define('cartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
  //, check why removed from yesterday
  // quantity: {
  //   type: Sequelize.INTEGER
  // }
})

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Cart.belongsToMany(Product, {through: 'cartProduct'})
Product.belongsToMany(Cart, {through: 'cartProduct'})

Order.belongsToMany(Product, {through: 'orderProduct'})
Product.belongsToMany(Order, {through: 'orderProduct'})

Product.belongsToMany(Category, {through: 'productCategory'})
Category.belongsToMany(Product, {through: 'productCategory'})

const ProductCategory = db.model('productCategory')

module.exports = {
  db,
  Order,
  Product,
  Review,
  User,
  Category,
  Cart,
  CartProduct,
  ProductCategory,
  OrderProduct
}

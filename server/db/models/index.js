const db = require('../db')
const Order = require('./order')
const Product = require('./product')
const Review = require('./review')
const User = require('./user')
const Category = require('./category')
const Cart = require('./cart')

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(Product)
Product.belongsTo(Cart)

Product.hasMany(Review)
Review.belongsTo(Product)

Order.hasMany(Product)
Product.belongsTo(Order)

Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})

const ProductCategory = db.model('ProductCategory')

module.exports = {
  db,
  Order,
  Product,
  Review,
  User,
  Category,
  Cart,
  ProductCategory
}

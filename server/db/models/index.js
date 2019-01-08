const db = require('../db');
const Orders = require('./order');
const Product = require('./product');
const Review = require('./Review');
const User = require('./user');

User.hasMany(Orders);
Orders.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Orders.hasMany(Product);
Product.belongsTo(Orders);

module.exports = {
  db,
  Orders,
  Product,
  Review,
  User
};

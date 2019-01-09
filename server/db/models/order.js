const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  quantity: {type: Sequelize.ARRAY(Sequelize.INTEGER)},
  time: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
})

module.exports = Order

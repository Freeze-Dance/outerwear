const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  time: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  subTotal: {type: Sequelize.INTEGER},
  sessionId: {type: Sequelize.STRING},
  status: {type: Sequelize.STRING, defaultValue: 'Created'},
  shippingAddress: {type: Sequelize.STRING}
})

module.exports = Order

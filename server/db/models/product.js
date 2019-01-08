const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  },
  // Why is this field here?
  category: {
    type: Sequelize.STRING
  },
  photoURL: {
    type: Sequelize.STRING,
    defaultValue: 'someURL'
  },
  // Why is this field here? Shouldn't it be associated with an order/cart?
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Product

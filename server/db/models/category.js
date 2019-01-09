const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  color: {
    type: Sequelize.STRING,
    validate: {isIn: [['red', 'blue', 'green', 'black', 'yellow']]}
  }
})

module.exports = Category

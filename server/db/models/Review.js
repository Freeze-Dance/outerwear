const db = require('../db');
const Sequelize = require('sequelize');

const {TEXT} = Sequelize;

const Review = db.define('review', {
  text: {
    type: TEXT,
    allowNull: false
  }
});

module.exports = Review;

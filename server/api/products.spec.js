const {expect} = require('chai')
const request = require('supertest')
const express = require('express')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/createreview', () => {
    beforeEach(async () => {
      await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })

      await Product.create({
        title: 'Something',
        description: 'Something cool',
        price: 100,
        inventoryQuantity: 5
      })
    })

    it('POST /api/products/createreview', async () => {
      const res = await request(app)
        .post('/api/products/createreview')
        .type('form')
        .send({text: 'A review', rating: 5, userId: 1, productId: 1})
        .set('Accept', /application\/json/)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.text).to.be.equal('A review')
      expect(res.body.rating).to.be.equal(5)
    })
  })
})

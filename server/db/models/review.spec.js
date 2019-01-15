const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')
const User = db.model('user')
const Product = db.model('product')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Review insertion', () => {
    let review

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

      review = await Review.create({
        text: 'This product is awesome',
        rating: 5,
        userId: 1,
        productId: 1
      })
    })

    it('successfully inserts the review into our database', () => {
      expect(review.dataValues.text).to.be.equal('This product is awesome')
      expect(review.dataValues.rating).to.be.equal(5)
      expect(review.dataValues.userId).to.be.equal(1)
      expect(review.dataValues.productId).to.be.equal(1)
    })
  })

  describe('Review not successfully inserted', () => {
    let review
    beforeEach(async () => {
      review = await Review.create({
        text: null,
        rating: 5,
        userId: 1,
        productId: 1
      })
    })

    it("doesn't insert the review if there is no text", () => {
      expect(
        Review.create({
          text: null,
          rating: 5,
          userId: 1,
          productId: 1
        })
      ).to.throw(
        new Error(
          'SequelizeValidationError: notNull Violation: review.rating cannot be null'
        )
      )
    })
  })
})

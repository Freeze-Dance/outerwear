'use strict'

const db = require('../server/db')
const {User, Review, Orders, Product, Category} = require('../server/db/models')
const {
  userData,
  ordersData,
  productData,
  reviewData,
  categoryData
} = require('../seedData')
async function seed() {
  try {
    await db.sync({force: true})

    // Create data rows

    const createdUsers = await Promise.all(
      userData.map(obj => User.create(obj))
    )
    const createdOrders = await Promise.all(
      ordersData.map(obj => Orders.create(obj))
    )
    const createdProducts = await Promise.all(
      productData.map(obj => Product.create(obj))
    )
    const createdReviews = await Promise.all(
      reviewData.map(obj => Review.create(obj))
    )
    const createdCategories = await Promise.all(
      categoryData.map(obj => Category.create(obj))
    )

    // Create many-many
    for (let i = 0; i < createdProducts.length; i++) {
      await createdProducts[i].addCategory(
        createdCategories[Math.round(Math.random() * 4)]
      )
    }

    console.log('db synced!')
    console.log(`seeded successfully`)
  } catch (e) {
    console.log(e)
  }
}
// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

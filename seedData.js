const userData = [
  {
    email: 'skingman0@1688.com',
    password: 'ra9SWgqB',
    salt: '16ea1989139d07b124687de6dc067318d2c937a27430d93098bcbd70083e33a7',
    googleId: 1,
    address: '45246 Leroy Plaza',
    admin: false
  },
  {
    email: 'djohns1@geocities.com',
    password: 'c2MnihW2',
    salt: '8f188af7b43ed99631a6eed6c133a58fc9f2ff9576066ef35824d209e8cb8225',
    googleId: 2,
    address: '669 Bellgrove Park',
    admin: false
  },
  {
    email: 'admin@admin.com',
    password: 'admin',
    salt: '249ccc61fdb2c7d7116e8cee985f3ca5dbcec4d275a883ba5e7e3a17e4066366',
    googleId: 3,
    address: '4 Maple Wood Parkway',
    admin: true
  },
  {
    email: 'user@user.com',
    password: 'user',
    salt: '1d2c5fb9cf217b947e4b743217eae3e1a05e961e8a07b4f83a467c9d5d694685',
    googleId: 4,
    address: '78755 Sunnyside Place',
    admin: false
  },
  {
    email: 'omitcheson4@naver.com',
    password: 'PUX4NJmMqczE',
    salt: '165fb630ad79a805816f8b18ab9b6f3f4c0e65a15697de82fe6b1418c266afe7',
    googleId: 5,
    address: '8 Moulton Circle',
    admin: false
  },
  {
    email: 'kfildes5@4shared.com',
    password: 'EC0PIJz',
    salt: '75463d5d1eccb6e718681d5dff91ab9c11aafe78c4185699f7ab2b3c3e810b62',
    googleId: 6,
    address: '26 Fallview Way',
    admin: false
  },
  {
    email: 'tpreshaw6@hugedomains.com',
    password: 'uoWkO0Njkibf',
    salt: '7fc8a2058ebcdd69b4693f919046f3508bcfc3cde8f61a8c782e3a78dbc84e00',
    googleId: 7,
    address: '2578 Warbler Court',
    admin: true
  },
  {
    email: 'apleasants7@guardian.co.uk',
    password: '89zsYx',
    salt: '4b8911dee313264eae1690827e18bf0059a1ae2511e9dd96f224b9e5cd8e348e',
    googleId: 8,
    address: '3235 Sugar Park',
    admin: true
  },
  {
    email: 'kmunt8@quantcast.com',
    password: '72r4hHxVRL',
    salt: 'c12dde873e9757036a26ba31bc2f7eba729204d100a22d9e1ea4e5be0a3dc02d',
    googleId: 9,
    address: '620 Quincy Alley',
    admin: true
  },
  {
    email: 'vmessingham9@ask.com',
    password: 'J4PbyFO',
    salt: '35bb6dfe9d6cbe7d21f72c8c61bde81170a7fff28478b18588b7df1070efb3d5',
    googleId: 10,
    address: '5 Di Loreto Plaza',
    admin: true
  }
]
const orderData = [
  {
    time: '2017-03-16',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 1,
    status: 'Created'
  },
  {
    time: '2018-06-17',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 2,
    status: 'Processing'
  },
  {
    time: '2017-06-14',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 3,
    status: 'Canceled'
  },
  {
    time: '2017-07-22',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 4,
    status: 'Completed'
  },
  {
    time: '2017-01-24',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 5,
    status: 'Created'
  },
  {
    time: '2018-01-16',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 6,
    status: 'Created'
  },
  {
    time: '2017-08-16',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 7,
    status: 'Processing'
  },
  {
    time: '2018-06-02',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 8,
    status: 'Processing'
  },
  {
    time: '2017-09-08',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 9,
    status: 'Completed'
  },
  {
    time: '2018-03-06',
    quantity: [1, 2, 3],
    subTotal: 100,
    userId: 10,
    status: 'Canceled'
  }
]

// cannot insert cartId...
const productData = [
  {
    title: 'Wine - Sherpa Coat',
    description: 'Warm Sherpa Coat',
    price: '719',
    photoURL: 'images/coat_red_800.png',
    inventoryQuantity: 39,
    orderId: 1
  },
  {
    title: 'Tequila - Sherpa Coat',
    description: 'Warm Sherpa Coats',
    price: '741',
    photoURL: 'images/coat_yellow_800.png',
    inventoryQuantity: 29,
    orderId: 2
  },
  {
    title: 'Liqueur - Winter Gloves',
    description: 'Leather Gloves',
    price: '912',
    photoURL: 'images/gloves_red_800.png',
    inventoryQuantity: 96,
    orderId: 3
  },
  {
    title: 'Halibut - Winter Gloves',
    description: 'Leather Gloves',
    price: '322',
    photoURL: 'images/gloves_green_800.png',
    inventoryQuantity: 62,
    orderId: 4
  },
  {
    title: 'Sauce - Snuggly Hat',
    description: 'Winter Hat',
    price: '289',
    photoURL: 'images/hat_yellow_800.png',
    inventoryQuantity: 21,
    orderId: 5
  },
  {
    title: 'Shrimp - Snuggly Hat',
    description: 'Winter Hat',
    price: '703',
    photoURL: 'images/hat_purple_800.png',
    inventoryQuantity: 16,
    orderId: 6
  },
  {
    title: 'Cheese - Pants',
    description: 'Warm, Winter Pants',
    price: '755',
    photoURL: 'images/pants_blue_800.png',
    inventoryQuantity: 22,
    orderId: 7
  },
  {
    title: 'Chocolate - Pants',
    description: 'Warm, Winter Pants',
    price: '736',
    photoURL: 'images/pants_purple_800.png',
    inventoryQuantity: 98,
    orderId: 8
  },
  {
    title: 'Greens Mustard - Scarf',
    description: 'Winter Scarf',
    price: '122',
    photoURL: 'images/scarf_green_800.png',
    inventoryQuantity: 57,
    orderId: 9
  },
  {
    title: 'V8 Berry Blend - Scarf',
    description: 'Winter Scarf',
    price: '735',
    photoURL: 'images/scarf_red_800.png',
    inventoryQuantity: 38,
    orderId: 10
  }
]

const reviewData = [
  {
    text: 'Best coat EVER!!!',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'A++++++++',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'Would love a zipper version!!!!!',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'Love it!',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'Keeps me warm!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Amazing!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Thing of beauty!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Awesome!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Grrrrreat!!!!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Fashionable!',
    userId: 3,
    productId: 3,
    rating: 3
  },
  {
    text: 'Best coat EVER!!!',
    userId: 1,
    productId: 4,
    rating: 3
  },
  {
    text: 'A++++++++',
    userId: 1,
    productId: 4,
    rating: 3
  },
  {
    text: 'Would love a zipper version!!!!!',
    userId: 1,
    productId: 4,
    rating: 3
  },
  {
    text: 'Love it!',
    userId: 1,
    productId: 4,
    rating: 3
  },
  {
    text: 'Keeps me warm!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Amazing!',
    userId: 2,
    productId: 5,
    rating: 3
  },
  {
    text: 'Thing of beauty!',
    userId: 2,
    productId: 5,
    rating: 3
  },
  {
    text: 'Awesome!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Grrrrreat!!!!',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Fashionable!',
    userId: 3,
    productId: 3,
    rating: 3
  }
]

const categoryData = [
  {id: 2, name: 'hats'},
  {id: 1, name: 'gloves'},
  {id: 4, name: 'coats'},
  {id: 3, name: 'scarves'},
  {id: 5, name: 'pants'}
]

const cartData = [
  {userId: 1},
  {userId: 2},
  {userId: 3},
  {userId: 4},
  {userId: 5}
]

const cartProductData = [
  {productId: 1, cartId: 1},
  {productId: 2, cartId: 2},
  {productId: 3, cartId: 3},
  {productId: 4, cartId: 5},
  {productId: 3, cartId: 4},
  {productId: 4, cartId: 4},
  {productId: 5, cartId: 4}
]

const productCategoryData = [
  {productId: 1, categoryId: 4},
  {productId: 2, categoryId: 4},
  {productId: 3, categoryId: 1},
  {productId: 4, categoryId: 1},
  {productId: 5, categoryId: 2},
  {productId: 6, categoryId: 2},
  {productId: 7, categoryId: 5},
  {productId: 8, categoryId: 5},
  {productId: 9, categoryId: 3},
  {productId: 10, categoryId: 3}
]

const orderProductData = [
  {productId: 1, orderId: 1, purchasedPrice: 100, orderQuantity: 1},
  {productId: 3, orderId: 1, purchasedPrice: 233, orderQuantity: 2},
  {productId: 2, orderId: 2, purchasedPrice: 200, orderQuantity: 1},
  {productId: 3, orderId: 3, purchasedPrice: 300, orderQuantity: 1},
  {productId: 4, orderId: 4, purchasedPrice: 400, orderQuantity: 1},
  {productId: 5, orderId: 5, purchasedPrice: 500, orderQuantity: 1},
  {productId: 6, orderId: 6, purchasedPrice: 100, orderQuantity: 1},
  {productId: 7, orderId: 7, purchasedPrice: 200, orderQuantity: 1},
  {productId: 8, orderId: 8, purchasedPrice: 300, orderQuantity: 1},
  {productId: 9, orderId: 9, purchasedPrice: 400, orderQuantity: 1},
  {productId: 1, orderId: 9, purchasedPrice: 799, orderQuantity: 2},
  {productId: 10, orderId: 10, purchasedPrice: 500, orderQuantity: 1}
]

module.exports = {
  userData,
  orderData,
  productData,
  reviewData,
  categoryData,
  cartData,
  cartProductData,
  productCategoryData,
  orderProductData
}

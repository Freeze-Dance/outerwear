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
    title: 'Wine - Piper Heidsieck Brut',
    description: 'pulvinar lobortis est phasellus sit',
    price: '719',
    photoURL: 'http://dummyimage.com/111x231.png/5fa2dd/ffffff',
    inventoryQuantity: 39,
    orderId: 1
  },
  {
    title: 'Tequila Rose Cream Liquor',
    description: 'ut at dolor quis',
    price: '741',
    photoURL: 'http://dummyimage.com/182x244.jpg/cc0000/ffffff',
    inventoryQuantity: 29,
    orderId: 2
  },
  {
    title: 'Liqueur - Melon',
    description: 'lectus aliquam sit amet diam',
    price: '912',
    photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
    inventoryQuantity: 96,
    orderId: 3
  },
  {
    title: 'Halibut - Whole, Fresh',
    description: 'consequat metus sapien ut nunc',
    price: '322',
    photoURL: 'http://dummyimage.com/243x238.jpg/cc0000/ffffff',
    inventoryQuantity: 62,
    orderId: 4
  },
  {
    title: 'Sauce - Sesame Thai Dressing',
    description: 'curabitur at ipsum',
    price: '289',
    photoURL: 'http://dummyimage.com/192x217.bmp/cc0000/ffffff',
    inventoryQuantity: 21,
    orderId: 5
  },
  {
    title: 'Shrimp - Black Tiger 13/15',
    description: 'erat eros viverra',
    price: '703',
    photoURL: 'http://dummyimage.com/121x136.jpg/cc0000/ffffff',
    inventoryQuantity: 16,
    orderId: 6
  },
  {
    title: 'Cheese - Camembert',
    description: 'nisi at nibh in',
    price: '755',
    photoURL: 'http://dummyimage.com/108x211.jpg/ff4444/ffffff',
    inventoryQuantity: 22,
    orderId: 7
  },
  {
    title: 'Chocolate - Dark Callets',
    description: 'ac diam cras pellentesque',
    price: '736',
    photoURL: 'http://dummyimage.com/104x112.jpg/5fa2dd/ffffff',
    inventoryQuantity: 98,
    orderId: 8
  },
  {
    title: 'Greens Mustard',
    description: 'sagittis sapien cum',
    price: '122',
    photoURL: 'http://dummyimage.com/117x137.png/dddddd/000000',
    inventoryQuantity: 57,
    orderId: 9
  },
  {
    title: 'V8 - Berry Blend',
    description: 'blandit nam nulla integer',
    price: '735',
    photoURL: 'http://dummyimage.com/179x130.bmp/5fa2dd/ffffff',
    inventoryQuantity: 38,
    orderId: 10
  }
]

const reviewData = [
  {
    text: 'Triple-buffered actuating initiative',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'Self-enabling fresh-thinking hardware',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {
    text: 'Assimilated zero defect migration',
    userId: 1,
    productId: 1,
    rating: 3
  },
  {text: 'Digitized local project', userId: 1, productId: 1, rating: 3},
  {
    text: 'Triple-buffered explicit productivity',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {text: 'Realigned dynamic approach', userId: 2, productId: 2, rating: 3},
  {
    text: 'Centralized incremental contingency',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Sharable client-driven moderator',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Customer-focused fault-tolerant approach',
    userId: 2,
    productId: 2,
    rating: 3
  },
  {
    text: 'Progressive uniform open architecture',
    userId: 3,
    productId: 3,
    rating: 3
  }
]

const categoryData = [
  {name: 'hats'},
  {name: 'gloves'},
  {name: 'scarves'},
  {name: 'coats'},
  {name: 'pants'}
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
  {productId: 1, categoryId: 1},
  {productId: 2, categoryId: 2},
  {productId: 3, categoryId: 3},
  {productId: 4, categoryId: 4},
  {productId: 5, categoryId: 5},
  {productId: 6, categoryId: 1},
  {productId: 7, categoryId: 2},
  {productId: 8, categoryId: 3},
  {productId: 9, categoryId: 4},
  {productId: 10, categoryId: 5}
]

const orderProductData = [
  {productId: 1, orderId: 1, purchasedPrice: 100, orderQuantity: 1},
  {productId: 2, orderId: 2, purchasedPrice: 200, orderQuantity: 1},
  {productId: 3, orderId: 3, purchasedPrice: 300, orderQuantity: 1},
  {productId: 4, orderId: 4, purchasedPrice: 400, orderQuantity: 1},
  {productId: 5, orderId: 5, purchasedPrice: 500, orderQuantity: 1}
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

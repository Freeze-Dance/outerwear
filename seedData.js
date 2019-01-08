const userData = [
  {
    email: 'skingman0@1688.com',
    password: 'ra9SWgqB',
    salt: '16ea1989139d07b124687de6dc067318d2c937a27430d93098bcbd70083e33a7',
    googleId: 1,
    address: '45246 Leroy Plaza',
    admin: false,
    payment: '$6.87',
    guest: false
  },
  {
    email: 'djohns1@geocities.com',
    password: 'c2MnihW2',
    salt: '8f188af7b43ed99631a6eed6c133a58fc9f2ff9576066ef35824d209e8cb8225',
    googleId: 2,
    address: '669 Bellgrove Park',
    admin: false,
    payment: '$9.69',
    guest: false
  },
  {
    email: 'jgeffen2@rediff.com',
    password: 'xvgidmN',
    salt: '249ccc61fdb2c7d7116e8cee985f3ca5dbcec4d275a883ba5e7e3a17e4066366',
    googleId: 3,
    address: '4 Maple Wood Parkway',
    admin: true,
    payment: '$4.22',
    guest: false
  },
  {
    email: 'kbignold3@xrea.com',
    password: 'sR1xPWwo',
    salt: '1d2c5fb9cf217b947e4b743217eae3e1a05e961e8a07b4f83a467c9d5d694685',
    googleId: 4,
    address: '78755 Sunnyside Place',
    admin: false,
    payment: '$1.88',
    guest: false
  },
  {
    email: 'omitcheson4@naver.com',
    password: 'PUX4NJmMqczE',
    salt: '165fb630ad79a805816f8b18ab9b6f3f4c0e65a15697de82fe6b1418c266afe7',
    googleId: 5,
    address: '8 Moulton Circle',
    admin: false,
    payment: '$2.11',
    guest: false
  },
  {
    email: 'kfildes5@4shared.com',
    password: 'EC0PIJz',
    salt: '75463d5d1eccb6e718681d5dff91ab9c11aafe78c4185699f7ab2b3c3e810b62',
    googleId: 6,
    address: '26 Fallview Way',
    admin: false,
    payment: '$2.59',
    guest: true
  },
  {
    email: 'tpreshaw6@hugedomains.com',
    password: 'uoWkO0Njkibf',
    salt: '7fc8a2058ebcdd69b4693f919046f3508bcfc3cde8f61a8c782e3a78dbc84e00',
    googleId: 7,
    address: '2578 Warbler Court',
    admin: true,
    payment: '$4.25',
    guest: true
  },
  {
    email: 'apleasants7@guardian.co.uk',
    password: '89zsYx',
    salt: '4b8911dee313264eae1690827e18bf0059a1ae2511e9dd96f224b9e5cd8e348e',
    googleId: 8,
    address: '3235 Sugar Park',
    admin: true,
    payment: '$1.78',
    guest: true
  },
  {
    email: 'kmunt8@quantcast.com',
    password: '72r4hHxVRL',
    salt: 'c12dde873e9757036a26ba31bc2f7eba729204d100a22d9e1ea4e5be0a3dc02d',
    googleId: 9,
    address: '620 Quincy Alley',
    admin: true,
    payment: '$8.07',
    guest: false
  },
  {
    email: 'vmessingham9@ask.com',
    password: 'J4PbyFO',
    salt: '35bb6dfe9d6cbe7d21f72c8c61bde81170a7fff28478b18588b7df1070efb3d5',
    googleId: 10,
    address: '5 Di Loreto Plaza',
    admin: true,
    payment: '$8.28',
    guest: false
  }
]

const ordersData = [
  {userId: 1, items: 6403, time: '2017-03-16', cart: [1, 2, 3]},
  {userId: 2, items: 6287, time: '2018-06-17', cart: [1, 2, 3]},
  {userId: 3, items: 6513, time: '2017-06-14', cart: [1, 2, 3]},
  {userId: 4, items: 6220, time: '2017-07-22', cart: [1, 2, 3]},
  {userId: 5, items: 3694, time: '2017-01-24', cart: [4, 5]},
  {userId: 6, items: 3629, time: '2018-01-16', cart: [4, 5]},
  {userId: 7, items: 4446, time: '2017-08-16', cart: [4, 5]},
  {userId: 8, items: 1678, time: '2018-06-02', cart: [4, 5]},
  {userId: 9, items: 6904, time: '2017-09-08', cart: [4, 5]},
  {userId: 10, items: 6893, time: '2018-03-06', cart: [4, 5]}
]

const productData = [
  {
    title: 'Wine - Piper Heidsieck Brut',
    description: 'pulvinar lobortis est phasellus sit',
    price: '$7.19',
    category: 'Wine - Sicilia Igt Nero Avola',
    photoURL: 'http://dummyimage.com/111x231.png/5fa2dd/ffffff',
    inventoryQuantity: 39
  },
  {
    title: 'Tequila Rose Cream Liquor',
    description: 'ut at dolor quis',
    price: '$7.41',
    category: 'Wine - Savigny - Les - Beaune',
    photoURL: 'http://dummyimage.com/182x244.jpg/cc0000/ffffff',
    inventoryQuantity: 29
  },
  {
    title: 'Liqueur - Melon',
    description: 'lectus aliquam sit amet diam',
    price: '$9.12',
    category: 'Pears - Anjou',
    photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
    inventoryQuantity: 96
  },
  {
    title: 'Halibut - Whole, Fresh',
    description: 'consequat metus sapien ut nunc',
    price: '$3.22',
    category: 'Chinese Foods - Cantonese',
    photoURL: 'http://dummyimage.com/243x238.jpg/cc0000/ffffff',
    inventoryQuantity: 62
  },
  {
    title: 'Sauce - Sesame Thai Dressing',
    description: 'curabitur at ipsum',
    price: '$2.89',
    category: 'Wine - Pinot Noir Latour',
    photoURL: 'http://dummyimage.com/192x217.bmp/cc0000/ffffff',
    inventoryQuantity: 21
  },
  {
    title: 'Shrimp - Black Tiger 13/15',
    description: 'erat eros viverra',
    price: '$7.03',
    category: 'Sauce - Thousand Island',
    photoURL: 'http://dummyimage.com/121x136.jpg/cc0000/ffffff',
    inventoryQuantity: 16
  },
  {
    title: 'Cheese - Camembert',
    description: 'nisi at nibh in',
    price: '$7.55',
    category: 'Lamb Rack Frenched Australian',
    photoURL: 'http://dummyimage.com/108x211.jpg/ff4444/ffffff',
    inventoryQuantity: 22
  },
  {
    title: 'Chocolate - Dark Callets',
    description: 'ac diam cras pellentesque',
    price: '$7.36',
    category: 'Island Oasis - Mango Daiquiri',
    photoURL: 'http://dummyimage.com/104x112.jpg/5fa2dd/ffffff',
    inventoryQuantity: 98
  },
  {
    title: 'Greens Mustard',
    description: 'sagittis sapien cum',
    price: '$1.22',
    category: 'Sweet Pea Sprouts',
    photoURL: 'http://dummyimage.com/117x137.png/dddddd/000000',
    inventoryQuantity: 57
  },
  {
    title: 'V8 - Berry Blend',
    description: 'blandit nam nulla integer',
    price: '$7.35',
    category: 'Mousse - Banana Chocolate',
    photoURL: 'http://dummyimage.com/179x130.bmp/5fa2dd/ffffff',
    inventoryQuantity: 38
  }
]

const reviewData = [
  {text: 'Triple-buffered actuating initiative'},
  {text: 'Self-enabling fresh-thinking hardware'},
  {text: 'Assimilated zero defect migration'},
  {text: 'Digitized local project'},
  {text: 'Triple-buffered explicit productivity'},
  {text: 'Realigned dynamic approach'},
  {text: 'Centralized incremental contingency'},
  {text: 'Sharable client-driven moderator'},
  {text: 'Customer-focused fault-tolerant approach'},
  {text: 'Progressive uniform open architecture'}
]

const categoryData = [{name: 'expensive'}, {name: 'available for pickup'}]

module.exports = {
  userData,
  ordersData,
  productData,
  reviewData,
  categoryData
}

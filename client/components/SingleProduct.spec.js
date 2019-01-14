// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {SingleProduct} from './SingleProduct'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('SingleProduct', () => {
//   let product = {
//     title: 'hi',
//     description: 'hi',
//     price: 100,
//     photoUrl: 'fakeurl.com',
//     inventoryQuantity: 5,
//     reviews: [{text: 'hi', rating: 5, userId: 1, productId: 1}]
//   }
//   let user = {id: 1, name: 'rami'}
//   let match = {params: {productId: 1}}
//   const mockfetchProduct = id => console.log('hello')

//   it('renders one review form component and a single review', () => {
//     const wrapper = shallow(
//       <SingleProduct
//         user={user}
//         product={product}
//         match={match}
//         fetchProduct={mockfetchProduct}
//       />
//     )
//     expect(wrapper.find('.review-form')).to.have.length(1)
//     expect(wrapper.find('.reviews')).to.have.length(1)
//     expect(wrapper.find('.review-content')).to.have.length(1)
//   })
// })

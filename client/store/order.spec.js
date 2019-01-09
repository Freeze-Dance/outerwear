/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCustomerOrders} from './order'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
// import history from '../history'

const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  //   const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    // store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCustomerOrders', () => {
    it('eventually dispatches the GET_CUSTOMER_ORDERS action', async () => {
      const fakeOrders = [
        {
          id: 1,
          time: '2017-03-15 19:00:00-05',
          orderStatus: 'pending',
          products: [
            {
              id: 2,
              title: 'Liqueur - Melon',
              description: 'lectus aliquam sit amet diam',
              price: 912,
              photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
              inventoryQuantity: 96,
              orderProductQuantity: 2
            },
            {
              id: 3,
              title: 'Tequila Rose Cream Liquor',
              description: 'ut at dolor quis',
              price: 741,
              photoURL: 'http://dummyimage.com/182x244.jpg/cc0000/ffffff',
              inventoryQuantity: 29,
              orderProductQuantity: 1
            }
          ],
          subTotal: 2565
        },
        {
          id: 2,
          time: '2017-03-15 19:00:00-05',
          orderStatus: 'shipped',
          products: [
            {
              id: 2,
              title: 'Liqueur - Melon',
              description: 'lectus aliquam sit amet diam',
              price: 912,
              photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
              inventoryQuantity: 96,
              orderProductQuantity: 2
            }
          ],
          subTotal: 1824
        }
      ]

      mockAxios.onGet(`/user/3`).replyOnce(200, fakeOrders)
      await store.dispatch(fetchCustomerOrders(3))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CUSTOMER_ORDERS')
      expect(actions[0].customerOrders).to.be.deep.equal(fakeOrders)
    })
  })

  //   describe('fetchProduct', () => {
  //     it('eventually dispatches the GET_PRODUCT action', async () => {
  //       const fakeProduct = {
  //         title: 'Gloves',
  //         price: 1000,
  //         category: 'gloves',
  //         inventoryQuantity: 10
  //       }
  //       mockAxios.onGet('/products/3').replyOnce(200, fakeProduct)
  //       await store.dispatch(fetchProduct(3))
  //       const actions = store.getActions()
  //       expect(actions[0].type).to.be.equal('GET_PRODUCT')
  //       expect(actions[0].product).to.be.deep.equal(fakeProduct)
  //     })
  //   })
})

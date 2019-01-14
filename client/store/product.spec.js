/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProducts, fetchProduct, creatingReview} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GET_PRODUCTS action', async () => {
      const fakeProducts = [
        {title: 'Coat', price: 1000, category: 'gloves', inventoryQuantity: 10}
      ]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
  })

  describe('fetchProduct', () => {
    it('eventually dispatches the GET_PRODUCT action', async () => {
      const fakeProduct = {
        title: 'Gloves',
        price: 1000,
        category: 'gloves',
        inventoryQuantity: 10
      }
      mockAxios.onGet('/api/products/3').replyOnce(200, fakeProduct)
      await store.dispatch(fetchProduct(3))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('creatingReview', () => {
    it('eventually dispatches the CREATE_REVIEW action', async () => {
      const fakeReview = {
        text: 'Great product!',
        userId: 1,
        productId: 2,
        rating: 5
      }
      mockAxios.onGet('/api/products/createreview').replyOnce(200, fakeReview)
      await store.dispatch(creatingReview())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CREATE_REVIEW')
      expect(actions[0].product).to.be.deep.equal(fakeReview)
    })
  })
})

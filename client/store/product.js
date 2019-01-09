import axios from 'axios'

const initialState = {products: [], currentProduct: {}}

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'

const getProducts = products => ({type: GET_PRODUCTS, products})
const getProduct = product => ({type: GET_PRODUCT, product})

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProduct = productId => async dispatch => {
  try {
    console.log('afdshkljfdhs')
    const res = await axios.get(`/products/${productId}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: [...action.products]}
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    default:
      return state
  }
}

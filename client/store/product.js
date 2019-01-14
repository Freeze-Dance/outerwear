import axios from 'axios'

const initialState = {products: [], currentProduct: {}}

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const CREATE_REVIEW = 'CREATE_REVIEW'

const getProducts = products => ({type: GET_PRODUCTS, products})
const getProduct = product => ({type: GET_PRODUCT, product})
const createReview = review => ({type: CREATE_REVIEW, review})

export const fetchProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/singleProduct/${productId}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const createProduct = newProduct => async dispatch => {
  try {
    const {data} = await axios.post('/api/products', newProduct)
  } catch (err) {
    console.log(err)
  }
}

export const editproduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${id}`, product)
  } catch (err) {
    console.log(err)
  }
}

export const creatingReview = review => async dispatch => {
  try {
    const returnedReview = await axios.post(
      '/api/products/createreview',
      review
    )
    dispatch(createReview(returnedReview.data))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: [...action.products]}
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case CREATE_REVIEW:
      return {
        ...state,
        currentProduct: {
          ...state.currentProduct,
          reviews: [...state.currentProduct.reviews, action.review]
        }
      }

    default:
      return state
  }
}

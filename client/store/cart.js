import axios from 'axios'
import Axios from 'axios'

const initialState = {
  currentCart: {products: []}
}

const SET_CART = 'SET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const SUBMIT_CART = 'SUBMIT_CART'
const SET_PRODUCT = 'SET_PRODUCT'

const setCart = cart => ({
  type: SET_CART,
  cart
})

const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})

const checkoutCart = cart => ({
  type: SUBMIT_CART,
  cart
})

const setProduct = productId => ({
  type: SET_PRODUCT,
  productId
})

export const editQuantity = (sign, productId, cartId) => {
  return async function(dispatch) {
    const {data} = await Axios.put(`/api/carts/quantity`, {
      sign,
      productId,
      cartId
    })
    dispatch(setCart(data))
  }
}

export const deleteCartItem = item => ({
  type: DELETE_CART_ITEM,
  item
})

export const fetchCart = userId => async dispatch => {
  const {data} = await axios.get('/api/carts/usercart', {
    params: userId
  })
  if (!data.products) data.products = []
  console.log(data, 'DATA')
  dispatch(setCart(data))
}

export const addToCart = (productId, userId) => async dispatch => {
  console.log('FFFFFFFFFFFFFFFFFFFFF', userId)
  if (userId) {
    const {data} = await axios.put(`/api/carts/addToCart/${userId}`, {
      productId,
      userId
    })
    dispatch(setCart(data))
  }
}

export const submitCart = (
  cartId,
  products,
  userId,
  token
) => async dispatch => {
  const {data} = await axios.put(`/api/carts/submit/${cartId}`, {
    products,
    userId,
    token
  })
  dispatch(checkoutCart(data))
}

export const deleteItem = (cartId, productId, userId) => async dispatch => {
  console.log(cartId, 'HIIIIIIIIIIIIIII')
  const {data} = await axios.delete(`/api/carts/delete/${cartId}/${productId}`)
  dispatch(fetchCart(userId))
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {...state, currentCart: action.cart}
    // case SET_PRODUCT:
    //   return {...state, [state.currentCart.products]: [...state.currentCart.products.filter(product => )]}
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItem: state.currentCart.filter(item => item.id !== action.itemId)
      }
    default:
      return state
  }
}

export default cartReducer

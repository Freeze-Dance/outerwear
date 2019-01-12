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
  console.log(data, 'DATA')
  dispatch(setCart(data))
}

export const addToCart = (productId, userId) => async dispatch => {
  if (userId) {
    const {data} = await axios.put(`/api/carts/addToCart/${userId}`, {
      productId,
      userId
    })
    console.log(data, 'FFFFFFFFFFFFFFFFFFFFF')
    dispatch(setCart(data))
  }
}

// export const itemToCart = itemAdd => async dispatch => {
//   const newItem = await axios.post('/api/cart/add', itemAdd)
//   dispatch(addItemToCart(newItem.data))
// }

// export const updateItem = itemUpdate => async dispatch => {
//   const updatedCart = await axios.put('/api/cart/edit', itemUpdate)
//   dispatch(editQuantity(updatedCart.data))
// }

// export const deleteItem = itemId => async dispatch => {
//   const response = await axios.delete(`/api/cart/deleteItem/${itemId}`)
//   if (response.data === 'Item successfully deleted') {
//     dispatch(deleteCartItem(itemId))
//   }
// }

export const submitCart = (cartId, products, userId) => async dispatch => {
  const {data} = await axios.put(`/api/carts/submit/${cartId}`, {
    products,
    userId
  })
  dispatch(checkoutCart(data))
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

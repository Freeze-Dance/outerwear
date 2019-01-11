import axios from 'axios'

const initialState = {
  currentCart: {products: [{title: '', cartProduct: {quantity: 0}}]}
}

const SET_CART = 'SET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const SUBMIT_CART = 'SUBMIT_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const addItemToCart = item => ({
  type: ADD_ITEM_TO_CART,
  item
})

export const checkoutCart = cart => ({
  type: SUBMIT_CART,
  cart
})

export const editQuantity = (item, quantity) => ({
  type: EDIT_QUANTITY,
  item,
  quantity
})

export const deleteCartItem = item => ({
  type: DELETE_CART_ITEM,
  item
})

export const fetchCart = userId => async dispatch => {
  const {data} = await axios.get('/api/carts/usercart', {
    params: userId
  })
  console.log('THUNK CART >>>>>', data)
  dispatch(setCart(data))
}

export const addToCart = (productId, userId) => async dispatch => {
  console.log('>>>>>thunk', !!userId)
  if (userId) {
    const {data} = await axios.put(`/api/carts/addToCart/${userId}`, {
      productId,
      userId
    })
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

export const submitCart = (
  cartId,
  products,
  quantity,
  userId
) => async dispatch => {
  const {data} = await axios.put(`/api/carts/submit/${cartId}`, {
    products,
    quantity,
    userId
  })
  dispatch(checkoutCart(data))
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {...state, currentCart: action.cart}
    case ADD_ITEM_TO_CART:
      return {...state, cartItem: [...state.cartItem, action.item]}
    case EDIT_QUANTITY:
      return {...state, cartItem: action.cartItem}
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter(item => item.id !== action.itemId)
      }
    default:
      return state
  }
}

export default cartReducer

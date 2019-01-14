import axios from 'axios'

const initialState = {customerOrders: [], allOrders: [], currentOrder: {}}

const GET_CUSTOMER_ORDERS = 'GET_CUSTOMER_ORDERS'
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_CURRENT_ORDER = 'GET_CURRENT_ORDER'
const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER'

const getCustomerOrders = orders => ({type: GET_CUSTOMER_ORDERS, orders})
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
const getCurrentOrder = order => ({type: GET_CURRENT_ORDER, order})
const updateCurrentOrder = order => ({type: UPDATE_CURRENT_ORDER, order})

export const fetchCustomerOrders = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`)
    console.log('THUNK RECEIVE', res.data)
    dispatch(getCustomerOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/admin/orders/')
    dispatch(getAllOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCurrentOrder = orderId => async dispatch => {
  try {
    const res = await axios.get(`/admin/orders/${orderId}`)
    dispatch(getCurrentOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const editCurrentOrder = (orderId, order) => async dispatch => {
  try {
    const res = await axios.put(`/admin/orders/${orderId}`, order)
    dispatch(updateCurrentOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_ORDERS:
      return {...state, customerOrders: action.orders}
    case GET_ALL_ORDERS:
      return {...state, allOrders: action.orders}
    case GET_CURRENT_ORDER:
      return {...state, currentOrder: action.order}
    case UPDATE_CURRENT_ORDER:
      return {
        ...state,
        allOrders: state.allOrders.map(
          order => (order.id === action.order.id ? action.order : order)
        ),
        currentOrder: {
          ...action.order
        }
      }
    default:
      return state
  }
}

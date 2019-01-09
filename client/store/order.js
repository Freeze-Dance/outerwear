import axios from 'axios'

const initialState = {customerOrders: [], allOrders: []}

const GET_CUSTOMER_ORDERS = 'GET_CUSTOMER_ORDERS'

const getCustomerOrders = orders => ({type: GET_CUSTOMER_ORDERS, orders})

export const fetchCustomerOrders = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${userId}`)
    dispatch(getCustomerOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_ORDERS:
      return {...state, customerOrders: [...action.orders]}
    default:
      return state
  }
}

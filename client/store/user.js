import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'
const MAKE_ADMIN = 'MAKE_ADMIN'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  user: {}
}

/**
 * ACTION CREATORS`
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const getAllUsers = allUsers => ({type: GET_ALL_USERS, allUsers})
const makeAdmin = newAdmin => ({type: MAKE_ADMIN, newAdmin})
const deleteUser = userId => ({type: DELETE_USER, userId})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const resetPassword = (password, userId) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, {password})
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = () => async dispatch => {
  try {
    const users = await axios.get('/api/users/allUsers')
    dispatch(getAllUsers(users.data))
  } catch (err) {
    console.error(err)
  }
}

// method input is either login or signup
export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const destroyUser = userId => async dispatch => {
  const response = await axios.delete(`/api/users/${userId}`)
  if (response.data === 'User successfully deleted') {
    dispatch(deleteUser(userId))
  }
}

// method input to make user an admin
export const promoteToAdmin = userId => async dispatch => {
  try {
    const res = await axios.put(`/api/users/makeAdmin/${userId}`)
    dispatch(makeAdmin(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: {}}
    case GET_ALL_USERS:
      return {...state, allUsers: action.allUsers}
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.id !== action.userId)
      }
    case MAKE_ADMIN:
      return {
        ...state,
        allUsers: state.allUsers.map(user => {
          if (user.id === action.newAdmin.id) {
            console.log('user found:', user.id, action.newAdmin)
            user.admin = true
            return user
          }
          return user
        })
      }
    default:
      return state
  }
}

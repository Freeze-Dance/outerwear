import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store from '../store'

/**
 * COMPONENT
 */
export const HomePage = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(HomePage)

/**
 * PROP TYPES
 */
HomePage.propTypes = {
  email: PropTypes.string
}

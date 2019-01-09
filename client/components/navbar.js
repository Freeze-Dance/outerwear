import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    let {isLoggedIn, handleClick} = this.props
    console.log(this.props, '<<< props in navbar')
    return (
      <div>
        <h1>Freeze Dance</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              <Link to="/">Home</Link>
              {/* {isSingleProduct ? <div>{Category}</div> : <div/>} //shows category only in single product view */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/cart">Cart</Link>
              <Link to={`/orderhistory/${this.props.user.id}`}>
                Previous Orders
              </Link>
              {this.props.user.admin ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isSingleProduct: !!state.currentProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

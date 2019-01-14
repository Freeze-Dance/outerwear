import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, HomePage, SingleProduct, Cart} from './components'
import {me} from './store'
import dashboard from './components/dashboard'
import NewProduct from './components/NewProduct'
import editproduct from './components/editproduct'
import OrderHistory from './components/OrderHistory'
import DashboardOrders from './components/DashboardOrders'
import GuestCart from './components/GuestCart'
import GuestCheckoutForm from './components/GuestCheckoutForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <Fragment>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/products/:productId" component={SingleProduct} />
          <Route exact path="/dashboard" component={dashboard} />
          <Route exact path="/newproduct" component={NewProduct} />
          <Route exact path="/editproduct/:id" component={editproduct} />
          <Route exact path="/cart" component={GuestCart} />
          <Route exact path="/guestCheckout" component={CheckoutForm} />

          {/* Displays our Login component as a fallback */}
        </Switch>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/cart/:userId" component={Cart} />
            <Route
              exact
              path="/orderhistory/:userId"
              component={OrderHistory}
            />
            <Route
              exact
              path="/products/:productId/createreview"
              component={SingleProduct}
            />
            {isAdmin /* Routes placed here are only available if admin*/ && (
              <Fragment>
                <Route exact path="/dashboard" component={dashboard} />
                <Route
                  exact
                  path="/dashboardorders"
                  component={DashboardOrders}
                />
                <Route exact path="/newproduct" component={NewProduct} />
                <Route exact path="/editproduct/:id" component={editproduct} />
              </Fragment>
            )}
          </Switch>
        )}
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

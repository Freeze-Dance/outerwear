import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Order from './Order.js'
import {fetchCustomerOrders} from '../store'
import Typography from '@material-ui/core/Typography'

class OrderHistory extends Component {
  componentDidMount() {
    const {userId} = this.props.match.params
    this.props.fetchCustomerOrders(userId)
    console.log('OrderHistory Component Mounted', this.props.customerOrders)
  }

  render() {
    const previousOrders = this.props.customerOrders.map(order => (
      <Order key={order.id} order={order} />
    ))
    return (
      <Fragment>
        <Typography variant="h4" align="center" gutterBottom>
          Your Previous Orders
        </Typography>
        {previousOrders.length > 0 ? (
          previousOrders
        ) : (
          <h2>Looks like you haven't ordered anything yet. Get shopping!</h2>
        )}
      </Fragment>
    )
  }
}

const mapState = state => ({
  customerOrders: state.order.customerOrders
})

const mapDispatch = dispatch => ({
  fetchCustomerOrders(userId) {
    return dispatch(fetchCustomerOrders(userId))
  }
})

export default connect(mapState, mapDispatch)(OrderHistory)

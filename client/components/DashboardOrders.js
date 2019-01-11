import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Order from './Order.js'
import {fetchAllOrders} from '../store'
import Typography from '@material-ui/core/Typography'

class OrderHistory extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
    console.log('DashboardOrders Component Mounted', this.props.allOrders)
  }

  render() {
    // add in customer info and edit button info as props into order
    const allOrdersForAdmin = this.props.allOrders.map(order => (
      <Order key={order.id} order={order} />
    ))
    return (
      <Fragment>
        <Typography variant="h4" align="center" gutterBottom>
          All Orders
        </Typography>
        {allOrdersForAdmin}
      </Fragment>
    )
  }
}

const mapState = state => ({
  allOrders: state.order.allOrders
})

const mapDispatch = dispatch => ({
  fetchAllOrders() {
    return dispatch(fetchAllOrders())
  }
})

export default connect(mapState, mapDispatch)(OrderHistory)

import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Order from './Order.js'
import {fetchAllOrders, editCurrentOrder} from '../store'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import {withStyles} from '@material-ui/core/styles'

// style adjustments for material-ui compontents - adds to this.props.classes
const styles = {
  root: {
    minWidth: 160,
    marginLeft: 20,
    marginBottom: 20
  }
}

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {
      orderStatus: ''
    }
    this.handleOrderFilterChange = this.handleOrderFilterChange.bind(this)
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  handleOrderFilterChange(event) {
    this.setState({
      orderStatus: event.target.value
    })
  }

  // (orderId, order)
  // issue with store
  handleOrderStatusChange(event, order) {
    // console.log('hitting handleOrderStatus', order, event.target.value)
    order.status = event.target.value
    console.log(order, order.id)
    this.props.editCurrentOrder(order.id, order)
  }

  render() {
    // add in customer info and edit button info as props into order
    const allOrdersForAdmin = this.props.allOrders
      .reduce((acc, cur) => {
        // try to refactor this - would be nice to use .filter but need to handle show all orders
        if (this.state.orderStatus === '') {
          acc.push(cur)
          return acc
        } else if (cur.status === this.state.orderStatus) {
          acc.push(cur)
          return acc
        } else {
          return acc
        }
      }, [])
      .map(order => (
        <Order
          key={order.id}
          order={order}
          admin={true}
          handleOrderStatusChange={this.handleOrderStatusChange}
        />
      ))
    const {classes} = this.props
    return (
      <Fragment>
        <Typography variant="h4" align="center" gutterBottom>
          Customer Orders
        </Typography>
        <FormControl className={classes.root}>
          <InputLabel htmlFor="orderStatus-simple">
            Filter Order Status
          </InputLabel>
          <Select
            value={this.state.orderStatus}
            onChange={this.handleOrderFilterChange}
            inputProps={{name: 'orderStatus', id: 'orderStatus-simple'}}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Created">Created</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
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
  },
  editCurrentOrder() {
    return dispatch(editCurrentOrder())
  }
})

export default connect(mapState, mapDispatch)(withStyles(styles)(OrderHistory))

import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Order from './Order.js'
import {fetchAllOrders, editCurrentOrder} from '../store'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import {withStyles} from '@material-ui/core/styles'

// style adjustments for material-ui compontents - adds to this.props.classes
const styles = {
  root: {
    minWidth: 160,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  headerRoot: {
    marginLeft: 20
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

  handleOrderStatusChange(event, order) {
    order.status = event.target.value
    console.log(order, order.id)
    this.props.editCurrentOrder(order.id, order)
  }

  render() {
    const allOrdersForAdmin = this.props.allOrders
      .filter(
        order =>
          order.status === this.state.orderStatus ||
          this.state.orderStatus === ''
      )
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
        <div className="flex-flex-start margin-20">
          <FormControl className={classes.root}>
            <FormHelperText>Filter Status</FormHelperText>
            <Select
              value={this.state.orderStatus}
              onChange={this.handleOrderFilterChange}
              displayEmpty
            >
              <MenuItem value="">Show All</MenuItem>
              <MenuItem value="Created">Created</MenuItem>
              <MenuItem value="Processing">Processing</MenuItem>
              <MenuItem value="Canceled">Canceled</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
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

import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Order from './Order.js'
import {fetchAllOrders} from '../store'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import {withStyles} from '@material-ui/core/styles'

// style adjustments for material-ui compontents - adds to this.props.classes
const styles = {
  root: {
    minWidth: 120,
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
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllOrders()
  }

  handleChange(event) {
    this.setState({
      orderStatus: event.target.value
    })
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
      .map(order => <Order key={order.id} order={order} />)
    const {classes} = this.props
    return (
      <Fragment>
        <Typography variant="h4" align="center" gutterBottom>
          All Orders
        </Typography>
        <FormControl className={classes.root}>
          <InputLabel htmlFor="orderStatus-simple">Order Status</InputLabel>
          <Select
            value={this.state.orderStatus}
            onChange={this.handleChange}
            inputProps={{name: 'orderStatus', id: 'orderStatus-simple'}}
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
  }
})

export default connect(mapState, mapDispatch)(withStyles(styles)(OrderHistory))

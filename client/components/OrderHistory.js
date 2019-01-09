import React, {Component, Fragment} from 'react'
import Order from './Order.js'
import {fetchCustomerOrders} from '../store'

//temp data until store setup with customerOrders - once mapToState use this.props.customerOrders
const customerOrders = [
  {
    id: 1,
    time: '2017-03-15 19:00:00-05',
    orderStatus: 'pending',
    products: [
      {
        id: 2,
        title: 'Liqueur - Melon',
        description: 'lectus aliquam sit amet diam',
        price: 912,
        photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
        inventoryQuantity: 96,
        orderProductQuantity: 2
      },
      {
        id: 3,
        title: 'Tequila Rose Cream Liquor',
        description: 'ut at dolor quis',
        price: 741,
        photoURL: 'http://dummyimage.com/182x244.jpg/cc0000/ffffff',
        inventoryQuantity: 29,
        orderProductQuantity: 1
      }
    ],
    subTotal: 2565
  },
  {
    id: 2,
    time: '2017-03-15 19:00:00-05',
    orderStatus: 'shipped',
    products: [
      {
        id: 2,
        title: 'Liqueur - Melon',
        description: 'lectus aliquam sit amet diam',
        price: 912,
        photoURL: 'http://dummyimage.com/221x123.bmp/5fa2dd/ffffff',
        inventoryQuantity: 96,
        orderProductQuantity: 2
      }
    ],
    subTotal: 1824
  }
]

class OrderHistory extends Component {
  componentDidMount() {
    console.log('OrderHistory Component Mounted')
    // const { userId } = this.props.match.params
    // this.props.fetchCustomerOrders(userId)
  }

  render() {
    // console.log(this.props, '<<< props order history')
    const previousOrders = customerOrders.map(order => (
      <Order key={order.id} order={order} />
    ))
    return (
      <Fragment>
        <h1>Your Order History</h1>
        {previousOrders.length > 0 ? (
          previousOrders
        ) : (
          <h2>You haven't ordered anything yet. Get shopping!</h2>
        )}
      </Fragment>
    )
  }
}

// const mapState = (state) => ({
//     customerOrders: state.order.customerOrders,
// });

// write dispatch to fetchOrders for customer (place into store.state)

export default OrderHistory
//export default connect(mapState, mapDispatch)(OrderHistory)

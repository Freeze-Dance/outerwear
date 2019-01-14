import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import Axios from 'axios'

class GuestCheckoutForm extends Component {
  constructor() {
    super()
    this.state = {email: '', address: '', cart: {}}
    this.subtotal = this.subtotal.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  async componentDidMount() {
    const {data} = await Axios.get('/api/carts/guestCart')
    this.setState({cart: data})
  }
  async handleCheckout(e) {
    e.preventDefault()
    let {data} = await Axios.put('/api/carts/guestCheckout', {
      cart: this.state.cart,
      subtotal: this.subtotal(),
      email: this.state.email,
      shippingAddress: this.state.address
    })
    this.setState({cart: data})
    this.props.history.push('/')
  }

  subtotal() {
    if (Object.keys(this.state.cart).length) {
      let cart = this.state.cart
      return Object.keys(this.state.cart).reduce(
        (acc, curr) => acc + cart[curr].price * cart[curr].quantity,
        0
      )
    } else return '0'
  }

  render() {
    return this.props.isLoggedIn ? (
      <form>
        <input name="email" type="text" /> Email
        <br />
        <input name="Address" type="text" /> Shipping Address
      </form>
    ) : (
      <React.Fragment>
        <h1>Guest Checkout</h1>
        <form onSubmit={this.handleCheckout}>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
          />{' '}
          Email
          <br />
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={e => this.setState({address: e.target.value})}
          />{' '}
          Shipping Address
          <br />
          <button type="submit" onClick={this.handleCheckout}>
            Checkout
          </button>
        </form>
      </React.Fragment>
    )
  }
}

// export default CheckoutForm

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(GuestCheckoutForm)

import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'

class TakeGuestMoney extends React.Component {
  constructor() {
    super()
    this.state = {cart: {}}
    this.subtotal = this.subtotal.bind(this)
  }
  onToken = async token => {
    await Axios.put('/api/carts/guestCheckout', {
      token,
      subtotal: this.subtotal(),
      cart: this.state.cart
    })
    console.log(token, 'TOKEN')
    this.props.history.push('/')
  }
  async componentDidMount() {
    const {data} = await Axios.get('/api/carts/guestCart')
    this.setState({cart: data})
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
    return (
      // ...
      <React.Fragment>
        <h1>Checkout with Stripe</h1>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_za6BgvCHsTdko0wM2PnEzPWJ"
          allowRememberMe={false} // "Remember Me" option (default true)
          name="Freeze Dance!!" // the pop-in header title
          amount={this.subtotal()} // cents
          locale="en"
          currency="USD"
          panelLabel="Complete Order!" // prepended to the amount in the bottom pay button
          shippingAddress
          triggerEvent="onClick"
        />
      </React.Fragment>
    )
  }
}

export default TakeGuestMoney

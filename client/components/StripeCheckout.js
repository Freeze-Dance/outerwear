import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {fetchCart, submitCart} from '../store/cart'

class TakeMoney extends React.Component {
  onToken = token => {
    this.props.submitCart(
      this.props.cart.id,
      this.props.cart.products,
      this.props.user.id,
      token
    )
    this.props.history.push('/orderhistory/4')
  }
  subtotal() {
    return this.props.cart.products.reduce(
      (acc, curr) => acc + curr.cartProduct.quantity * curr.price,
      0
    )
  }
  render() {
    return (
      // ...
      <React.Fragment>
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

const mapStateToProps = state => {
  return {
    cart: state.cart.currentCart,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitCart: (cartId, products, userId, token) =>
      dispatch(submitCart(cartId, products, userId, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney)

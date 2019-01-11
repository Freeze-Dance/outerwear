import React, {Component} from 'react'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import {fetchCart, submitCart} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setCart(this.props.match.params)
  }

  handleClick(e) {
    console.log('>>>>>>>>>', e.target.value)
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   let quantity = {}
  //   this.props.cart.products.forEach(product => {
  //     quantity[`quantity${product.id}`] =
  //       event.target[`quantity${product.id}`].value
  //   })
  //   console.log(quantity)
  //   // event.target.quantity5.value
  //   this.props.setCart(this.props.match.params)
  //   this.props.submitCart(
  //     this.props.cart.id,
  //     this.props.cart.products,
  //     quantity,
  //     this.props.match.params.userId
  //   )
  // }

  render() {
    const cart = this.props.cart
    return (
      <form onSubmit={this.handleSubmit}>
        {cart.products.map(product => {
          return (
            <div key={product.id}>
              <h1>CART ITEM: {product.title}</h1>
              <h2>Quantity: {product.cartProduct.quantity}</h2>
              <button
                type="button"
                value="add"
                onClick={e => this.handleClick(e)}
              >
                +
              </button>
              <button
                type="button"
                value="subtract"
                onClick={e => this.handleClick(e)}
              >
                -
              </button>
              {/* <input
                type="number"
                name="quantity"
                value={this.state.products.}
                onChange={handleChange}
              /> */}
            </div>
          )
        })}
        <button type="submit">Checkout</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.currentCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: userId => dispatch(fetchCart(userId)),
    submitCart: (cartId, products, quantity, userId) =>
      dispatch(submitCart(cartId, products, quantity, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

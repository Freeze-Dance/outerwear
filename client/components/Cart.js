import React, {Component} from 'react'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import {fetchCart, submitCart, editQuantity} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params)
  }

  handleClick(e, productId) {
    this.props.editQuantity(e.target.value, productId, this.props.cart.id)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.submitCart(
      this.props.cart.id,
      this.props.cart.products,
      this.props.match.params
    )
    this.props.history.push('/')
  }

  render() {
    const cart = this.props.cart
    console.log(cart.products, 'products')
    return (
      <React.Fragment>
        {/* {cart.products.length ? */}
        <form onSubmit={this.handleSubmit}>
          {cart.products.map(product => {
            return (
              <div key={product.id}>
                <h1>CART ITEM: {product.title}</h1>
                <h2>Quantity: {product.cartProduct.quantity}</h2>
                <button
                  type="button"
                  value="add"
                  onClick={e => this.handleClick(e, product.id)}
                >
                  +
                </button>
                <button
                  type="button"
                  value="subtract"
                  onClick={e => this.handleClick(e, product.id)}
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
        {/* :
        <div>
          No items in the cart. Get shopping!
        </div> */}
        {/* } */}
      </React.Fragment>
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
    fetchCart: userId => dispatch(fetchCart(userId)),
    submitCart: (cartId, products, userId) =>
      dispatch(submitCart(cartId, products, userId)),
    editQuantity: (sign, productId, cartId) => {
      return dispatch(editQuantity(sign, productId, cartId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

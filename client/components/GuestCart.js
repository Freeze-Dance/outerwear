import React, {Component} from 'react'
import Axios from 'axios'

class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      cart: {}
    }
    this.subtotal = this.subtotal.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  async componentDidMount() {
    const {data} = await Axios.get('/api/carts/guestCart')
    this.setState({cart: data})
  }

  async handleClick(e, productId) {
    let inc = Number(e.target.value)
    if (this.state.cart[productId].quantity === 1 && inc === -1) {
      console.log('stop!!!')
    } else {
      await Axios.put('/api/carts/guestCart', {productId, inc})
      const {data} = await Axios.get('/api/carts/guestCart')
      this.setState({cart: data})
    }
  }
  handleCheckout() {}

  subtotal() {
    if (Object.keys(this.state.cart).length) {
      let cart = this.state.cart
      return Object.keys(this.state.cart).reduce(
        (acc, curr) => acc + cart[curr].price * cart[curr].quantity,
        0
      )
    }
  }
  render() {
    let cart = this.state.cart
    console.log(this.state)
    return (
      <React.Fragment>
        {Object.keys(cart).map(key => {
          let product = cart[key]
          return (
            <React.Fragment key={product.id}>
              <h1>Title: {product.title}</h1>
              <h3>Quantity: {product.quantity}</h3>
              <h3>Price: {product.price}</h3>
              <button
                type="button"
                value="1"
                onClick={e => this.handleClick(e, product.id)}
              >
                +
              </button>
              <button
                type="button"
                value="-1"
                onClick={e => this.handleClick(e, product.id)}
              >
                -
              </button>
              <br />
              <button
                type="button"
                value="0"
                onClick={e => this.handleClick(e, product.id)}
              >
                delete
              </button>
            </React.Fragment>
          )
        })}
        <h3>Subtotal:{this.subtotal()}</h3>
        <button type="button" onClick={this.handleCheckout}>
          Checkout
        </button>
      </React.Fragment>
    )
  }
}

export default GuestCart

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
  async handleCheckout() {
    let {data} = await Axios.put('/api/carts/guestCheckout', {
      cart: this.state.cart,
      subtotal: this.subtotal()
    })
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
    let cart = this.state.cart
    console.log(this.state)
    return (
      <React.Fragment>
        <div className="cart">
          {Object.keys(cart).map(key => {
            let product = cart[key]
            return (
              <span className="cartItem" key={product.id}>
                <h3> {product.title}</h3>
                <h3>Quantity: {product.quantity}</h3>
                <h3>Price: {'$' + product.price / 100}</h3>
                <img src={product.photoURL} style={{height: '200px'}} />
                <br />
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
                <button
                  type="button"
                  value="0"
                  onClick={e => this.handleClick(e, product.id)}
                >
                  delete
                </button>
              </span>
            )
          })}
        </div>
        <div>
          <h3 style={{color: 'blue'}}>
            Subtotal: {`$${this.subtotal() / 100}`}
          </h3>
          <button
            type="button"
            onClick={() => this.props.history.push('/stripeGuest')}
          >
            Checkout
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default GuestCart

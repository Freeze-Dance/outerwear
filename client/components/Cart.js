import React, {Component} from 'react'
import CartItem from './CartItem'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      item: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.setCart()
  }

  handleChange(event) {
    this.setState({
      item: event.target.value
    })
  }

  render() {
    const cart = this.props.cart
    console.log('props', this.props)
    console.log('cart', cart)
    return (
      <div button className="button" onClick={() => this.props.fetchCart(cart)}>
        <h1>Test </h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

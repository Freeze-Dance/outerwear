import React, {Component} from 'react'
import {connect} from 'react-redux'

import {itemToCart, updateItem, deleteItem} from '../store/cart'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.cart.quantity
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateQuantity(this.props.item, this.state.quantity)
  }

  handleRemove(evt) {
    evt.preventDefault()
    this.props.deleteCartItem(this.props.item)
  }

  render() {
    return <h1>CartItem</h1>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => dispatch(itemToCart(item)),
    updateQuantity: (item, quantity) => dispatch(updateItem(item, quantity)),
    deleteCartItem: item => dispatch(deleteItem(item))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)

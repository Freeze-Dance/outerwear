import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  render() {
    console.log('prop', this.props)
    const {
      title,
      description,
      price,
      photoURL,
      inventoryQuantitiy
    } = this.props.product

    return (
      <div className="single-product-container">
        <div className="single-product-image">
          <img id="single-product-image" src={photoURL} />
        </div>
        <div className="single-product-title">
          <h2> {title} </h2>
          <div id="description">Description: {description}</div>
          <div id="price">Price: {price}</div>
          <div id="quantity">Quantity: {inventoryQuantitiy}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.currentProduct
})

const mapDispatchToProps = dispatch => ({
  fetchProduct(productId) {
    return dispatch(fetchProduct(productId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct, creatingReview, fetchReview} from '../store/product'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import StarRatings from 'react-star-ratings'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 5
    }
    this.createNewReview = this.createNewReview.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    })
  }

  createNewReview(event) {
    event.preventDefault()
    // Review, rating, productId, user Id
    const text = event.target.review.value
    const userId = this.props.user.id
    const productId = this.props.product.id
    const rating = this.state.rating

    this.props.creatingReview({
      text,
      userId,
      productId,
      rating
    })
  }

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
          <div id="price">Price: {`$${price / 100}`}</div>
          <div id="quantity">Quantity: {inventoryQuantitiy}</div>
        </div>
        <div>
          <button
            type="button"
            onClick={() =>
              Axios.put(`/api/guestAdd`, {
                id: this.props.match.params.productId
              })
            }
          >
            Add to Cart
          </button>
        </div>
        <form onSubmit={this.createNewReview}>
          Review: <textarea name="review" rows="5" cols="100" />
          <StarRatings
            rating={this.state.rating}
            starRatedColor="blue"
            changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
          />
          Rate this product!
          <button type="submit"> Submit review </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.currentProduct,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchProduct(productId) {
    return dispatch(fetchProduct(productId))
  },
  creatingReview(review) {
    return dispatch(creatingReview(review))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

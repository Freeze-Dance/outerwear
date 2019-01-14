import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProduct, creatingReview} from '../store/product'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import StarRatings from 'react-star-ratings'
import {addToCart} from '../store/cart'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import './SingleProduct.css'

const styles = {
  card: {
    width: '70%',
    margin: '0 auto'
  }
}

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      error: ''
    }
    this.createNewReview = this.createNewReview.bind(this)
    this.changeRating = this.changeRating.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleGuest = this.handleGuest.bind(this)
  }

  changeRating(newRating, name) {
    this.setState({
      rating: newRating,
      error: ''
    })
  }

  createNewReview(event) {
    event.preventDefault()
    // Review, rating, productId, user Id
    const text = event.target.review.value
    const userId = this.props.user.id
    const productId = this.props.product.id
    const rating = this.state.rating

    if (rating > 0) {
      this.props.creatingReview({
        text,
        userId,
        productId,
        rating
      })
    } else {
      this.setState({
        error: 'Star Rating Required'
      })
    }
  }

  handleClick() {
    this.props.addToCart(this.props.product.id, this.props.user.id)
    this.props.history.push(`/cart/${this.props.user.id}`)
  }
  async handleGuest() {
    await Axios.put(`/api/carts/guestAdd`, {
      id: Number(this.props.match.params.productId)
    })
    this.props.history.push('/cart')
  }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
  }

  render() {
    const {
      title,
      description,
      price,
      photoURL,
      inventoryQuantity,
      reviews
    } = this.props.product

    return (
      <React.Fragment>
        <Card className="single-product-image" style={styles.card}>
          <CardMedia
            id="single-product-image"
            image={photoURL}
            title="Product Title"
            component="img"
            alt="Product Description"
            height="300"
          />
          <CardContent className="product-content">
            <h2> {title} </h2>
            <div className="product-description">
              Description: {description}
            </div>
            <div className="product-description">
              Price: {`$${price / 100}`}
            </div>
            <div className="product-description">
              Quantity: {inventoryQuantity}
            </div>
          </CardContent>
        </Card>

        {Object.keys(this.props.user).length > 0 ? (
          <React.Fragment>
            <button type="button" onClick={this.handleClick}>
              Add to Cart
            </button>
            <form className="review-form" onSubmit={this.createNewReview}>
              <textarea
                name="review"
                id="review-textarea"
                required
                rows="5"
                placeholder="Leave a review..."
              />

              <StarRatings
                rating={this.state.rating}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="1px"
                name="rating"
                className="star-ratings"
              />
              <Button id="submit-review" type="submit">
                {' '}
                Submit Review{' '}
              </Button>
            </form>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div> PLEASE LOG IN TO LEAVE A REVIEW</div>
            <button type="button" onClick={this.handleGuest}>
              Add to Guest Cart
            </button>
          </React.Fragment>
        )}

        {this.state.error ? <div>{this.state.error}</div> : null}

        <div className="reviews">
          {reviews &&
            reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="review-content">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="1px"
                  />
                  <div className="review-text"> {review.text} </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product.currentProduct,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    fetchProduct: productId => {
      return dispatch(fetchProduct(productId))
    },
    creatingReview(review) {
      return dispatch(creatingReview(review))
    },
    addToCart: (productId, userId) => {
      return dispatch(addToCart(productId, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

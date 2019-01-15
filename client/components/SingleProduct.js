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
import {withStyles} from '@material-ui/core/styles'
import './SingleProduct.css'
import {isAbsolute} from 'path'

const styles = theme => ({
  card: {
    margin: 20,
    flexGrow: 1
  },
  media: {
    height: 0,
    paddingTop: '70%',
    position: 'relative'
  },
  cardHeader: {
    position: 'relative',
    zIndex: 56,
    bottom: 70,
    width: '100%',
    backgroundColor: 'rgba(77, 171, 245, 0.5)',
    height: theme.spacing.unit * 5
  },
  cardContent: {
    paddingTop: '-20%'
  },
  reviewCard: {
    margin: 20
  }
})

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      error: '',
      review: ''
    }
    this.createNewReview = this.createNewReview.bind(this)
    this.changeRating = this.changeRating.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleGuest = this.handleGuest.bind(this)
  }

  componentDidMount() {
    const {productId} = this.props.match.params
    this.props.fetchProduct(productId)
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
    const text = this.state.review
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
      this.setState({review: ''})
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

  render() {
    const {
      title,
      description,
      price,
      photoURL,
      inventoryQuantity,
      reviews
    } = this.props.product
    const {classes} = this.props
    return (
      <React.Fragment>
        <div className="flex">
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={`/${photoURL}`}
              title="Product Title"
              // component="img"
              alt="Product Description"
              // maxHeight="50px"
            >
              <CardHeader className={classes.cardHeader} title={`${title} -`} />
            </CardMedia>
            <CardContent className="product-content">
              <div className="margin-20 flex-space-between">
                <div>
                  <div className="product-description">
                    Description: {description}
                  </div>
                  <div className="product-description">
                    Price: {`$${price / 100}`}
                  </div>
                  <div className="product-description">
                    Quantity: {inventoryQuantity}
                  </div>
                </div>
                <div>
                  {Object.keys(this.props.user).length > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      className="margin-20"
                      type="button"
                      onClick={this.handleClick}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className="margin-20"
                      type="button"
                      onClick={this.handleGuest}
                    >
                      Add to Guest Cart
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="card">
            {Object.keys(this.props.user).length > 0 ? (
              <React.Fragment>
                {/* <button
                  className="margin-20"
                  type="button"
                  onClick={this.handleClick}
                >
                  Add to Cart
                </button> */}
                <form className="review-form" onSubmit={this.createNewReview}>
                  <textarea
                    name="review"
                    id="review-textarea"
                    required
                    rows="5"
                    placeholder="Leave a review..."
                    value={this.state.review}
                    onChange={e => this.setState({review: e.target.value})}
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
                {/* <button
                  className="margin-20"
                  type="button"
                  onClick={this.handleGuest}
                >
                  Add to Guest Cart
                </button> */}
                <div className="margin-20">
                  <div> PLEASE LOG IN TO LEAVE A REVIEW</div>
                </div>
              </React.Fragment>
            )}

            {this.state.error ? <div>{this.state.error}</div> : null}

            <div className="reviews">
              {reviews &&
                reviews.map(review => (
                  <Card key={review.id} className={classes.reviewCard}>
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
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleProduct)
)
